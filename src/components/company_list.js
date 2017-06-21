import React from 'react';
import CompanyItem from './company_item';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCompanies, createCompany, upVoteCompany, downVoteCompany } from '../actions/companies';


class Company extends React.Component {

  constructor(props) {
    super(props);
    this.renderCompany = this.renderCompany.bind(this);
  }

  componentDidMount() {
     this.props.getCompanies();
  }

  renderCompany(company) {
    return (
        <CompanyItem
          key={company.id}
          company={company}
          upVoteCompany={this.props.upVoteCompany}
          downVoteCompany={this.props.downVoteCompany}
        />
    );
  }

  render() {
    return (
      <div>
        <div className="text-xs-right">
          <div>
            { this.props.company.map(this.renderCompany) }
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
  return bindActionCreators ({ getCompanies, createCompany, upVoteCompany, downVoteCompany }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Company);
