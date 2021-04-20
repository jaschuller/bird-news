import React, { Component } from "react";
import PropTypes from "prop-types";

// TODO Results display the following (up to 5 items on initial return):
// Username
// Avatar of the author
// Url of the tweet

// TODO Consider "Load more" component to lazy load the next 5 tweets into the results
// this will either be part of this Results component or its on separate component.

// Consider Search as part of this component, since it is the same dimensions it might be
// simpler to build it in this component as a first pass

// TODO Load more should update the Filter with unique hashtags from next set of results
// Consider how this interacts with those which have already been filtered out**

class Results extends Component {
  componentDidMount() {}

  render() {
    console.log("inside tweets");
    const { foundTweets, children } = this.props;

    if (foundTweets) {
      debugger;
    }

    if (foundTweets && foundTweets.statuses) {
      foundTweets.statuses.forEach(async function (status) {
        console.log(status.user.profile_image_url);
        console.log(status.user.name);
        console.log(status.text);
        status.entities.hashtags.forEach(async function (hashtag) {
          console.log(hashtag.text);
        });
      });
    }

    return <div>hello</div>;
  }
}

Results.propTypes = {
  foundTweets: PropTypes.arrayOf(
    PropTypes.shape({
      objectID: PropTypes.string.isRequired,
      author: PropTypes.string,
      url: PropTypes.string,
      num_comments: PropTypes.number,
      points: PropTypes.number,
    })
  ).isRequired,
  children: PropTypes.node,
};

export default Results;
