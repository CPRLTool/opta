// import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { FormGroup, FormControl, Button, ButtonGroup } from 'react-bootstrap';
import TooltipExplanation from '../tooltip_explanation.jsx';


export default class TheoryOfAction extends Component {

  constructor(props) {
    super(props);
    this.state = {
      theoryOfAction: props.initiative ? (props.initiative.theoryOfAction || '') : '',
      overview: props.initiative ? (props.initiative.overview || '') : '',
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
      fields: {
        theoryOfAction: this.state.theoryOfAction,
        overview: this.state.overview,
      },
    });

    this.setState({ editing: false, isSubmitting: false });
  }

  renderEditButton() {
    const isSub = this.state.isSubmitting;
    return this.state.editing
      ? <ButtonGroup>
          <Button
            // type="submit"
            disabled={isSub}
            onClick={!isSub ? this.handleSave : null}
            bsStyle="success">
              {isSub
                ? 'Saving...'
                : <div>Save &nbsp;<span className="glyphicon glyphicon-save" aria-hidden="true"></span>
                  </div>
              }
          </Button>
          <Button
            disabled={isSub}
            onClick={!isSub ? () => this.setState({ editing: false }) : null}
            bsStyle="warning">
              Cancel
          </Button>
        </ButtonGroup>
      : <Button
          onClick={this.toggleSave}
          bsStyle="primary">
            Edit &nbsp;<span className="glyphicon glyphicon-edit" aria-hidden="true"></span>
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
        <form>
          <div className="text-center">
            { this.props.canEdit ? this.renderEditButton() : ''}
          </div>
          <br />
          <div className="text-center">
            <h4>Theory of Action</h4>
          </div>
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
          <FormGroup controlId="theoryOfAction">
            <FormControl
              componentClass="textarea"
              style={{ height: 80, resize: 'none' }}
              value={this.state.theoryOfAction}
              onChange={this.handleFieldEdit}
              {...opts}
            />
          </FormGroup>
          <br />
          <br />
          <div className="text-center">
            <h4>Overview</h4>
          </div>
          <p>
            Please provide any relevant background data and information.
          </p>
          <FormGroup controlId="overview">
            <FormControl
              componentClass="textarea"
              style={{ height: 120, resize: 'none' }}
              value={this.state.overview}
              onChange={this.handleFieldEdit}
              {...opts}
            />
          </FormGroup>
          <div className="text-center">
            <h5>Attached Documents</h5>
          </div>
          <br />
          <div className="text-center">
            <Button
              className="center-block"
              // onClick={this.toggleSave}
              bsStyle="default">
                Upload Documents...
            </Button>
          </div>
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
