import Sequelize from 'sequelize';
import { sequelize } from '../sequelize/index.js';

const { INTEGER, TINYINT, STRING } = Sequelize.DataTypes;

const generateValidNumbers = (max) =>
  new Array(max).fill(null).map((_, idx) => idx + 1);

const Asset = sequelize.define('asset', {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  type: {
    type: TINYINT,
    validate: {
      isIn: {
        args: [generateValidNumbers(3)],
        msg: 'Invalid type, please insert [1,2,3]',
      },
    },
  },
  level: {
    type: TINYINT,
    validate: {
      isIn: {
        args: [generateValidNumbers(10)],
        msg: 'Invalid level, please insert [1...10]',
      },
    },
  },
  address: STRING,
});

export default Asset;
