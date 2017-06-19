import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { createCompany } from '../actions/index';

class CompanyNew extends Component {
  render () {
    const { fields: { name, url, notes }, handleSubmit } = this.props;

    console.log(name);

    return (
      <form onSubmit={handleSubmit(this.props.createCompany)}>
        <h2> Add New Tech Company </h2>
        <div className="form-group">
          <label>Name</label>
          <Field name="name" component="input" type="text" />
        </div>

        <div className="form-group">
          <label>Website Url</label>
          <Field name="url" component="input" type="text" />
        </div>

        <div className="form-group">
          <label>Notes</label>
          <Field name="notes" component="input" type="textarea" />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    );
  }
}

//connect: first arg is mstp, second is mdtp,
//redux-form: first arg is config, 2 mstp, 3, mdtp

CompanyNew = reduxForm({
  form: 'CompanyNew'
})(CompanyNew)

export default CompanyNew;
