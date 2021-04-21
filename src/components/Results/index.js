import React, { Component } from "react";
import PropTypes from "prop-types";

// TODO Render URL portion of the tweet as a link

let alternatingBackground = "rowWhite";

// Build up the table of tweet results
function BuildTweetTable(foundTweets) {
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

  return rowElements;
}

function linkify(text) {
  var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
  return text.replace(urlRegex, function (url) {
    return <a href="{url}">{url}</a>;
  });
}

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

class Results extends Component {
  componentDidMount() {}

  render() {
    const { foundTweets, loadMoreFunction } = this.props;

    let TweetTableRows;

    // reset row class so it doesn't switch on a render with no results
    alternatingBackground = "rowWhite";

    // Build the table when results are found
    if (foundTweets && foundTweets.statuses) {
      TweetTableRows = BuildTweetTable(foundTweets);

      return (
        <React.Fragment>
          <div className="tweetResultsCard">{TweetTableRows}</div>
          <button onClick={loadMoreFunction}>Load more</button>
        </React.Fragment>
      );
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
