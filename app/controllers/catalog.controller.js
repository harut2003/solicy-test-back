import Catalog from '../models/catalog.model.js';

export const findOne = async (req, res) => {
  const finded = await Catalog.findByPk(req.params.id, {
    attributes: {
      exclude: ['category'],
    },
  });

  if (!finded) {
    return res.status(404).send({ message: 'Catalog not found' });
  }
  const { id } = finded;

  res.json(finded);
};
