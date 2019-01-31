import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

const API = 'https://api.nasa.gov/planetary/apod';

export const doIncrement = prevState => ({
  counter: prevState.counter + 1,
});

export const doDecrement = prevState => ({
  counter: prevState.counter - 1,
});


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      explanation: '',
      imageURL: '',
      isLoading: false,
      error: null,
    };
  }

  getPictureOfTheDay = async () => {
    this.setState({ isLoading: true });
    try {
      const result = await axios.get(API, {
        params: {
          date: '2019-01-01',
          hd: false,
          api_key: 'w0D7qmlrDGhEWRsPK2mgEeZhWhBqYEzsY9q8HUhV'
        }
      });
      this.setState({
        explanation: result.data.explanation,
        imageURL: result.data.url,
        title: result.data.title,
        isLoading: false
      });
    }
    catch (e) {
      this.setState({
        error: e,
        isLoading: false
      })
    }
  }

  componentDidMount() {
    this.getPictureOfTheDay();
  }

  render() {
    const { explanation, imageURL, title, isLoading, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return (
      <div>
        <h2>{title}</h2>
        <img src={imageURL} alt="APOD" width="600px" height="500px" />
        {explanation}
      </div>
    );
  }
}

export default App;
