import Sequelize from 'sequelize';
import Asset from '../models/asset.model.js';
import Catalog from '../models/catalog.model.js';
import User from '../models/user.model.js';
import Product from '../models/product.model.js';

const generateErrorMessage = (message) => ({
  success: false,
  errorMessage: {
    message,
  },
});

export const buyOne = async (req, res) => {
  const { id, address } = req.body;
  const sameProduct = await Product.findOne({
    where: {
      address,
      id,
    },
  });

  if (sameProduct) {
    return res
      .status(503)
      .send(generateErrorMessage('You have already purchased this product'));
  }

  const catalog = await Catalog.findOne({
    where: {
      id,
    },
    attributes: [
      'cost1',
      'cost2',
      'cost3',
      'price',
      'req1',
      'req2',
      'req3',
      'req',
    ],
  });

  const enableReqs = Object.entries(catalog.req).filter(
    ([, value]) => value !== null
  );

  const userCash = await User.findOne({
    where: {
      address,
    },
    attributes: ['cash1', 'cash2', 'cash3', 'cash'],
    ...(enableReqs.length && {
      include: {
        model: Asset,
        where: {
          type: {
            [Sequelize.Op.or]: enableReqs.map(([key]) =>
              parseInt(key[key.length - 1])
            ),
          },
        },
        required: false,
      },
    }),
  });

  const arrUserCash = Object.entries(userCash.cash);
  const enoughCash = arrUserCash.every(([key, value], i) => {
    key = key[key.length - 1];

    if (value < catalog.price[`cost${key}`]) {
      return false;
    }
    return true;
  });

  if (!enoughCash) {
    return res
      .status(503)
      .send(generateErrorMessage('There is not enough cash'));
  }

  if (userCash.assets) {
    if (!userCash.assets.length) {
      return res.status(503).send(generateErrorMessage('You dont have assets'));
    }
    const isLevelLess = userCash.assets.every(
      ({ level, type }) => level < catalog.req['req' + type]
    );
    if (!isLevelLess) {
      return res
        .status(503)
        .send(generateErrorMessage('Level is higher than req'));
    }
  }

  const amount = arrUserCash.reduce((agg, [key, value]) => {
    const lastDigit = key[key.length - 1];
    return {
      ...agg,
      [`cash${lastDigit}`]: value - catalog.price[`cost${lastDigit}`],
    };
  }, {});

  await User.update(amount, {
    where: { address },
  });

  await Product.create({
    address,
    id,
  });

  res.json({
    success: true,
    data: {
      resources: {
        ...amount,
      },
    },
  });
};
