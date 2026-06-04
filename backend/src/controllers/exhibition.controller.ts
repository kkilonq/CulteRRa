import { Request, Response } from 'express';
import { exhibitions, exhibits } from '../store';
import { ExhibitionSchema } from '../validators';
import { Exhibition } from '../types';
import * as crypto from 'crypto';

export const ExhibitionController = {
  getAll: (req: Request, res: Response) => {
    let result = [...exhibitions];
  
    const q = req.query.q as string;
    if (q) {
      result = result.filter(e => e.title.toLowerCase().includes(q.toLowerCase()));
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const total = result.length;
    const pages = Math.ceil(total / limit);
    
    const startIndex = (page - 1) * limit;
    const items = result.slice(startIndex, startIndex + limit);

    res.json({ items, total, page, pages });
  },

  getOne: (req: Request, res: Response): any => {
    const exhibition = exhibitions.find(e => e.id === req.params.id);
    if (!exhibition) return res.status(404).json({ error: 'Выставка не найдена' });

    const linkedExhibits = exhibits.filter(ex => ex.exhibitionId === exhibition.id);
    res.json({ ...exhibition, exhibits: linkedExhibits });
  },

  create: (req: Request, res: Response): any => {
    const validation = ExhibitionSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(422).json({ error: validation.error.errors[0].message });
    }

    const nextId = exhibitions.length > 0 ? String(Math.max(...exhibitions.map(e => Number(e.id))) + 1) : '1';

    const newExhibition: Exhibition = {
      id: nextId,
      ...validation.data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    exhibitions.push(newExhibition);
    res.status(201).json(newExhibition);
  },


  update: (req: Request, res: Response): any => {
    const index = exhibitions.findIndex(e => e.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Выставка не найдена' });

    const validation = ExhibitionSchema.partial().safeParse(req.body);
    if (!validation.success) {
      return res.status(422).json({ error: validation.error.errors[0].message });
    }

    exhibitions[index] = {
      ...exhibitions[index],
      ...validation.data,
      updatedAt: new Date().toISOString()
    };

    res.json(exhibitions[index]);
  },

  delete: (req: Request, res: Response): any => {
    const index = exhibitions.findIndex(e => e.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Выставка не найдена' });

    exhibitions.splice(index, 1);
    res.status(204).send();
  }
};
