import React, { Component } from 'react'

console.log(process.env)

export default class App extends Component {
  constructor (props) {
    super(props) 
    this.state = {
      baseURL: 'https://www.alphavantage.co/query?',
      function: 'function=GLOBAL_QUOTE&',
      symbol: '',
      apikey: '',
      searchURL: ''
    }
  }
  // https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo


  handleChange = (event) => {
    console.log(event.target)
    this.setState({ [event.target.id]: 'symbol=' + event.target.value })
    console.log(this.state)
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const searchURL = this.state.baseURL + this.state.function + this.state.symbol + this.state.apikey
    console.log(searchURL)
    fetch(searchURL)
      .then(response => response.json())
      .then(data => console.log(data))
  }

  componentDidMount = async() => {
    const apiUrl = 'http://localhost:5000/markets/market';
    await fetch(apiUrl)
      .then((response) => response.text())
      .then(async (data) => {
        await this.setState({apikey: '&apikey=' + data})
      }) 
      console.log('This is your data', this.state);
  }



  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='symbol'>Ticker</label>
          <input 
          id="symbol"
          type="text"
          value={this.state.stockTicker}
          onChange={this.handleChange}
          />
          <input
            type="submit"
            value="search"
            />
        </form>
      </div>
    )
  }
}
