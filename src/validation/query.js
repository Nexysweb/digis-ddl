import React from 'react'

import { isCrud } from '../lib/query-validation';

import wrapComponent from '../hoc'

const validationQuery = content => {
  const validation = isCrud(content);

  if (!validation) {
    return { errors: ['the query is invalid, refer to the console for more details']};
  }

  return validation;
}

const ValidateQuery = wrapComponent(validationQuery)(() => {});

export default () => (<div className="container">
  <h2>Query Validation</h2>
  <ValidateQuery/>
</div>);

