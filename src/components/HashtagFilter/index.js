import React, { Component } from "react";
import HashtagButton from "../HashtagButton";
import PropTypes from "prop-types";

// TODO From the search results, build a list of all the hashtags associated with
// them and display in a free-flowing layout each tag as a button with corners rounded.
// Designs appear to use a light blue background color with a dark blue test color
// On click of a Hashtag, filter component updates to only show unique list of hashtags associated with the new results *Good scenario for a jest test*

// Sample list, this needs to get replaced with the results from Twitter API call
const sampleTags = [
  "#coding",
  "#Python",
  "#ComputerScience",
  "#gitmergememes",
  "#Engineering",
];

// Build up a list of buttons given an array of hashtags
function BuildHashtagList(HashtagList) {
  return HashtagList.map((Hashtag) => (
    <button className="hashtagButton" key={Hashtag}>
      {Hashtag}
    </button>
  ));
}

const HashtagButtonElements = BuildHashtagList(sampleTags);

class HashtagFilter extends Component {
  componentDidMount() {}

  render() {
    const { value, onChange, children } = this.props;

    return (
      <div className="hashtagComponentCard">
        <h3 className="cardHeader">Filter by hashtag</h3>
        {HashtagButtonElements}
      </div>
    );
  }
}

HashtagFilter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  children: PropTypes.node,
};

export default HashtagFilter;
