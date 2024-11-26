import './App.css';
import React from 'react';

const apiKey = process.env.REACT_APP_API_KEY;

const randomColor = () => {
  const hexChars = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += hexChars[Math.floor(Math.random() * 16)];
  }
  return color;
};


const Background = (props) => {

  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `"${props.quote}" - ${props.author}`
  )}`;

  return (
    <div id='quote-box'>
      <div id='tweet-box'>
        <a id='tweet-quote' href={tweetUrl} target='_blank' rel='noopener noreferrer'><i className='fa fa-twitter'></i></a>
      </div>
      <div id='author' style={{backgroundColor: props.changeColor}}>
        <h3 style={{padding: 5, paddingBottom: 15}}>{props.author}</h3>
      </div>
      <div style={{minHeight: '50%'}}>
        <h1 id='text' className='text-center' style={{color: props.changeColor}}>
          <span className='quoteMark'>"</span>
          {props.quote}
          <span className='quoteMark'>"</span>
        </h1>
      </div>
      <button id='new-quote' style={{backgroundColor: props.changeColor}} className={'btn'} onClick={props.handleClick}>Switch</button>
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      getQuote: 'He who makes a beast of himself, gets rid of the pain of being a man',
      author: 'Samuel Johnson',
      newColor: randomColor(),
      error: null
    }
    this.handleClick = this.handleClick.bind(this)
  }

  async handleClick() {
      try {
          const response = await fetch('https://api.api-ninjas.com/v1/quotes?category=success', {
              method: 'GET',
              headers: {
                  'X-Api-Key': apiKey,
                  'Content-Type': 'application/json'
              }
          });
  
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
          const data = await response.json();
          
          if (!data || data.length === 0) {
            throw new Error('No quotes found');
          }

          const {quote, author} = data[0]
          this.setState({
            getQuote: quote,
            author: author,
          })
      } catch (error) {
         this.setState({
          error: error.message
         })
      }
  
  }
    
  render() {
    const {author, getQuote, error, newColor} = this.state
    return (
      <div id='wrapper'>
        {error && <p style={{color: 'red', marginLeft: 'auto', marginRight: 'auto'}}>Error: {error}</p>}
        <Background quote={getQuote} author={author} handleClick={this.handleClick} changeColor={newColor} />
      </div>
    )
  }
}

export default App;







