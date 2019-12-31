import * as Y from './yaml';

test('JSON to YML', () => {
  const j = {test: 'sdf', myarray: [1, 2, 3], myobject: {obj1: 'myobj1', obj2: 'myobj2', obj3: 'myobj3'}};
  const y = `test: sdf
myarray:
  - 1
  - 2
  - 3
myobject:
  obj1: myobj1
  obj2: myobj2
  obj3: myobj3
`;

  expect(Y.toYaml(j)).toEqual(y);
  expect(Y.toJson(y)).toEqual(j);
});