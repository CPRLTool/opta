// import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { Row, Col, FormGroup, FormControl, ControlLabel, Button, OverlayTrigger, Popover } from 'react-bootstrap';
import TooltipExplanation from '../tooltip_explanation.jsx';


export default class TheoryOfAction extends Component {

  constructor(props) {
    super(props);
    this.state = {
      theoryOfAction: props.initiative ? (props.initiative.theoryOfAction || '') : '',
      editing: false,
      isSubmitting: false,
    };
    this.handleFieldEdit = this.handleFieldEdit.bind(this);
    this.toggleSave = this.toggleSave.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleFieldEdit(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    const id = event.target.id;
    this.setState({ [id]: event.target.value });
  }

  toggleSave(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    this.setState({ editing: !this.state.editing });
  }

  handleSave(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    this.props.updateTextFields({
      _id: this.props.initiative._id,
      fields: { theoryOfAction: this.state.theoryOfAction },
    });

    this.setState({ editing: false, isSubmitting: false });
  }

  renderEditButton() {
    const isSub = this.state.isSubmitting;
    return this.state.editing
      ? <Button
          type="submit"
          className="center-block"
          disabled={isSub}
          onClick={!isSub ? this.handleSave : null}
          bsStyle="success">
            {isSub ? 'Saving...' : 'Save'}
        </Button>
      : <Button
          className="center-block"
          onClick={this.toggleSave}
          bsStyle="primary">
            Edit
        </Button>;
  }

  render() {
    const opts = {};
    if (!this.state.editing) {
      opts.readOnly = 'readOnly';
    }

    const toaBody = (
      <p>A <strong>Theory of Action</strong> is...</p>
    );

    return (
      <div>
        <p>
          In the space below, please state a detailed
          <TooltipExplanation
            id="theoryOfAction_tooltip"
            href="#"
            title="What is a Theory of Action?"
            body={toaBody}
          ><strong> Theory of Action </strong></TooltipExplanation>
          for this Initiative.
        </p>
        <form>
          <FormGroup controlId="theoryOfAction">
            <FormControl
              componentClass="textarea"
              style={{ height: 80, resize: 'none' }}
              value={this.state.theoryOfAction}
              onChange={this.handleFieldEdit}
              {...opts}
            />
          </FormGroup>
          <FormGroup>
            { this.props.canEdit ? this.renderEditButton() : ''}
          </FormGroup>
        </form>
      </div>
    );
  }
}

TheoryOfAction.propTypes = {
  currUser: PropTypes.object,
  initiative: PropTypes.object,
  canEdit: PropTypes.func.isRequired,
  updateTextFields: PropTypes.func.isRequired,
};
