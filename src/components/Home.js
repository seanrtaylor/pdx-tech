import React from 'react';
import Company from './company_list';
import { Link } from 'react-router';

// Home page component
export default class Home extends React.Component {
  render() {
    return (
      <div className='page-home'>
        <h1>Portland Tech Companies</h1>
        <Link to="/company/new" className="btn btn-primary">
          Add New Company
        </Link>
        <Company />
      </div>
    );
  }
}
