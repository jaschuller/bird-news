import React, { Component } from "react";
import PropTypes from "prop-types";

// TODO: Search needs to have a magnifying glass icon
// Acceptance criteria "c. Ability to view the results of the search on key up" assume this means key up of enter key? Check with PO/Designer

// TODO For key-up search, be aware of rate limiting and implement some sort of
// throttle/debounce to prevent it

// Handles taking the search terms and hitting twitter's api
class Search extends Component {
  // Focus into the search input once the component is mounted
  componentDidMount() {
    if (this.input) {
      this.input.focus();
    }
  }

  render() {
    const { value, onChange, onSubmit } = this.props;
    return (
      <form onSubmit={onSubmit}>
        <input
          className="twitterSearch"
          placeholder="Search by keyword"
          type="text"
          value={value}
          onChange={onChange}
          ref={(el) => (this.input = el)}
        />
      </form>
    );
  }
}

Search.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Search;
