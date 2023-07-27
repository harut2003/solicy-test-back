import Sequelize from 'sequelize';
import { sequelize } from '../sequelize/index.js';

const { STRING, FLOAT } = Sequelize.DataTypes;

const User = sequelize.define('user', {
  address: {
    type: STRING,
    primaryKey: true,
    allowNull: false,
  },
  cash1: FLOAT,
  cash2: FLOAT,
  cash3: FLOAT,
});

export default User;
