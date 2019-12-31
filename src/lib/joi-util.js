import Joi from '@hapi/joi';

export const getType = (typeName) => {
  switch(typeName) {
    case 'String':
      return Joi.string();
    case 'Boolean':
      return Joi.boolean();
    case 'Int':
      return Joi.number();
    default:
      return null;
  }

  return null;
}

export const appendOptional = (j, optional = false) => {
  if (!optional) {
    return j.required();
  }

  return j;
}

export const schemaFromDd = dd => {
  const r = {};

  Object.keys(dd).map(k => {
    const line = dd[k]
    const name = line.arg;

    r[name] = appendOptional(getType(line.type), line.optional);
  });

  return r;
}