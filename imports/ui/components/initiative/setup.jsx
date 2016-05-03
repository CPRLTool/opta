import React, { Component, PropTypes } from 'react';
import { Nav, NavItem } from 'react-bootstrap';

import Settings from '../../containers/initiative/settings';
import TheoryOfAction from './theory';
import OverviewAndStrategy from './overview';

export default class InitSetup extends Component {
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
    const { currUser, initiative, canEdit, getMembers, updateTextFields } = this.props;
    const propsToPass = { currUser, initiative, canEdit, getMembers, updateTextFields };

    if (this.state.activeKey === 1) {
      return (<Settings {...propsToPass} />);
    } else if (this.state.activeKey === 2) {
      return (<TheoryOfAction {...propsToPass} />);
    } else if (this.state.activeKey === 3) {
      return (<OverviewAndStrategy {...propsToPass} />);
    } else if (this.state.activeKey === 4) {
      return (<p className="text-center"> Under Construction... </p>);
    } else if (this.state.activeKey === 5) {
      return (<p className="text-center"> Under Construction... </p>);
    } else if (this.state.activeKey === 6) {
      return (<p className="text-center"> Under Construction... </p>);
    }
    return '';
  }

  render() {
    return (
      <div className="container">
        <Nav bsStyle="tabs" justified activeKey={this.state.activeKey} onSelect={this.handleTabSelect}>
          <NavItem eventKey={1}><h5>Settings</h5></NavItem>
          <NavItem eventKey={2}><h5>Theory of Action</h5></NavItem>
          <NavItem eventKey={3}><h5>Overview & Strategy</h5></NavItem>
          <NavItem eventKey={4}><h5>Outcomes</h5></NavItem>
          <NavItem eventKey={5}><h5>Actions</h5></NavItem>
          <NavItem eventKey={6}><h5>Inputs</h5></NavItem>
        </Nav>
        <br />
        { this.renderContent() }
      </div>
    );
  }
}

InitSetup.propTypes = {
  currUser: PropTypes.object,
  initiative: PropTypes.object,
  canEdit: PropTypes.func.isRequired,
  getMembers: PropTypes.func.isRequired,
  updateTextFields: PropTypes.func,
};
