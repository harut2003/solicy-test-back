import './catalog.model.js';
import User from './user.model.js';
import Asset from './asset.model.js';
import Product from './product.model.js';

User.hasMany(Asset, {
  foreignKey: 'address',
  sourceKey: 'address',
});
Asset.belongsTo(User, {
  foreignKey: 'address',
  targetKey: 'address',
});

User.hasOne(Product, {
  foreignKey: 'address',
  sourceKey: 'address',
});
Product.belongsTo(User, {
  foreignKey: 'address',
  targetKey: 'address',
});
