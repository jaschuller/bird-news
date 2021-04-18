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

// Get only the first 5 tweets per designs
const PARAM_COUNT = "count=5";

let tweetResults = "none";

// App is a derived class since it extends component
class App extends Component {
  // calling super(props) from Component sets this.props so that we can access
  // properties using this.props (they would be undefined otherwise) in the constructor
  constructor(props) {
    // super.method calls the parent method. super(...) here calls the parent constructor
    super(props);

    this.state = {
      results: null,
      error: null,
    };
  }

  // Loop through the tweet results and build up a list of Results components
  setFoundTweets(result) {
    result.statuses.forEach(async function (status) {
      console.log(status.user.profile_image_url);
      console.log(status.user.name);
      console.log(status.text);
      status.entities.hashtags.forEach(async function (hashtag) {
        console.log(hashtag.text);
      });
    });
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

    // httpbin.org gives you the headers in the response
    // body `res.data`.
    // See: https://httpbin.org/#/HTTP_Methods/get_get
    axios
      .get(
        `${PATH_BASE}${PATH_SEARCH}?${PARAM_RESULT_TYPE}&${PARAM_SEARCH}${placeholderSearchTerm}&${PARAM_COUNT}`,
        {
          headers: {
            "X-Requested-With": "XMLHttpRequest",
          },
        }
      )
      .then((result) => this.setFoundTweets(result.data))
      .catch((error) => this.setState({ error }));
  }

  // componentDidMount is one of the lifecycle methods. It is called once, when the component is mounted (put into the DOM).
  // TODO fetch some twitter results to populate initial render when the element is first mounted
  componentDidMount() {
    console.log("mounting...");
    this.fetchSearchPopularTweets();
    console.log(tweetResults);
  }

  render() {
    // ES6 use destructuring to set values
    const { searchTerm, results, searchKey, error, isLoading } = this.state;

    // debugger;
    console.log(tweetResults);

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
