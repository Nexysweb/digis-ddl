import React from 'react';

export default props => {
  const { name } = props;
  const className = 'fa fa-' + name;
  return <i className={className}/>;
}