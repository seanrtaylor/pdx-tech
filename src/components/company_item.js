import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Col } from 'react-bootstrap';


export default class CompanyItem extends React.Component {
  constructor(props) {
        super(props);
        this.upVoteCompany = this.upVoteCompany.bind(this);
        this.downVoteCompany = this.downVoteCompany.bind(this);
    }

  upVoteCompany(event) {
        console.log(event);
        this.props.upVoteCompany(this.props.company);
    }

    downVoteCompany(event) {
          console.log(event);
          this.props.downVoteCompany(this.props.company);
      }

  render() {
    return (
          <Col xs={6} md={4}>
            <div className="company-card">
              <div className="company-name">
                <h4>{this.props.company.name}</h4>
              </div>
                <div className="company-card-footer">
                  <div className="company-url">
                    <i className="fa fa-globe" aria-hidden="true"></i>
                    <a href={this.props.company.url}> Website </a>
                  </div>
                  <div className="company-score">
                    <div className="thumbs">
                      <div className="icon-one">
                        <i className="fa fa-thumbs-o-up" onClick={this.upVoteCompany} aria-hidden="true"></i>
                      </div>
                      <div className="icon-two">
                        <i className="fa fa-thumbs-o-down" onClick={this.downVoteCompany} aria-hidden="true"></i>
                      </div>
                    </div>
                    Score: {this.props.company.score}
                  </div>
                </div>
              </div>
          </Col>
    );
  }
}
