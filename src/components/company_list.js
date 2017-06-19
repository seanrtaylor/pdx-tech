import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCompanies } from '../actions/companies';
import { Link } from 'react-router';


class Company extends React.Component {

  componentWillMount() {
     this.props.getCompanies();
  }

  renderCompany() {
    return (
        <div>
          Here is a company
        </div>
    );
  }

  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link to="/company/new" className="btn btn-primary">
            Add New Company
          </Link>
          here is the company list
        </div>
      </div>
    );
  }
}

function mapStateToProps({ company }) {
  return { company };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators ({ getCompanies }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Company);
