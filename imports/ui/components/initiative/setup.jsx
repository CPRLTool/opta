import React, { Component, PropTypes } from 'react';
import { Nav, NavItem } from 'react-bootstrap';

import TheoryOfAction from './theory';
// import OverviewAndStrategy from './overview';
import Outcomes from '../../containers/initiative/outcomes';
import Actions from './actions';
import Inputs from '../../containers/initiative/inputs';


export default class Setup extends Component {
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
      return (<TheoryOfAction {...propsToPass} />);
    // } else if (this.state.activeKey === 2) {
    //   return (<OverviewAndStrategy {...propsToPass} />);
    } else if (this.state.activeKey === 2) {
      return (<Outcomes {...propsToPass} />);
    } else if (this.state.activeKey === 3) {
      return (<Actions {...propsToPass} />);
      // return (<p className="text-center"> Under Construction... </p>);
    } else if (this.state.activeKey === 4) {
      return (<Inputs {...propsToPass} />);
    }
    return '';
  }

  render() {
    return (
      <div className="container">
        <Nav bsStyle="tabs" justified activeKey={this.state.activeKey} onSelect={this.handleTabSelect}>
          <NavItem eventKey={1}><h4>Theory of Action</h4></NavItem>
          {/** <NavItem eventKey={2}><h5>Overview & Strategy</h5></NavItem> **/}
          <NavItem eventKey={2}><h4>Outcomes</h4></NavItem>
          <NavItem eventKey={3}><h4>Strategy & Actions</h4></NavItem>
          <NavItem eventKey={4}><h4>Inputs</h4></NavItem>
        </Nav>
        <br />
        { this.renderContent() }
      </div>
    );
  }
}

Setup.propTypes = {
  currUser: PropTypes.object,
  initiative: PropTypes.object,
  canEdit: PropTypes.func.isRequired,
  getMembers: PropTypes.func.isRequired,
  updateTextFields: PropTypes.func,
};
