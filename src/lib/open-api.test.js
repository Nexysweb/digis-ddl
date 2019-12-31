import * as OpenApi from './open-api';
import * as Y from './yaml';

test('toUnit', () => {
  const dd = [
    { arg: 'isObserved', type: 'Boolean', optional: false},
    { arg: 'name', type: 'String', optional: false},
    { arg: 'recognitionId', type: 'Int', optional: false},
    { arg: 'targetedId', type: 'Int', optional: false},
    { arg: 'historyEnd', type: 'LocalDateTime', optional: true},
    { arg: 'logDateAdded', type: 'LocalDateTime', optional: true}
  ];

  const properties = {
    isObserved: {type: 'boolean'},
    name: {type: 'string'},
    recognitionId: {type: 'integer'},
    targetedId: {type: 'integer'},
    historyEnd: {type: 'LocalDateTime'},
    logDateAdded: {type: 'LocalDateTime'}
  };

  const required = ['isObserved', 'name', 'recognitionId', 'targetedId'];
  const title = 'myname';
  const type = 'object';

  const e = {title, type, properties, required};

  expect(OpenApi.toUnit(title, dd)).toEqual(e);
});

test('toOpenApi', () => {
  const dd = [
    {
      name: 'm1',
      params: [
        { arg: 'isObserved', type: 'Boolean', optional: false},
        { arg: 'name', type: 'String', optional: false},
        { arg: 'recognitionId', type: 'Int', optional: false}
      ]
    },
    {
      name: 'm2',
      params: [
        { arg: 'targetedId', type: 'Int', optional: false},
        { arg: 'historyEnd', type: 'LocalDateTime', optional: true},
        { arg: 'logDateAdded', type: 'LocalDateTime', optional: true}
      ]
    }
  ];

  const p1 = {
    isObserved: {type: 'boolean'},
    name: {type: 'string'},
    recognitionId: {type: 'integer'}
  };

  const p2 = {
    targetedId: {type: 'integer'},
    historyEnd: {type: 'LocalDateTime'},
    logDateAdded: {type: 'LocalDateTime'}
  };

  const r1 = ['isObserved', 'name', 'recognitionId'];
  const r2 = ['targetedId'];
  const type = 'object';

  const e = {
    m1: {title: 'm1', type, properties: p1, required: r1},
    m2: {title: 'm2', type, properties: p2, required: r2}
  };

  const r = OpenApi.toOpenApiJson(dd);
  const rYaml = OpenApi.toOpenApi(dd);

  expect(r).toEqual(e);
  expect(Y.toJson(rYaml)).toEqual(e);
});