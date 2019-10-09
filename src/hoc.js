import React from 'react';

const isJson = j => {
  try {
    JSON.parse(j)
    return true;
  } catch (err) {
    return false;
  }
}

export default (validationFunc) => WrappedComponent => class Hoc extends React.Component {
  constructor (props) {
    super(props);

    this.state = {content: '', errors: null};
  }

  handleSubmit = () => {
    const { content } = this.state;

    // 1 check if JSON
    if (!isJson(content)) {
      const errors = ['the string you entered is not a JSON string, try again'];
      this.setState({errors, message: null});
      return;
    }

    // 2 check if it is a DDL file
    const validation = validationFunc(content);
    console.log(validation)
    
    if(validation.errors) {
      this.setState({errors: validation.errors, message: null});
      return;
    }

    // else
    const errors = null;
    const message = 'Congratulations, this is a valid file';

    this.setState({errors, message});
  }

  handleChange = (a) => {
    const content = a.target.value;

    this.setState({content});
  }

  renderError() {
    const { errors } = this.state;

    if (!errors) {
      return null;
    }

    return (<ul className="list-group">
      {errors.map((error, i) => {
        return <li className="list-group-item list-group-item-danger" key={i}>{error}</li>
      })}
    </ul>)
  }

  renderSuccess() {
    const { message } = this.state;
    if (!message) {
      return null;
    }

    return <p className="alert alert-success">{message}</p>;
  }

  render() {
    const {content} = this.state;
    return (<React.Fragment>

      {this.renderError()}
      {this.renderSuccess()}

      <div className="row">
        <div className="col-md-12">
          <textarea className="form-control" style={{minWidth: '100%', height: '400px'}} placeholder={'insert your json here'} value={content} onChange={this.handleChange}/>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <button className="btn btn-primary" type="submit" onClick={this.handleSubmit}>Validate</button>
        </div>
      </div>
    </React.Fragment>)
  }
}
