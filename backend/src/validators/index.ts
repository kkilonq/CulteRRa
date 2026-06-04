import { z } from 'zod';

export const ExhibitionSchema = z.object({
  title: z.string().min(1, 'Название выставки обязательно'),
  ticketPrice: z.number().min(0, 'Цена не может быть отрицательной'),
  isInterregional: z.boolean(),
  description: z.string().optional()
});

export const ExhibitSchema = z.object({
  title: z.string().min(1, 'Название экспоната обязательно'),
  author: z
    .string()
    .min(1, 'Автор обязателен')
    .refine((val) => !/^\d+$/.test(val), {
      message: 'Имя автора не может состоять только из цифр',
    }),
  creationYear: z
    .number({ invalid_type_error: 'Введите целое положительное число' })
    .int('Введите целое положительное число')
    .min(0, 'Введите целое положительное число')
    .optional(),
  exhibitionId: z.string().min(1, 'ID выставки обязателен')
});