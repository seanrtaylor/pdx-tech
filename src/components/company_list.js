import React from 'react';
import CompanyItem from './company_item';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCompanies, createCompany, voteCompany, downVoteCompany, setActiveCompany } from '../actions/companies';
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

  handleActiveCompany(company){
    this.props.setActiveCompany(company);
  }

  handleEditCompany(){
    this.props.editCompany(this.props.form.CompanyEdit.values);
  }

  render() {
    return (
      <div>
        <div className="text-xs-right">
          <div>
            {this.props.company.map((singleCompany) => {
              return (
                <CompanyItem
                  key={singleCompany.id}
                  company={singleCompany}
                  handleUpVote={() => this.handleUpVote(singleCompany)}
                  handleDownVote={() => this.handleDownVote(singleCompany)}
                  handleActiveCompany={() => this.handleActiveCompany(singleCompany)}
                  handleEditCompany={() => this.handleEditCompany(updatedCompany)}
                />
              );
            })}
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
  return bindActionCreators ({ getCompanies, createCompany, voteCompany}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Company);
