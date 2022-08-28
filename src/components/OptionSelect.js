import React, { Component } from 'react';
import PropTypes from 'prop-types';

class OptionSelect extends Component {
  render() {
    const { optionValue, optionId } = this.props;
    return (
      <option
        value={ optionValue }
        data-testid={ optionId }
      >
        {optionValue}
      </option>
    );
  }
}

OptionSelect.propTypes = {
  optionValue: PropTypes.string.isRequired,
  optionId: PropTypes.string.isRequired,
};

export default OptionSelect;
