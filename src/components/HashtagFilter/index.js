import React, { Component } from "react";
import PropTypes from "prop-types";

// Build up a list of buttons given an array of hashtags
function BuildHashtagList(HashtagList, filterFunction) {
  return HashtagList.map((Hashtag) => (
    <button className="hashtagButton" key={Hashtag} onClick={filterFunction}>
      {Hashtag}
    </button>
  ));
}

class HashtagFilter extends Component {
  componentDidMount() {}

  render() {
    const { hashTags, filterFunction } = this.props;
    let HashtagButtonElements = null;

    if (hashTags) {
      // Remove duplicate hashtags
      let uniqueTags = [];
      hashTags.forEach((tag) => {
        if (!uniqueTags.includes(tag)) {
          uniqueTags.push(tag);
        }
      });

      HashtagButtonElements = BuildHashtagList(uniqueTags, filterFunction);

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
  filterFunction: PropTypes.func.isRequired,
};

export default React.memo(HashtagFilter);
