import React from 'react';
import CompanyItem from './company_item';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCompanies, createCompany } from '../actions/companies';
import { Link } from 'react-router';
import { upVoteCompany, downVoteCompany } from '../actions/index';


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
          <Link to="/company/new" className="btn btn-primary">
            Add New Company
          </Link>

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
