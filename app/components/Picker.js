import React, { Component, PropTypes } from 'react'

export default class Picker extends Component {
    render() {
        const { value, onChange, options } = this.props;

        return (
            <span className="mt-5">
                <h4 className="ml-5">Please choose the city</h4>
                {/* <h1 className="ml-5">{value}</h1> */}
                <select className="ml-5" onChange={e => onChange(e.target.value)}
                        value={value}>
                  {options.map(option =>
                      <option value={option} key={option}>
                          {option}
                      </option>)
                  }
                </select>
            </span>
        )
    }
}

Picker.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.string.isRequired
    ).isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};