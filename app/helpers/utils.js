const mergeFields = (fields, Model) => {
  return fields.reduce(
    (agg, field) => ({
      ...agg,
      [field]: Model.getDataValue(field),
    }),
    {}
  );
};

const setUnavailable = (fieldName) => {
  throw new Error(`Do not try to set the \`${fieldName}\` value!`);
};

export { mergeFields, setUnavailable };
