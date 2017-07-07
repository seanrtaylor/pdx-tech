import React, { Component } from 'react';
import CompanyEdit from './company_edit';
import { Col, Modal, Button } from 'react-bootstrap';
import { Field } from 'redux-form';
import { Link } from 'react-router';


//render for form fields
 const renderInput = field =>
   <div>
     <input {...field.input} type="field.type"/>
     {field.meta.touched && field.meta.error &&
     <span className="error"> {field.meta.error}</span>}
   </div>


export default class CompanyItem extends Component {
  constructor(props) {
      super(props);
      this.state = {showModal: false};
      this.closeEditModal = this.closeEditModal.bind(this);
      this.openEditModal = this.openEditModal.bind(this);
  }

  //close and open for modal
  closeEditModal(){
    this.setState({ showModal: false });
  }

  openEditModal(){
    this.setState({ showModal: true });
  }

  render() {
    return (
          <Col xs={6} md={4}>
            <div className="company-card">
              <Link to={`/company/${this.props.company.id}`}>
                <div className="company-name" onClick={this.props.handleActiveCompany}>
                  <h4>{this.props.company.name}</h4>
                </div>
              </Link>

              <div className="edit-pencil">
                  <i className="fa fa-pencil" onClick={this.openEditModal} aria-hidden="true"></i> Edit
              </div>
                <div className="company-card-footer">
                  <div className="company-url">
                    <i className="fa fa-globe" aria-hidden="true"></i>
                    <a href={this.props.company.url}> Website</a>
                  </div>
                  <div className="company-score">
                    <div className="thumbs">
                        <i className="fa fa-thumbs-o-up" onClick={this.props.handleUpVote} aria-hidden="true"></i>
                        <i className="fa fa-thumbs-o-down" onClick={this.props.handleDownVote} aria-hidden="true"></i>
                    </div>
                    Score: {this.props.company.score}
                  </div>
                </div>
              </div>
              <Modal show={this.state.showModal} onHide={this.closeEditModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Details for {this.props.company.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <CompanyEdit singleCompany={this.props.company}/>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={this.closeEditModal}>Close</Button>
                </Modal.Footer>
              </Modal>
          </Col>
    );
  }
}
