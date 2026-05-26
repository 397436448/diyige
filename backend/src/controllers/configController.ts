import { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../utils/prisma';
import { encrypt, decrypt } from '../utils/encryption';

const configSchema = z.object({
  provider: z.string(),
  apiKey: z.string(),
  endpoint: z.string().optional(),
});

export async function getConfig(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const configs = await prisma.userApiConfig.findMany({
      where: { userId: req.user.userId },
    });

    const redactedConfigs = configs.map(config => ({
      id: config.id,
      provider: config.provider,
      endpoint: config.endpoint,
      createdAt: config.createdAt,
      hasApiKey: true,
    }));

    res.json({ configs: redactedConfigs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function saveConfig(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { provider, apiKey, endpoint } = configSchema.parse(req.body);
    const encryptedKey = encrypt(apiKey);

    const existing = await prisma.userApiConfig.findFirst({
      where: {
        userId: req.user.userId,
        provider,
      },
    });

    let config;
    if (existing) {
      config = await prisma.userApiConfig.update({
        where: { id: existing.id },
        data: {
          apiKeyEncrypted: encryptedKey,
          endpoint,
        },
      });
    } else {
      config = await prisma.userApiConfig.create({
        data: {
          userId: req.user.userId,
          provider,
          apiKeyEncrypted: encryptedKey,
          endpoint,
        },
      });
    }

    res.json({
      success: true,
      config: {
        id: config.id,
        provider: config.provider,
        endpoint: config.endpoint,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid input' });
    }
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function deleteConfig(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id } = req.params;

    await prisma.userApiConfig.deleteMany({
      where: {
        id: parseInt(id),
        userId: req.user.userId,
      },
    });

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function testConnection(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { provider } = req.body;

    const config = await prisma.userApiConfig.findFirst({
      where: {
        userId: req.user.userId,
        provider,
      },
    });

    if (!config) {
      return res.status(404).json({ error: 'Config not found' });
    }

    res.json({ success: true, message: 'Connection test passed (simulated)' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
