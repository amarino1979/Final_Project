import React, { Component } from 'react'
// import './style.css'
import './App.css'
import SearchBar from './components/SearchBar'
import StockInfo from './components/StockInfo'

export default class App extends Component {
  constructor (props) {
    super(props) 
    this.state = {
      baseURL: 'https://www.alphavantage.co/query?',
      function: 'function=GLOBAL_QUOTE&',
      apikey: '',
      currentValue: '',
      symbolList: [],
      stocks: []
    }
  }

  handleChange = async (event) => {
    console.log(event.target.value)
    this.setState({currentValue: event.target.value})
    const keyword = 'keywords=' + event.target.value
    const symbolfunction = 'function=SYMBOL_SEARCH&'
    
    const searchURL = this.state.baseURL + symbolfunction + keyword + this.state.apikey
    const symList = []
    await fetch(searchURL)
      .then(response => response.json())
      .then((data) => {
        if (data.bestMatches){
          data.bestMatches.map(match => symList.push({name: match['2. name'], symbol: match['1. symbol']}))
        }
      })
      this.setState({ symbolList: symList})
      
    console.log(this.state)
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const symbol = 'symbol=' + this.state.currentSymbol
    const searchURL = this.state.baseURL + this.state.function + symbol + this.state.apikey
    await fetch(searchURL)
      .then(response => response.json())
      .then(data => this.setState({stocks: [...this.state.stocks, {
        name: this.state.currentValue, 
        symbol: data['Global Quote']['01. symbol'], 
        open: data['Global Quote']['02. open'],
        high: data['Global Quote']['03. high'],
        low: data['Global Quote']['04. low'],
        price: data['Global Quote']['05. price'],
        volume: data['Global Quote']['06. volume'],
        latestTradingDay: data['Global Quote']['07. latest trading day'],
        previousClose: data['Global Quote']['08. previous close'],
        change: data['Global Quote']['09. change'],
        changePercent: data['Global Quote']['10. change percent'],
      }]}))
      console.log(this.state)
  }

  componentDidMount = async() => {
    const apiUrl = 'http://localhost:5000/markets/market';
    await fetch(apiUrl)
      .then((response) => response.text())
      .then(async (data) => {
        await this.setState({apikey: '&apikey=' + data})
      }) 
  }

  handleSelectClick = (name, symbol) => {
    this.setState({currentValue: name, symbolList: [], currentSymbol: symbol})
  }

  render() {
    const tickerOptions = this.state.symbolList
    return (
      <div className="container">
        <form className="search_form">
          <div>
          <label htmlFor='keywords'>Ticker</label>
          </div>
          <div className="search">
            <input
              placeholder={'Select stock..'}
              value={this.state.currentValue || null}
              onChange={this.handleChange}
            />
            {tickerOptions.length > 0 &&
              <select value={tickerOptions.name} size={tickerOptions.length}>
                {
                tickerOptions.map((option_) => {
                  return <option onClick={() => this.handleSelectClick(option_.name, option_.symbol)} value={option_.name}>
                    ${option_.name}
                  </option>
                })
              }
              </select>
            }
          </div>
          <div>
          <button onClick={this.handleSubmit}
            type="submit"
            // value="search"
            >search</button>
            </div>
        </form>
        {this.state.stocks.length > 0 &&
        <StockInfo stock={this.state.stocks}/> 
        }
      </div>
    )
  }
}
