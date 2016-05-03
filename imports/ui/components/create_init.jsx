import React, { Component, PropTypes } from 'react';
import { Form, Col, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';


export default class CreateInit extends Component {

  constructor(props) {
    super(props);
    let owner = {};
    if (props.forPortfolio && props.portfolios) {
      const p = props.portfolios.find((port) => port._id === props.forPortfolio);
      owner = p ? p.owner : {};
    }
    this.state = {
      name: '',
      ownerOptions: props.currUser ? props.getOwnerOptions(props.currUser) : [],
      owner,
      portfolio: props.forPortfolio || 'blank',
    };
    this.handleFieldEdit = this.handleFieldEdit.bind(this);
    // this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFieldEdit(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    const id = event.target.id;
    let value = event.target.value;
    if (id === 'owner') {
      value = JSON.parse(value);
    }
    this.setState({ [id]: value });
  }

  handleSubmit(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    this.props.create({
      dataOwner: this.state.owner,
      name: this.state.name,
      portId: this.state.portfolio !== 'blank' ? this.state.portfolio : null,
    });
  }

  render() {
    return (
      <div className="container">
        <div className="text-center">
          <span>
            <h3>Create an Initiative</h3>
            <br />
            <p>
              Choose a name, then select either an organization or yourself as the data owner.
              The data owner should be the user or organization providing the source of the data
              against which OPTA tracks.
            </p>
            <br />
          </span>
        </div>
        <Form horizontal>
          <FormGroup controlId="name">
            <Col componentClass={ControlLabel} sm={2} smOffset={1}>
              Name
            </Col>
            <Col sm={6}>
              <FormControl
                type="text"
                value={this.state.name}
                placeholder="e.g. Alexander Hamilton HS Spring 2016"
                onChange={this.handleFieldEdit}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="owner">
            <Col componentClass={ControlLabel} sm={2} smOffset={1}>
              Choose Data Owner
            </Col>
            <Col sm={6}>
              <FormControl
                componentClass="select"
                value={JSON.stringify(this.state.owner)}
                onChange={this.handleFieldEdit}
                // onChange={this.handleSelect}
              >
                <option key="blankOption" value="blank"> -- select an option -- </option>
                { this.state.ownerOptions.map(
                    o => <option key={o.value.id} value={JSON.stringify(o.value)}>{ o.name }</option>
                  )
                }
              </FormControl>
            </Col>
          </FormGroup>
          <FormGroup controlId="portfolio">
            <Col componentClass={ControlLabel} sm={2} smOffset={1}>
              Add to Portfolio
            </Col>
            <Col sm={6}>
              <FormControl
                componentClass="select"
                value={this.state.portfolio}
                onChange={this.handleFieldEdit}>

                <option key="blankOption" value="blank">No Portfolio</option>
                { this.state.owner
                  ? this.props.filterPortfoliosFor(
                      this.props.portfolios,
                      this.state.owner.id
                    ).map(p =>
                      <option
                        key={ p.id }
                        value={ p.id }>
                        { p.name }
                      </option>)
                  : ''
                }
              </FormControl>
            </Col>
          </FormGroup>
          <FormGroup controlId="submit">
            <Button
              type="submit"
              className="center-block"
              onClick={this.handleSubmit}
              bsStyle="success"
              disabled={!this.state.name || this.state.owner === 'blank'}
            >
                Create
            </Button>
          </FormGroup>
        </Form>
      </div>
    );
  }

}

CreateInit.propTypes = {
  create: PropTypes.func.isRequired,
  currUser: PropTypes.object,
  getOwnerOptions: PropTypes.func.isRequired,
  forPortfolio: PropTypes.string,
  portfolios: PropTypes.arrayOf(PropTypes.object),
  filterPortfoliosFor: PropTypes.func.isRequired,
};
