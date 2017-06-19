import React from 'react';
import Company from './company_list';

// Home page component
export default class Home extends React.Component {
  render() {
    return (
      <div className='page-home'>
        <h4>Hello world!</h4>
        <Company />
      </div>
    );
  }
}
