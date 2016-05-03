import React, { Component, PropTypes } from 'react';
import { Well, Nav, NavItem } from 'react-bootstrap';

import InitiativeList from '../containers/initiative_list';
import PortfolioList from '../containers/portfolio_list';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: 1,
    };
    this.handleTabSelect = this.handleTabSelect.bind(this);
  }

  handleTabSelect(key) {
    this.setState({
      activeKey: key,
    });
  }

  renderContent() {
    if (this.state.activeKey === 1) {
      return this.renderInitiativesTab();
    } else if (this.state.activeKey === 2) {
      return this.renderPortfoliosTab();
    }
    return '';
  }

  renderInitiativesTab() {
    return (<InitiativeList currUser={this.props.currUser} />);
  }

  renderPortfoliosTab() {
    return (<PortfolioList currUser={this.props.currUser} />);
  }

  render() {
    const cUser = this.props.currUser;
    return (
      <div className="container">

        { cUser && this.props.isNewUser(cUser)
          ?
            <Well>
              <div className="text-center">
                <h2>Welcome to Opta!</h2>
                <p>
                  After reading this introduction, please take a moment to update <a href={`/user/${cUser.username}`}>your profile</a>.
                  Then you can click "Create" in the navigation bar up top to start a new personal OPTA initiative.
                  If the initiative involves organizational rather than just personal data, please ensure that the corresponding
                  organizations have been created -- you'll need to specify the data "owner" upon initiative creation so that
                  all data collected may be correctly attributed. This allows efficient reuse across other initiatives
                  for members of that organization. If you need to create an organization, you can the same 'Create' menu above,
                  or do so from <a href={`/user/${cUser.username}`}>your profile</a>.
                </p>
              </div>
            </Well>
          : ''
        }

        <Nav bsStyle="tabs" activeKey={this.state.activeKey} onSelect={this.handleTabSelect}>
          <NavItem eventKey={1}><h4>My Initiatives</h4></NavItem>
          <NavItem eventKey={2}><h4>My Portfolios (by Owner)</h4></NavItem>
        </Nav>
        <br />
        { this.renderContent() }
      </div>
    );
  }
}

Home.propTypes = {
  currUser: PropTypes.object,
  isNewUser: PropTypes.func.isRequired,
};
