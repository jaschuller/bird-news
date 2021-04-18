import React, { Component } from "react";
import PropTypes from "prop-types";

// Simple component which renders a button, might not be needed if I use simple inline button elements in HashtagFilter component
class HashtagButton extends Component {
  componentDidMount() {}

  render() {
    const { value, onClick } = this.props;

    return <button onClick={onClick}>{value}</button>;
  }
}

HashtagButton.propTypes = {
  buttonText: PropTypes.string,
  value: PropTypes.string,
  onClick: PropTypes.func,
};

export default HashtagButton;
