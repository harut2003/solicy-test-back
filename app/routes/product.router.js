import { Router } from 'express';
import * as productController from '../controllers/product.controller.js';

export default function (app) {
  const router = Router();

  router.post('/', productController.buyOne);

  app.use('/buyProduct', router);
}
