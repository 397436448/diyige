import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export async function getHistory(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const [history, total] = await Promise.all([
      prisma.promptHistory.findMany({
        where: { userId: req.user.userId },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.promptHistory.count({
        where: { userId: req.user.userId },
      }),
    ]);

    res.json({
      history,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function deleteHistory(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id } = req.params;

    await prisma.promptHistory.deleteMany({
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

export async function toggleFavorite(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id } = req.params;

    const history = await prisma.promptHistory.findFirst({
      where: {
        id: parseInt(id),
        userId: req.user.userId,
      },
    });

    if (!history) {
      return res.status(404).json({ error: 'Not found' });
    }

    const updated = await prisma.promptHistory.update({
      where: { id: parseInt(id) },
      data: { isFavorite: !history.isFavorite },
    });

    res.json({ success: true, isFavorite: updated.isFavorite });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
