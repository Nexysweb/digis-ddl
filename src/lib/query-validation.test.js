import Joi from 'joi';
import { isCrud, isSchema } from './query-validation';

test('simple query test', () => {
  const j = {
    PlanParticipant: {
      params: {},
      projection: {},
      filters: { plan: { id: 45 } }
    },
    Partner: {
      projection: {}
    }
  };

  expect(isCrud(j)).toEqual(true);
});

test('simple query test - fail (`filters` is misspelt)', () => {
  const j = {
    PlanParticipant: {
      params: {},
      projection: {},
      filter: { plan: { id: 45 } }
    },
    Partner: {
      projections: {}
    }
  };

  expect(isCrud(j)).toEqual(false);
});

const ddl = [
  {
    name: 'Test',
    params: [
      {arg: 'name', type: 'String', optional: false},
      {arg: 'age', type: 'Int', optional: false},
    ]
  }
];

test('is schema', () => {
  const j = {
    Test: {
      params: {},
      projection: {},
      filter: { }
    }
  };

  expect(isSchema(j, ddl)).toEqual(true);
})

test('is not schema - entity misspelt', () => {
  const j = {
    Tesst: {
      params: {},
      projection: {},
      filter: { }
    }
  };

  expect(isSchema(j, ddl)).toEqual(false);
});

test('is schema - with model', () => {
  const model = [
    {
      "name": "Country",
      "fields": [
        {
          "name": "name",
          "type": "String",
          "optional": false
        }
      ]
    },
    {
      "name": "City",
      "fields": [
        {
          "name": "country",
          "type": "Country",
          "optional": false
        },
        {
          "name": "name",
          "type": "String",
          "optional": false
        }
      ]
    }
  ];

  const query1 = {
    'Country': {projection: {'name': true}, filters: {name: 'Bolivia'}},
    'City': {projection: {'name': true, country: {name: true}}},
  };

  const query2 = {
    'EntityDoesNotExist': {projection: {'name': true}, filters: {name: 'Bolivia'}},
    'City': {projection: {'name': true, country: {name: true}}},
  };

  const query3 = {
    'Country': {projection: {'fielddoesnotexit1': true}, filters: {name: 'Bolivia'}},
    'City': {projection: {'name': true, country: {name: true}}},
  };

  const query4 = {
    'Country': {projection: {'name': true}, filters: {name: 'Bolivia'}},
    'City': {projection: {'fielddoesnotexit2': true, country: {name: true}}},
  };

  const query5 = {
    'Country': {projection: {'name': true}, filters: {fielddoesnotexit3: 'Bolivia'}},
    'City': {projection: {'name': true, country: {name: true}}},
  };

  const query6 = {
    'Country': {projection: {'name': true}, filters: {name: 'Bolivia'}},
    'City': {projection: {'name': true, country: {fielddoesnotexit4: true}}},
  };

  expect(isCrud(query1, model)).toEqual(true);
  expect(isCrud(query2, model)).toEqual(false);
  expect(isCrud(query3, model)).toEqual(false);
  expect(isCrud(query4, model)).toEqual(false);
  expect(isCrud(query5, model)).toEqual(false);
  expect(isCrud(query6, model)).toEqual(false);
})
