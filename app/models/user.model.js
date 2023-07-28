import Sequelize from 'sequelize';
import { sequelize } from '../sequelize/index.js';
import { mergeFields, setUnavailable } from '../helpers/utils.js';

const { STRING, FLOAT, VIRTUAL } = Sequelize.DataTypes;

const User = sequelize.define('user', {
  address: {
    type: STRING,
    primaryKey: true,
    allowNull: false,
  },
  cash1: FLOAT,
  cash2: FLOAT,
  cash3: FLOAT,
  cash: {
    type: VIRTUAL,
    get() {
      const fields = ['cash1', 'cash2', 'cash3'];
      const merged = mergeFields(fields, this);
      return merged;
    },
    set: setUnavailable,
  },
});

export default User;
