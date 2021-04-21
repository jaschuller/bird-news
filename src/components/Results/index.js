import React, { Component } from "react";
import PropTypes from "prop-types";

// TODO Consider "Load more" component to lazy load the next 5 tweets into the results
// this will either be part of this Results component or its on separate component.

// TODO Render URL portion of the tweet as a link

// TODO Load more should update the Filter with unique hashtags from next set of results
// Consider how this interacts with those which have already been filtered out**

let alternatingBackground = "rowWhite";

// Build up the table of tweet results
function BuildTweetTable(foundTweets) {
  /*
  return HashtagList.map((Hashtag) => (
    <button className="hashtagButton" key={Hashtag}>
      {Hashtag}
    </button>
  ));
  */

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
      console.log(hashtag.text);
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
    <div className={alternatingBackground}>
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
    <button className="hashtagButtonDisabled" disabled="disabled">
      {hashtagButtonText}
    </button>
  );
}

class Results extends Component {
  componentDidMount() {}

  render() {
    const { foundTweets } = this.props;

    let TweetTableRows;

    // Build the table when results are found
    if (foundTweets && foundTweets.statuses) {
      TweetTableRows = BuildTweetTable(foundTweets);
    }

    return <div className="tweetResultsCard">{TweetTableRows}</div>;
  }
}

Results.propTypes = {
  foundTweets: PropTypes.object,
  children: PropTypes.node,
};

export default React.memo(Results);
