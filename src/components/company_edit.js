import React, { Component } from 'react';
import { Field, reduxForm, initialize } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCompany, editCompany } from '../actions/companies';
import { Link } from 'react-router';

//render for form fields
const renderInput = field =>
  <div>
    <input {...field.input} type="field.type"/>
    {field.meta.touched && field.meta.error &&
    <span className="error"> {field.meta.error}</span>}
  </div>

  //redux form doesn't support changing readOnly from true to false (maybe it does?)
  const renderInputReadOnly = field =>
    <div>
      <input {...field.input} type="field.type" readOnly/>
      {field.meta.touched && field.meta.error &&
      <span className="error"> {field.meta.error}</span>}
    </div>

  //for hidden
  const renderHidden = field =>
    <div>
      <input type="hidden"{...field.input} />
    </div>

class CompanyEdit extends Component {

  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidMount(){
    this.handleInitialize(this.props.singleCompany);
   }

  //this handles setting the initial state for our form
  handleInitialize(company) {
    const initData = {
      "name": company.name,
      "notes": company.notes,
      "url": company.url,
      "id": company.id
    };
    this.props.initialize(initData);
  }

  //calls to edit company action
  onFormSubmit(event){
    event.preventDefault();
    this.props.editCompany(this.props.form.CompanyEdit.values);
  }

  render () {
    return (
      <form onSubmit={ this.onFormSubmit } className="input-group">
             <div className="form-group">
               <label>Name</label>
               <Field name="name" component={renderInput} type="text"/>
               <div className="text-help">
                 {name.touched ? name.error : ''}
               </div>
             </div>

             <div className="form-group">
               <label>URL</label>
               <Field name="url" component={renderInput} type="text"/>
               <div className="text-help">
                 {name.blur ? name.error : ''}
               </div>
             </div>

             <div className="form-group">
               <label>Notes</label>
               <Field name="notes" component={renderInput} type="textarea"/>
               <div className="text-help">
                 {name.touched ? name.error : ''}
               </div>
             </div>
             <button type="submit" className="btn btn-primary">Update Company</button>
           </form>
    );
  }
}

function validate(values) {
    const errors = {};
    if (!values.name) {
      errors.name = 'Enter a Company Name';
    }
    if (!values.url) {
      errors.url = 'Enter a Company URL';
    }
    return errors;
}


function mapStateToProps({ company, form }) {
  return { company, form };
}

CompanyEdit = reduxForm({
  form: 'CompanyEdit',
  validate
})(connect( mapStateToProps, { editCompany })(CompanyEdit));

export default CompanyEdit;
