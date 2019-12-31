import Joi from '@hapi/joi';
import * as JoiUtil from './joi-util';

test('getType', () => {
  expect(JoiUtil.getType('String')).toEqual(Joi.string())
});

test('append optional', () => {
  expect(JoiUtil.appendOptional(Joi.string(), false)).toEqual(Joi.string().required())
})

test('schemaFromDd', () => {
  const dd = [
    { arg: 'isObserved', type: 'Boolean', optional: false},
    { arg: 'name', type: 'String', optional: false},
    { arg: 'recognitionId', type: 'Int', optional: false},
    { arg: 'targetedId', type: 'Int', optional: false},
    { arg: 'historyEnd', type: 'LocalDateTime', optional: true},
    { arg: 'logDateAdded', type: 'LocalDateTime', optional: true, "column": "date_added"}

  ];

  const schema = {
    isObserved: Joi.boolean().required(),
    name: Joi.string().required(),
    recognitionId: Joi.number().required(),
    targetedId: Joi.number().required(),
    historyEnd: Joi.string()
  };

  const optouts = ['logDateAdded'];

  expect(JoiUtil.schemaFromDd(dd, optouts)).toEqual(schema);
});

