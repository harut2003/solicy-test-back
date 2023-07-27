import { Router } from 'express';
import * as catalogController from '../controllers/catalog.controller.js';

export default function (app) {
  const router = Router();

  router.get('/:id', catalogController.findOne);

  app.use('/catalog', router);
}
