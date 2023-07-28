import Sequelize from 'sequelize';
import { sequelize } from '../sequelize/index.js';
import { mergeFields, setUnavailable } from '../helpers/utils.js';

const { STRING, INTEGER, VIRTUAL } = Sequelize.DataTypes;

const Catalog = sequelize.define('catalog', {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: STRING,
  description: STRING,
  url: STRING,
  cost1: INTEGER,
  cost2: INTEGER,
  cost3: INTEGER,
  req1: INTEGER,
  req2: INTEGER,
  req3: INTEGER,
  category: INTEGER,
  price: {
    type: VIRTUAL,
    get() {
      const fields = ['cost1', 'cost2', 'cost3'];
      const merged = mergeFields(fields, this);
      return merged;
    },
    set: setUnavailable,
  },
  req: {
    type: VIRTUAL,
    get() {
      const fields = ['req1', 'req2', 'req3'];
      const merged = mergeFields(fields, this);
      return merged;
    },
    set: setUnavailable,
  },
});

export default Catalog;
