import React, { Component } from "react";
import PropTypes from "prop-types";

// TODO Render URL portion of the tweet as a link

let alternatingBackground = "rowWhite";

/**
 * Build up the table of tweet results. An alternating style is added to make each tweet
 * stand out in the UI
 *
 * @param foundTweets object containing the response data from twitter search api
 * @return dom elements displaying the relevant data foundTweets
 */
function BuildTweetTable(foundTweets, loadMoreFunction) {
  let profileImageURL;
  let username;
  let tweetText;
  let hashTags = [];
  let rowElements = [];

  foundTweets.statuses.forEach(async function (status) {
    profileImageURL = status.user.profile_image_url;
    username = "@" + status.user.name;
    tweetText = status.text;
    // tweetText = linkify(status.text);

    status.entities.hashtags.forEach(async function (hashtag) {
      hashTags.push(BuildTweetHashtag("#" + hashtag.text));
    });

    rowElements.push(
      BuildTweetRow(profileImageURL, username, tweetText, hashTags)
    );

    if (alternatingBackground == "rowWhite") {
      alternatingBackground = "rowGrey";
    } else {
      alternatingBackground = "rowWhite";
    }

    // Clear out hashtag array so it doesn't go into other results
    hashTags = [];
  });

  rowElements.push(BuildLoadMoreButton(loadMoreFunction));

  return rowElements;
}

/**
 * Parsed the passed in text to identify any links within and turn them into anchor dom elements
 *
 * @param text raw text to be parsed and massaged
 * @return text containing any identified urls transformed into anchor elements
 */
function linkify(text) {
  var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
  return text.replace(urlRegex, function (url) {
    return <a href="{url}">{url}</a>;
  });
}

/**
 * Builds up an individual row (as a div) to render a tweet
 *
 * @param profileImageURL url which points at the image icon from the user who posted the tweet
 * @param username username of the user who posted the tweet
 * @param tweetText text content of the tweet
 * @param hashTags array of (disabled) button elements for unique hashtags within the tweet
 * @return a div element containing the set of dom elements which represent the tweet
 */
function BuildTweetRow(profileImageURL, username, tweetText, hashTags) {
  return (
    <div key={tweetText} className={alternatingBackground}>
      <br />
      <img className="tweetUserImage" src={profileImageURL} alt="User icon" />
      <div className="tweetDetails">
        <span className="tweetUserName">{username}</span>
        <br />
        <span className="tweetText">{tweetText}</span>
        <br />
        {hashTags}
      </div>
    </div>
  );
}

/**
 * Builds up an individual (disabled) button div which represents a hashtag from the tweet content
 *
 * @param hashtagButtonText text to be displayed on the hashtag
 * @return a disabled button element styled to look like a hashtag
 */
function BuildTweetHashtag(hashtagButtonText) {
  return (
    <button
      key={hashtagButtonText}
      className="hashtagButtonDisabled"
      disabled="disabled"
    >
      {hashtagButtonText}
    </button>
  );
}

/**
 * Builds the button which will load additional results from the twitter api
 *
 * @param loadMoreFunction text to be displayed on the hashtag
 * @return a button bound to a function which will load additional tweet results on click
 */
function BuildLoadMoreButton(loadMoreFunction) {
  return (
    <button className="loadMore" onClick={loadMoreFunction}>
      Load more
    </button>
  );
}

class Results extends Component {
  componentDidMount() {}

  render() {
    const { foundTweets, loadMoreFunction } = this.props;

    let TweetTableRows;

    // reset row class so it doesn't switch on a render with no results
    alternatingBackground = "rowWhite";

    // Build the table when results are found
    if (foundTweets && foundTweets.statuses) {
      TweetTableRows = BuildTweetTable(foundTweets, loadMoreFunction);

      return <div className="tweetResultsCard">{TweetTableRows}</div>;
    } else {
      return null;
    }
  }
}

Results.propTypes = {
  loadMoreFunction: PropTypes.func,
  foundTweets: PropTypes.object,
  children: PropTypes.node,
};

export default React.memo(Results);
