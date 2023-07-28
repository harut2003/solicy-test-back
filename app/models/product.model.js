import Sequelize from 'sequelize';
import { sequelize } from '../sequelize/index.js';

const { STRING, INTEGER } = Sequelize.DataTypes;

const Product = sequelize.define('product', {
  address: {
    type: STRING,
    allowNull: false,
  },
  id: {
    type: INTEGER,
    primaryKey: true,
    allowNull: false,
  },
});

export default Product;
