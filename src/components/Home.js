import React from 'react';
import Company from './company_list';
import { Link } from 'react-router';

// Home page component
export default class Home extends React.Component {
  render() {
    return (
      <div className='page-home'>
        <Company />
      </div>
    );
  }
}
