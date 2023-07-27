import express from 'express';
import catalogRoutes from './app/routes/catalog.routes.js';
import { sequelize } from './app/sequelize/index.js';
import './app/models/index.js';

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
catalogRoutes(app);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

sequelize
  .sync()
  .then(() => {
    console.log('Synced db.');
  })
  .catch((err) => {
    console.log('Failed to sync db: ' + err.message);
  });
