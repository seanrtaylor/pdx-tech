import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { createCompany } from '../actions/index';
import {connect} from 'react-redux';

const renderInput = field =>
  <div>
    <input {...field.input} type="field.type" />
    {field.meta.touched && field.meta.error &&
    <span className="error"> {field.meta.error}</span>}
  </div>


class CompanyNew extends Component {

  onFormSubmit(company) {
    this.props.createCompany(company);
  }

  render () {

    const { handleSubmit } = this.props;

    return (
      <form onSubmit={ handleSubmit(this.onFormSubmit.bind(this)) }>
        <h2> Add New Tech Company </h2>
        <div className="form-group">
          <label>Name</label>
          <Field name="name" component={renderInput} type="text" />
        </div>

        <div className="form-group">
          <label>Website Url</label>
          <Field name="url" component={renderInput} type="text" />
        </div>

        <div className="form-group">
          <label>Notes</label>
          <Field name="notes" component={renderInput} type="textarea" />
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
})(connect( null, { createCompany })(CompanyNew));

export default CompanyNew;
