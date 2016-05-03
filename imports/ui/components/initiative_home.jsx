import React, { Component, PropTypes } from 'react';
import { Nav, NavItem } from 'react-bootstrap';

import InitSetup from '../containers/initiative/setup';
import InitDash from './initiative/dash.jsx';

export default class InitHome extends Component {
  constructor(props) {
    super(props);
    let key;
    if (this.props.tab) {
      if (this.props.tab === 'setup') {
        key = 1;
      } else {
        key = 2;
      }
    } else {
      key = 1;
    }
    this.state = {
      activeKey: key,
    };
    this.handleTabSelect = this.handleTabSelect.bind(this);
  }

  handleTabSelect(key) {
    this.setState({
      activeKey: key,
    });
  }

  renderContent() {
    const { currUser, initiative, canEdit, getMembers } = this.props;
    const propsToPass = { currUser, initiative, canEdit, getMembers };
    if (this.state.activeKey === 1) {
      return (<InitSetup {...propsToPass} />);
    } else if (this.state.activeKey === 2) {
      return (<InitDash {...propsToPass} />);
    }
    return '';
  }

  render() {
    return (
      <div className="container">
        <div className="text-center">
          <h2>{ this.props.initiative ? this.props.initiative.name : ''}</h2>
        </div>
        <br />
        <Nav bsStyle="tabs" activeKey={this.state.activeKey} onSelect={this.handleTabSelect}>
          <NavItem eventKey={1}><h4>Setup</h4></NavItem>
          <NavItem eventKey={2}><h4>Dashboard</h4></NavItem>
        </Nav>
        <br />
        { this.renderContent() }
      </div>
    );
  }
}

InitHome.propTypes = {
  currUser: PropTypes.object,
  initiative: PropTypes.object,
  canEdit: PropTypes.func.isRequired,
  getMembers: PropTypes.func.isRequired,
};
