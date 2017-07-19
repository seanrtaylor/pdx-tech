import React from 'react';
import CompanyItem from './company_item';
import CompanyHeader from './company_header';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCompanies, createCompany, voteCompany, downVoteCompany, setActiveCompany, deleteCompany } from '../actions/companies';
import { Button, Modal } from 'react-bootstrap';

class Company extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
     this.props.getCompanies();
  }

  handleUpVote(company){
    let direction = "up";
    this.props.voteCompany(company, direction);
  }

  handleDownVote(company){
    let direction = "down";
    this.props.voteCompany(company, direction);
  }

  //depricated
  handleActiveCompany(company){
    this.props.setActiveCompany(company);
  }

  handleEditCompany(){
    this.props.editCompany(this.props.form.CompanyEdit.values);
  }

  //calls to edit company action
  handleDeleteCompany(company){
    var result = confirm("Are you sure you want to delete this company?");
       if (result) {
           this.props.deleteCompany(company);
    }
  }

  render() {
    return (
      <div>
        <CompanyHeader />
        <div>
          <div className="text-xs-right">
            <div>
              {this.props.company.map((singleCompany) => {
                return (
                  <div>
                    <CompanyItem
                      key={singleCompany.id}
                      company={singleCompany}
                      handleUpVote={() => this.handleUpVote(singleCompany)}
                      handleDownVote={() => this.handleDownVote(singleCompany)}
                      handleActiveCompany={() => this.handleActiveCompany(singleCompany)}
                      handleEditCompany={() => this.handleEditCompany(updatedCompany)}
                      handleDeleteCompany={() => this.handleDeleteCompany(singleCompany)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ company }) {
  return { company };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators ({ getCompanies, createCompany, voteCompany, deleteCompany}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Company);
