// import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { Row, Col, FormGroup, FormControl, ControlLabel, Button, ButtonGroup } from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';


const amountFormatter = (cell) => `<span className="glyphicon glyphicon-usd"></span> ${cell}`;

export default class Inputs extends Component {

  constructor(props) {
    super(props);
    this.state = {
      funding: props.initiative ? (props.initiative.inputs.funding || []) : [],
      internal: props.initiative ? (props.initiative.inputs.other.internal || '') : '',
      external: props.initiative ? (props.initiative.inputs.other.external || '') : '',
      editing: false,
      isSubmitting: false,
    };
    this.handleFieldEdit = this.handleFieldEdit.bind(this);
    this.toggleSave = this.toggleSave.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.onAfterSaveCell = this.onAfterSaveCell.bind(this);
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

    this.props.updateInputs({
      _id: this.props.initiative._id,
      funding: this.state.funding,
      internal: this.state.internal,
      external: this.state.external,
    });

    this.setState({ editing: false, isSubmitting: false });
  }

  onAfterSaveCell(row, cellName, cellValue) {
    // console.log(`row: ${JSON.stringify(row)}, col: ${cellName}, val: ${cellValue}`);
    const funding = this.state.funding;
    const index = funding.findIndex((f) => f.contributor === row.contributor);
    funding[index][cellName] = cellValue;
    if (cellName === 'request') {
      funding[index].request = Number(funding[index].request);
    }
    this.setState({ funding });
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
        <div className="text-center">
          { this.props.canEdit ? this.renderEditButton() : ''}
        </div>
        <br />
        <div className="text-center">
          <h3>Funding</h3>
        </div>
        <br />
        <p>
          How much funding will you dedicate to this Initiative?
           Please itemize by contributor and note the status of each contribution.
        </p>
        <br />
        <BootstrapTable
          data={this.state.funding}
          striped={true}
          // condensed={true}
          cellEdit={{
            mode: 'click',
            blurToSave: true,
            afterSaveCell: this.onAfterSaveCell,
          }}
          insertRow={this.state.editing}
          deleteRow={this.state.editing}
          selectRow={{
            mode: 'checkbox',
            // clickToSelect: true,
            // clickToSelectAndEditCell: true,
          }}
          options={{
            afterInsertRow: (fund) => {
              // console.log(fund);
              const f = fund;
              f.request = Number(f.request);
              const funding = this.state.funding;
              funding.push(f);
              this.setState({ funding });
              // console.log(this.state.funding);
            },
          }}
        >
          <TableHeaderColumn
            dataField="contributor"
            dataAlign="center"
            isKey={true}
            // editable={true}
          >
            Contributor
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="request"
            dataAlign="center"
            dataFormat={amountFormatter}
            editable={ this.state.editing
              ? {
                validator: (cellValue) => !isNaN(Number(cellValue)),
              }
              : false
            }
          >
            Amount
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="status"
            dataAlign="center"
            editable={ this.state.editing
              ? {
                type: 'select',
                // validator: //fxn taking only one "cell value" as argument. should return Bool.
                options: {
                  values: ['In Progress', 'Received'],
                },
              }
              : false
            }
          >
            Status
          </TableHeaderColumn>
        </BootstrapTable>
        <br />
        <br />
        <div className="text-center">
          <h3>Other Inputs</h3>
        </div>
        <br />
        <p>
          Please list all the Inputs (i.e., resources such as staffing) necessary for you to provide --
           or the resources or pre-conditions that your partners have agreed to provide -- in order for this Initiative
           to be successful.
        </p>
        <br />
        <form>
          <Row>
            <Col sm={6}>
              <FormGroup controlId="internal">
                <div className="text-center">
                  <ControlLabel>Internal</ControlLabel>
                </div>
                <FormControl
                  componentClass="textarea"
                  style={{ height: 120, resize: 'none' }}
                  value={this.state.internal}
                  onChange={this.handleFieldEdit}
                  {...opts}
                />
              </FormGroup>
            </Col>
            <Col sm={6}>
              <FormGroup controlId="external">
                <div className="text-center">
                  <ControlLabel>External</ControlLabel>
                </div>
                <FormControl
                  componentClass="textarea"
                  style={{ height: 120, resize: 'none' }}
                  value={this.state.external}
                  onChange={this.handleFieldEdit}
                  {...opts}
                />
              </FormGroup>
            </Col>
          </Row>
        </form>
      </div>
    );
  }
}

Inputs.propTypes = {

};
