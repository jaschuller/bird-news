import React, { Component } from "react";
import axios from "axios";
import Search from "./components/Search";
import Results from "./components/Results";
import HashtagFilter from "./components/HashtagFilter";
import { forEach } from "lodash";

// Use cors-anywhere project deployed to heroku as a proxy server, in order to get around cross origin errors
const PROXY_SERVER = "https://schuller-proxy.herokuapp.com/";

// https://developer.twitter.com/en/docs/twitter-api/v1/tweets/search/api-reference/get-search-tweets
const token =
  "AAAAAAAAAAAAAAAAAAAAAI4OHgEAAAAAlbk0HSIAqcc3havrrU9j2NeAQ34%3DzJmzwHuQerd8JJ2TeuHfqwKgBt6bK4tk93w3ocBB2vPuKMF3cG";
axios.defaults.headers.common = { Authorization: `bearer ${token}` };
const TWITTER_API = "https://api.twitter.com/1.1";
const PATH_BASE = `${PROXY_SERVER}${TWITTER_API}`;
const PATH_SEARCH = "/search/tweets.json";
const PARAM_RESULT_TYPE = "result_type=popular";
const PARAM_SEARCH = "q=";
const PARAM_FETCH_COUNT = "count=";

// Specify the initial tweet count to fetch
const INITIAL_FETCH_COUNT = 5;
// Specify the number of extra results to grab on "Load more" click
const LOAD_MORE_COUNT = 5;

// App is a derived class since it extends component
class App extends Component {
  // calling super(props) from Component sets this.props so that we can access
  // properties using this.props (they would be undefined otherwise) in the constructor
  constructor(props) {
    // super.method calls the parent method. super(...) here calls the parent constructor
    super(props);

    this.state = {
      searchTerm: "",
      hashTags: null,
      foundTweets: null,
      error: null,
      maxResults: INITIAL_FETCH_COUNT,
    };

    // bind the methods is bound to the class
    this.fetchSearchPopularTweets = this.fetchSearchPopularTweets.bind(this);
    this.setFoundTweets = this.setFoundTweets.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.filterByHashtag = this.filterByHashtag.bind(this);
  }

  // Loop through the tweet results and build up a list of Results components
  setFoundTweets(result) {
    this.setState({ foundTweets: result });

    // Loop through the results and build up the list of *Unique* hashtags
    let foundTags = [];
    result.statuses.forEach(async function (status) {
      status.entities.hashtags.forEach(async function (hashtag) {
        foundTags.push(hashtag.text);
      });
    });

    this.setState({ hashTags: foundTags });
  }

  // Use Axios for Fetch call to Twitter API
  fetchSearchPopularTweets(searchTerm, newCount) {
    this.setState({ isLoading: true });
    let maxResults = INITIAL_FETCH_COUNT;

    if (newCount) {
      maxResults = newCount;
    }

    axios
      .get(
        `${PATH_BASE}${PATH_SEARCH}?${PARAM_RESULT_TYPE}&${PARAM_SEARCH}${searchTerm}&${PARAM_FETCH_COUNT}${maxResults}`,
        {
          headers: {
            "X-Requested-With": "XMLHttpRequest",
          },
        }
      )
      .then((result) => this.setFoundTweets(result.data))
      .catch((error) => this.setState({ error }));
  }

  // After Application has mounted, do an initial fetch to make it interesting for the user
  componentDidMount() {
    console.log("mounting...");

    // this.fetchSearchPopularTweets("Dogs");
  }

  // fetch the tweets when search is submitted
  onSearchSubmit(event) {
    this.setState({ maxResults: INITIAL_FETCH_COUNT });
    const { searchTerm } = this.state;

    this.fetchSearchPopularTweets(searchTerm);

    // prevent default (browser reload) behavior
    event.preventDefault();
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
    // console.log(event.target.value);
  }

  loadMore(event) {
    const { maxResults, searchTerm } = this.state;
    let newCount = maxResults + LOAD_MORE_COUNT;
    // When user clicks load more, grab 5 more results in next search
    // Hacky solution, TODO implement a clear way
    this.setState({ maxResults: newCount });
    this.fetchSearchPopularTweets(searchTerm, newCount);
  }

  filterByHashtag(event) {
    console.log("clicked");

    let clickedHashTagTextContent = event.target.textContent;
    // Given the text of the element which received the click, update the
    // state of hashTags and foundTweets

    const { hashTags, foundTweets } = this.state;

    // Loop through the results and build up the list of *Unique* hashtags
    let filteredTweets = { name: "filtered", statuses: [] };
    let filteredHashtags = [];

    foundTweets.statuses.forEach(async function (status) {
      // Check if tweet contains the hashtag
      status.entities.hashtags.forEach(async function (hashtag) {
        if (hashtag.text == clickedHashTagTextContent) {
          filteredTweets.statuses.push(status);
        }
      });
    });

    let newTags = [];
    filteredTweets.statuses.forEach(async function (status) {
      status.entities.hashtags.forEach(async function (hashtag) {
        newTags.push(hashtag.text);
      });
    });

    debugger;

    // this.setState({ hashTags: foundTweets });
    this.setState({ foundTweets: filteredTweets, hashTags: newTags });
    // this.setState({ foundTweets: filteredTweets });
    // this.setFoundTweets(filteredTweets);
    // this.fetchSearchPopularTweets(searchTerm, newCount);
  }

  render() {
    // ES6 use destructuring to set values
    const { searchTerm, foundTweets, hashTags, error } = this.state;

    return (
      <div className="page">
        <header>
          <h3>Tweet Feed</h3>
        </header>
        {error ? (
          <div className="statusMessage">Something went wrong</div>
        ) : (
          <div>
            <div className="searchComponent">
              <Search
                value={searchTerm}
                onChange={this.onSearchChange}
                onSubmit={this.onSearchSubmit}
              />
            </div>

            <div className="inlineResponsiveComponents">
              <Results
                foundTweets={foundTweets}
                loadMoreFunction={this.loadMore}
              ></Results>
              <div className="spacer" />
              <HashtagFilter
                hashTags={hashTags}
                filterFunction={this.filterByHashtag}
              ></HashtagFilter>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
