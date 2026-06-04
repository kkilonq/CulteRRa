import { Request, Response } from 'express';
import { exhibits, exhibitions } from '../store';
import { ExhibitSchema } from '../validators';
import { Exhibit } from '../types';

export const ExhibitController = {
  getAll: (req: Request, res: Response) => {
    let result = [...exhibits];

    const exhibitionId = req.query.exhibitionId as string;
    if (exhibitionId) {
      result = result.filter(e => e.exhibitionId === exhibitionId);
    }

    const q = req.query.q as string;
    if (q) {
      result = result.filter(e => 
        e.title.toLowerCase().includes(q.toLowerCase()) || 
        e.author.toLowerCase().includes(q.toLowerCase())
      );
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const total = result.length;
    const pages = Math.ceil(total / limit);
    const items = result.slice((page - 1) * limit, page * limit);
    
    res.json({ items, total, page, pages });
  },

  getOne: (req: Request, res: Response): any => {
    const exhibit = exhibits.find(e => e.id === req.params.id);
    if (!exhibit) return res.status(404).json({ error: 'Экспонат не найден' });

    const exhibition = exhibitions.find(ex => ex.id === exhibit.exhibitionId);
    res.json({ ...exhibit, exhibition });
  },

  create: (req: Request, res: Response): any => {
    const validation = ExhibitSchema.safeParse(req.body);
    if (!validation.success) {
      const firstErrorText = validation.error.errors[0]?.message || 'Ошибка валидации данных';
      return res.status(422).json({ error: firstErrorText });
    }

    const exExists = exhibitions.some(ex => ex.id === validation.data.exhibitionId);
    if (!exExists) return res.status(422).json({ error: 'Указанная выставка не существует' });

    let nextId = '1';
    if (exhibits.length > 0) {
      const numericIds = exhibits.map(e => parseInt(e.id, 10)).filter(id => !isNaN(id));
      if (numericIds.length > 0) {
        nextId = String(Math.max(...numericIds) + 1);
      } else {
        nextId = String(exhibits.length + 1);
      }
    }

    const newExhibit: Exhibit = {
      id: nextId,
      ...validation.data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    exhibits.push(newExhibit);
    res.status(201).json(newExhibit);
  },

  update: (req: Request, res: Response): any => {
    const index = exhibits.findIndex(e => e.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Экспонат не найден' });

    const validation = ExhibitSchema.partial().safeParse(req.body);
    if (!validation.success) {
      return res.status(422).json({ error: validation.error.errors[0].message });
    }

    exhibits[index] = {
      ...exhibits[index],
      ...validation.data,
      updatedAt: new Date().toISOString()
    };

    res.json(exhibits[index]);
  },

  delete: (req: Request, res: Response): any => {
    const index = exhibits.findIndex(e => e.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Экспонат не найден' });

    exhibits.splice(index, 1);
    res.status(204).send();
  }
};