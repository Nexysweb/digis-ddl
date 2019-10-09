import React from 'react'

import { validateModelDef } from './lib/schema-validation';
import { isCrud } from './lib/query-validation';

import wrapComponent from './hoc'

const validateSchema = content => {
  const validation = validateModelDef(content)

  if(validation && !validation.status) {
    const errors = ['the string you entered is not a properly formatted DDL file, try again'].concat(validation.errors.map(x => {
      return x;
    })
    );

    return {errors};
  }

  return validation;
}

const validationQuery = content => {
  const validation = isCrud(content);

  if (!validation) {
    return { errors: ['the query is invalid, refer to the console for more details']};
  }

  return validation;
}

const ValidateComponent = wrapComponent(validateSchema)(() => {});
const ValidateQuery = wrapComponent(validationQuery)(() => {});

export default () => (<div className="container">
  <h1>DDL Checker</h1>
  <p>Details <a href="../">here</a></p>

  <h2>Schema Validation</h2>
  <ValidateComponent/>

  <h2>Query Validation</h2>
  <ValidateQuery/>
</div>);

