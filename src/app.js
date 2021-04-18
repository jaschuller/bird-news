import React, { Component } from "react";
import axios from "axios";
import Search from "./components/Search";
import Results from "./components/Results";
import HashtagFilter from "./components/HashtagFilter";

const DEFAULT_QUERY = "redux";
const DEFAULT_HPP = "20"; // number of results returned per page of pagination

//const PATH_BASE = "https://hn.algolia.com/api/v1";
// change path base to an incorrect url like below to test error handling
// const PATH_BASE = 'https://hn.algolia.com/api/v1xxxx';
// const PATH_SEARCH = "/search";
// const PARAM_SEARCH = "query=";
// const PARAM_PAGE = "page=";
// const PARAM_HPP = "hitsPerPage=";

// https://developer.twitter.com/en/docs/twitter-api/v1/tweets/search/api-reference/get-search-tweets
// axios.defaults.baseURL = "https://api.twitter.com/1.1/search/tweets.json?";
axios.defaults.headers.common["Authorization"] =
  "AAAAAAAAAAAAAAAAAAAAAI4OHgEAAAAAlbk0HSIAqcc3havrrU9j2NeAQ34%3DzJmzwHuQerd8JJ2TeuHfqwKgBt6bK4tk93w3ocBB2vPuKMF3cG";
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const PATH_BASE = "https://api.twitter.com/1.1";
const PATH_SEARCH = "/search/tweets.json";
const PARAM_RESULT_TYPE = "result_type=popular";
const PARAM_SEARCH = "q=";
const PARAM_COUNT = 5;

// App is a derived class since it extends component
class App extends Component {
  // calling super(props) from Component sets this.props so that we can access
  // properties using this.props (they would be undefined otherwise) in the constructor
  constructor(props) {
    // super.method calls the parent method. super(...) here calls the parent constructor
    super(props);

    this.state = {};
  }

  // Axios instead of Fetch: Substitute the native Fetch API with Axios
  // **run npm install axios if not found
  // You dont have to transform the returned response into JSON anymore, since axious wraps the result into a data object in JavaScript
  // axious() uses a HTTP GET by default. You can make the call explicit with axious.get(), or use another HTTP method such as HTTP POST
  // with axio().post.
  fetchSearchPopularTweets(searchTerm, page = 0) {
    this.setState({ isLoading: true });

    // TODO replace with a real search term once it is coming in from the Search component
    const placeholderSearchTerm = "science";

    axios(
      `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${placeholderSearchTerm}&${PARAM_RESULT_TYPE}`
    )
      .then((result) => console.log(result.data))
      .catch((error) => this.setState({ error }));
  }

  // componentDidMount is one of the lifecycle methods. It is called once, when the component is mounted (put into the DOM).
  // TODO fetch some twitter results to populate initial render when the element is first mounted
  componentDidMount() {
    console.log("mounting...");

    // Test out the axios call
    // this.fetchSearchPopularTweets();
  }

  render() {
    // ES6 use destructuring to set values
    const { searchTerm, results, searchKey, error, isLoading } = this.state;

    return (
      <div className="page">
        <header>
          <h1>Bird News </h1>
          <h4>Built by Justin Schuller</h4>
        </header>
        {error ? (
          <div className="statusMessage">Something went wrong</div>
        ) : (
          <HashtagFilter />
        )}
      </div>
    );
  }
}

export default App;
