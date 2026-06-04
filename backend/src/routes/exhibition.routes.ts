import { Router } from 'express';
import { ExhibitionController } from '../controllers/exhibition.controller';

const router = Router();
router.get('/', ExhibitionController.getAll);
router.get('/:id', ExhibitionController.getOne);
router.post('/', ExhibitionController.create);
router.patch('/:id', ExhibitionController.update);
router.delete('/:id', ExhibitionController.delete);

export default router;
