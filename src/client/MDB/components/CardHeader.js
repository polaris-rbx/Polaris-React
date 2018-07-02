import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class CardHeader extends Component {

  render() {

    const {
      className,
      tag: Tag,
      ...attributes
    } = this.props;

    const classes = classNames(
      'card-header',
      className
    );

    return (
      <Tag {...attributes} className={classes} />
    );
  }
}

CardHeader.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  className: PropTypes.string
};

CardHeader.defaultProps = {
  tag: 'h4'
};

export default CardHeader;
