import React, { Component } from "react";
import PropTypes from "prop-types";

// TODO: Search needs to have a magnifying glass icon, and placeholder? text "Search for keyword"
// Acceptance criteria "c. Ability to view the results of the search on key up" assume this means key up of enter key? Check with PO/Designer

// TODO For key-up search, be aware of rate limiting and implement some sort of
// throttle/debounce to prevent it

// The Twitter API does not support CORS, so you will need to implement an
// intermediate proxy to make the cross-origin API calls from your app.

// User Twitter API v1 https://developer.twitter.com/en/docs/api-reference-index#twitter-api-v1
// For searching features use the standard search API  https://api.twitter.com/1.1/search/tweets.json
// Twitter authentication docs https://developer.twitter.com/en/docs/authentication/oauth-2-0
// Bearer token AAAAAAAAAAAAAAAAAAAAAI4OHgEAAAAAlbk0HSIAqcc3havrrU9j2NeAQ34%3DzJmzwHuQerd8JJ2TeuHfqwKgBt6bK4tk93w3ocBB2vPuKMF3cG

// ** Deliverable is a zip file containing packaged code project (no node_modules directory)
// ** and a doc describing how to build/run the frontend (start the server, proxy, run tests, etc)

// Handles taking the search terms and hitting twitter's api
class Search extends Component {
  // Now you can focus the input field when the component mounted by using the this object,
  // the appropriate lifecycle method, and the DOM API. The input should be focused when the application renders.
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
