import React, { Component, PropTypes } from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Row, Col } from 'react-bootstrap';
import EntityThumbnail from './entity_thumbnail.jsx';

import { debounce } from 'lodash';

export default class SearchOrg extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      searchResults: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.selectOrg = this.selectOrg.bind(this);
    this.renderOrgThumbnail = this.renderOrgThumbnail.bind(this);
    // this.getSearchString = this.getSearchString.bind(this);
    this.delayedSearch = debounce(
      () => {
        this.setState({ searchResults: this.props.search(this.state.searchString) });
      },
      500
    );
  }

  // // to be called from parent
  // getSearchString() {
  //   return this.state.searchString;
  // }

  handleChange(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    this.setState({
      searchString: event.target.value,
    });

    // set parent value so it can do something with it as needed
    if (this.props.setSearchString) {
      this.props.setSearchString(event.target.value);
    }

    this.delayedSearch();
  }

  // use fxn closure to get org obj
  selectOrg(org) {
    return (event) => {
      if (event && event.preventDefault) {
        event.preventDefault();
      }
      // send selected org to parent component via callback
      this.props.onSelectOrg(org);
    };
  }

  renderOrgThumbnail(org) {
    return (
      <EntityThumbnail
        key={org.name}
        imgLink="/images/org_logo_placeholder_thumbnail.png"
        name={org.name}
        onClick={this.selectOrg(org)}
        // onClick={`/organization/${org.name}`}
        // disabled={!org.selectable}
      />
    );
  }

  render() {
    // const errorProps = this.props.errorProp || {};
    const errorProps = this.props.hasError ? { validationState: 'error' } : {};
    return (
      <div>
        <Form horizontal>
          <FormGroup controlId="searchBox" {...errorProps} >
            <Col componentClass={ControlLabel} sm={2} smOffset={1}>
              Name
            </Col>
            <Col sm={6}>
              <FormControl
                type="text"
                value={this.state.searchString}
                placeholder="e.g. CPRL"
                onChange={this.handleChange}
              />
            </Col>
            { this.props.renderSubmit
              ? <Col sm={2}>
                  <FormGroup>
                    { this.props.renderSubmit() }
                  </FormGroup>
                </Col>
              : ''
            }
          </FormGroup>
        </Form>
        <span><br /></span>
        <Row>
          { this.state.searchString && this.state.searchResults
            ? this.state.searchResults.map(this.renderOrgThumbnail)
            : ''
          }
        </Row>
      </div>
    );
  }
}

SearchOrg.propTypes = {
  search: PropTypes.func.isRequired,
  onSelectOrg: PropTypes.func.isRequired,
  setSearchString: PropTypes.func,
  renderSubmit: PropTypes.func,
  hasError: PropTypes.bool,
};
