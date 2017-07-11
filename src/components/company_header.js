import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import CompanyNew from './company_new';

export default class CompanyHeader extends React.Component {

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
      <div>
      <div>
        <h1>Portland Tech Companies
          <Button bsStyle="primary"
            onClick={this.openEditModal}>
            Add New
            <i className="fa fa-plus" aria-hidden="true"></i>
          </Button>
        </h1>
      </div>
      <Modal show={this.state.showModal} onSubmit={this.closeEditModal} onHide={this.closeEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>New Company</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CompanyNew />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.closeEditModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
    );
  }
}
