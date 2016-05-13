// import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import TooltipExplanation from '../tooltip_explanation.jsx';
import OutcomeInput from './outcome_input.jsx';

const outBody = (
  <p>An <strong>Outcome</strong> is...</p>
);
const metBody = (
  <p>A <strong>Metric</strong> is...</p>
);

export default class Outcomes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      outcomes: props.initiative ? (props.initiative.outcomes || []) : [],
      editing: false,
      isSubmitting: false,
    };
    this.toggleSave = this.toggleSave.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.addOutcome = this.addOutcome.bind(this);
    this.updateOutcomeField = this.updateOutcomeField.bind(this);
    this.removeOutcome = this.removeOutcome.bind(this);
    this.renderOutcome = this.renderOutcome.bind(this);
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

    this.props.updateOutcomes({
      _id: this.props.initiative._id,
      outcomes: this.state.outcomes,
    });

    this.setState({ editing: false, isSubmitting: false });
  }

  addOutcome(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    this.setState({ outcomes: this.props.addOutcome(this.state.outcomes) });
  }

  updateOutcomeField(index, name, value) {
    const outcomes = this.state.outcomes;
    outcomes[index][name] = value;
    this.setState({ outcomes });
  }

  removeOutcome(id) {
    this.setState({ outcomes: this.props.removeOutcome(this.state.outcomes, id) });
  }

  renderEditButton() {
    const isSub = this.state.isSubmitting;
    return this.state.editing
      ? <ButtonGroup>
          <Button
            onClick={this.addOutcome}
            bsStyle="primary">
              Add Outcome &nbsp;<span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
          </Button>
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
          // className="center-block"
          onClick={this.toggleSave}
          bsStyle="primary">
            Edit &nbsp;<span className="glyphicon glyphicon-edit" aria-hidden="true"></span>
        </Button>;
  }

  renderOutcome(outcome, index) {
    return (
      <OutcomeInput
        key={outcome.id}
        index={index}
        // outcomes={this.state.outcomes}
        outcome={this.state.outcomes[index]}
        editing={this.state.editing}
        updateOutcomeField={this.updateOutcomeField}
        removeOutcome={this.removeOutcome}
      />
    );
  }

  render() {
    const opts = {};
    if (!this.state.editing) {
      opts.readOnly = 'readOnly';
    }

    return (
      <div>
        <div>
          <p>
            Please list at least three
            <TooltipExplanation
              id="outcome_tooltip"
              href="#"
              title="What is an Outcome?"
              body={outBody}
            ><strong> Outcomes </strong></TooltipExplanation>
            you expect to achieve over the course of this Initiative based on your Theory of Action.
          </p>
          <p>
            For each Outcome, please identify one or more
            <TooltipExplanation
              id="metric_tooltip"
              href="#"
              title="What is a Metric?"
              body={metBody}
            ><strong> Metrics </strong></TooltipExplanation>
            that you will use to track progress and determine whether the Outcome has been achieved.
          </p>
        </div>
        <br />
        <div className="text-center">
          { this.props.canEdit ? this.renderEditButton() : ''}
        </div>
        <br />
        <div>
          { this.state.outcomes.map(this.renderOutcome) }
        </div>
      </div>
    );
  }
}

Outcomes.propTypes = {
  currUser: PropTypes.object,
  initiative: PropTypes.object,
  canEdit: PropTypes.func.isRequired,
  addOutcome: PropTypes.func.isRequired,
  updateOutcomes: PropTypes.func.isRequired,
  removeOutcome: PropTypes.func.isRequired,
};
