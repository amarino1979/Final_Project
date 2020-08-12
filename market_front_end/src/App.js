import React, { Component } from 'react'

console.log(process.env.REACT_APP_MARKET_FRONT_END_API_KEY)

export default class App extends Component {
  constructor (props) {
    super(props) 
    this.state = {
      baseURL: 'http://www.alphavantage.co/query?',
      function: 'function=GLOBAL_QUOTE',
      symbol: '&symbol=' + '',
      apikey: '&apikey=' + '',
      searchURL: ''
    }
  }
  //fetch from the back end

  render() {
    return (
      <div>
        <h1>hello</h1>
        
      </div>
    )
  }
}
