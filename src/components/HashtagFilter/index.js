import React, { Component } from "react";
import PropTypes from "prop-types";

// TODO On click of a Hashtag, filter component updates to only show unique list of hashtags associated with the new results *Good scenario for a jest test*

// Build up a list of buttons given an array of hashtags
function BuildHashtagList(HashtagList) {
  return HashtagList.map((Hashtag) => (
    <button className="hashtagButton" key={Hashtag}>
      {Hashtag}
    </button>
  ));
}

class HashtagFilter extends Component {
  componentDidMount() {}

  render() {
    const { hashTags, value, onChange, children } = this.props;

    let HashtagButtonElements = null;

    if (hashTags) {
      HashtagButtonElements = BuildHashtagList(hashTags);

      return (
        <div className="hashtagComponentCard">
          <h3 className="cardHeader">Filter by hashtag</h3>
          {HashtagButtonElements}
        </div>
      );
    } else {
      return null;
    }
  }
}

HashtagFilter.propTypes = {
  hashTags: PropTypes.array,
  value: PropTypes.string,
  onChange: PropTypes.func,
  children: PropTypes.node,
};

export default React.memo(HashtagFilter);
