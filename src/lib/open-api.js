import * as Y from './yaml';

export const toOpenApiType = t => {
  switch (t) {
    case 'String':
      return 'string';
    case 'Int':
      return 'integer';
    case 'BigDecimal':
    case 'Double':
      return 'number';
    case 'Boolean':
      return 'boolean';
    default:
      return t;
  }
}

export const toUnit = (title, ddUnit) => {
  const r = {
    title,
    type: 'object',
    properties: {},
    required: []
  };

  ddUnit.map(l => {
    r.properties[l.arg] = {type: toOpenApiType(l.type)};

    if (!l.optional) {
      r.required.push(l.arg)
    }

    return null;
  });

  return r;
}

export const toOpenApiJson = dd => {
  const r = {};

  dd.map(l => {
    r[l.name] = toUnit(l.name, l.params);

    return null;
  });

  return r;
}

export const toOpenApi = dd => Y.toYaml(toOpenApiJson(dd));
