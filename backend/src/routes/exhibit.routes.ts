import { Router } from 'express';
import { ExhibitController } from '../controllers/exhibit.controller';

const router = Router();
router.get('/', ExhibitController.getAll);
router.get('/:id', ExhibitController.getOne);
router.post('/', ExhibitController.create);
router.patch('/:id', ExhibitController.update);
router.delete('/:id', ExhibitController.delete);

export default router;
