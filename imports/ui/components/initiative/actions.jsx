// import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { FormGroup, FormControl, Button, ButtonGroup } from 'react-bootstrap';
import TooltipExplanation from '../tooltip_explanation.jsx';


const stratBody = (
  <p>A <strong>Strategy</strong> is...</p>
);

const overBody = (
  <p>An <strong>Outcome</strong> is...</p>
);

export default class TheoryOfAction extends Component {

  constructor(props) {
    super(props);
    this.state = {
      strategy: props.initiative ? (props.initiative.strategy || '') : '',
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
        strategy: this.state.strategy,
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

    return (
      <div>
        <form>
          <div className="text-center">
            { this.props.canEdit ? this.renderEditButton() : ''}
          </div>
          <br />
          <div className="text-center">
            <h4>Strategy</h4>
          </div>
          <p>
            What is your main
            <TooltipExplanation
              id="strategy_tooltip"
              href="#"
              title="What is a Strategy?"
              body={stratBody}
            ><strong> Strategy </strong></TooltipExplanation>
            for achieving the
            <TooltipExplanation
              id="outcome_tooltip"
              href="#"
              title="What is an Outcome?"
              body={overBody}
            ><strong> Outcomes </strong></TooltipExplanation>
              you have specified?
          </p>
          <FormGroup controlId="strategy">
            <FormControl
              componentClass="textarea"
              style={{ height: 120, resize: 'none' }}
              value={this.state.strategy}
              onChange={this.handleFieldEdit}
              {...opts}
            />
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
