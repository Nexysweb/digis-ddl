import Index from './index';

test('Index', () => {
  expect(typeof Index.QueryValidation).toEqual('object');
  expect(typeof Index.SchemaValidation).toEqual('object');
  expect(typeof Index.JoiUtil).toEqual('object');
  expect(typeof Index.OpenApi).toEqual('object');
});