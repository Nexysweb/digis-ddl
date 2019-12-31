import Joi from '@hapi/joi';

export const getType = (typeName) => {
  switch(typeName) {
    case 'String':
      return Joi.string();
    case 'Boolean':
      return Joi.boolean();
    case 'Int':
    case 'BigDecimal':
    case 'Double':
      return Joi.number();
    case 'LocalDateTime':
    case 'LocalDate':
      return Joi.string();
    default:
      console.warn(`The type "${typeName}" could not be converted to Joi, this may create some errors`);
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

/**
 * [description]
 * @param  {[type]} dd      [description]
 * @param  {Array}  optouts list of arguments that need to be ignored (e.g. logdateadeed)
 * @return {[type]}         [description]
 */
export const schemaFromDd = (dd, optouts = []) => {
  const r = {};

  Object.keys(dd).map(k => {
    const line = dd[k]
    const name = line.arg;

    if (!optouts.includes(name)) {
      r[name] = appendOptional(getType(line.type), line.optional);
    }
  });

  return r;
}