import React, { Component } from 'react'

export default class StockInfo extends Component {
    render() {
        console.log(this.props)
        return (
            <div>
                <h2>Symbol: {this.props.stock[0].name}</h2>
            </div>
        )
    }
}
