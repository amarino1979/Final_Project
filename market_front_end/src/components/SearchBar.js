import React, { Component } from 'react'
import Select from 'react-select'


export default class SearchBar extends Component {
    state= {
        selectedOption: null,
    }

    handleChange = (selectedOption) => {
        console.log('hello')
        // this.setState({ selectedOption })
    }
    render() {
        return (
            <div>
                <select
                    value
                    onChange={this.handleChange}
                />
            </div>
        )
    }
}
