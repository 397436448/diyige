import { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../utils/prisma';
import { generatePrompt, refinePrompt } from '../services/promptService';

const generateSchema = z.object({
  input: z.string().min(1),
});

const refineSchema = z.object({
  prompt: z.string().min(1),
});

export async function generate(req: Request, res: Response) {
  try {
    const { input } = generateSchema.parse(req.body);
    const result = generatePrompt(input);

    if (!result.success) {
      return res.json({
        needsClarification: true,
        clarification: result.clarification,
      });
    }

    if (req.user) {
      await prisma.promptHistory.create({
        data: {
          userId: req.user.userId,
          rawInput: input,
          result: result.result,
          type: result.type,
        },
      });
    }

    res.json({
      success: true,
      type: result.type,
      prompt: result.result,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid input' });
    }
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function refine(req: Request, res: Response) {
  try {
    const { prompt } = refineSchema.parse(req.body);
    const refined = refinePrompt(prompt);

    res.json({
      success: true,
      original: prompt,
      refined,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid input' });
    }
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
