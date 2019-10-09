// to move to lib
import Joi from 'joi';

/**
 * validate query that is used to query crud `/data` endpoint
 * @param body payload that is sent
 * @param model [optional], if given check that query fields match the ones of the model
 * @return true or false with and prints errors
 */
export const isCrud = (body, model = null) => {
  // to validate hashmap: https://github.com/hapijs/joi/issues/1294
  // lazy (for recursive validation): https://stackoverflow.com/questions/51477603/using-joi-how-to-define-recursive-array-of-objects-validation-with-n-depth
  const hashmapBoolean = Joi.object().pattern(/\w/, Joi.alternatives().try(Joi.boolean(), Joi.number(), Joi.string(), Joi.array(), Joi.lazy(() => hashmapBoolean)));

  const schema = Joi.object().pattern(/\w/, Joi.object().keys({
    params: hashmapBoolean.optional(),
    projection: hashmapBoolean.optional(),
    references: hashmapBoolean.optional(),
    filters: hashmapBoolean.optional(),
    take: Joi.number().optional(),
    skip: Joi.number().optional(),
    order: hashmapBoolean.optional()
  }));

  const validationOptions = {
    abortEarly: false, // do not stop after first error
    allowUnknown: false
  };

  const result = Joi.validate(body, schema, validationOptions);

  if (!result.error) {
    if (model) {
      return isSchema(body, model)
    }

    return true;
  } else {
    console.error(JSON.stringify(result.error));
    return false;
  }
}

/**
 * check `projection` and `filters`
 * @param  {[type]} projection : projectio or filters object
 * @param  {[type]} entity  : model entity
 * @param  {[type]} ddl    : full model
 * @return {[type]}   true/false
 */
export const checkFields = (projection, entity, ddl) => {
  if (!projection) {
    return true;
  }

  // turn into array
  const projectionArray = Object.keys(projection);

  // make sure array length > 0 (otherwise reduce returns error)
  if(projectionArray.length === 0) {
    return true;
  }

  return projectionArray.map(projectionField => {
    const field = entity.fields.find(x => x.name === projectionField);

    if (!field) {
      console.error(`In entity "${entity.name}", the field "${projectionField}" does not exist`);
      return false;
    }

    const projectionFieldValue = projection[projectionField];

    if (typeof projectionFieldValue === 'object') {
      // here check nesting
      const e = findEntity(field.type, ddl);

      if (!e) {
        return false;
      }
      
      return checkFields(projectionFieldValue, e, ddl);
    }

    return true;
  }).reduce((x, y) => !(!x || !y));
}

export const findEntity = (entity, ddl) => {
  const e = ddl.find(x => x.name === entity);

  if (!e) {
    console.error(`The entity "${entity}" could not be found in model`);
  }

  return e;
}

/**
 * validate schema against query
 * @param  query: query [description]
 * @param ddl  model
 * @return true/false (prints detail about the error)
 */
export const isSchema = (query, ddl) => {
  const allEntities = Object.keys(query).map(k => {

    const entity = findEntity(k, ddl);

    if (entity) {
      // go through fields
      // // projection
      const p = checkFields(query[k].projection, entity, ddl);
      // // filters
      const f = checkFields(query[k].filters, entity, ddl);

      return !(!f || !p);
    }
    
    return false;
  });

  return allEntities.reduce((x, y) => !(!x || !y));
}
