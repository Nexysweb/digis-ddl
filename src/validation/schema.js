import React from 'react'

import { validateModelDef } from '../lib/schema-validation';

import wrapComponent from '../hoc'

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

const ValidateComponent = wrapComponent(validateSchema)(() => {});

export default () => (<div className="container">
  <h2>Schema Validation</h2>
  <ValidateComponent/>
</div>);

