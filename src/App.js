import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

const API = 'https://api.nasa.gov/planetary/apod';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      explanation: '',
      imageURL: '',
      date: new Date(),
      isLoading: false,
      error: null,
    };
  }

  getPictureOfTheDay = async () => {
    const { date } = this.state;
    this.setState({ isLoading: true });
    try {
      const result = await axios.get(API, {
        params: {
          date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
          hd: false,
          api_key: 'w0D7qmlrDGhEWRsPK2mgEeZhWhBqYEzsY9q8HUhV'
        }
      });
      this.setState({
        explanation: result.data.explanation,
        imageURL: result.data.url,
        title: result.data.title,
        isLoading: false,
        date: new Date(date.setDate(date.getDate() - 1))
      });
    }
    catch (e) {
      this.setState({
        error: e,
        isLoading: false
      })
    }
    finally {
      setTimeout(() => {
        this.getPictureOfTheDay()
      }, 5000)
    }
  }

  componentDidMount() {
    this.getPictureOfTheDay();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { explanation, imageURL, title, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    return (
      <main>
        <h2 className="title">{title}</h2>
        <div className="box-image ">
          <img src={imageURL} alt="APOD" height="500px" />
        </div>
        <div className="description">
          {explanation}
        </div>
      </main>
    );
  }
}

export default App;
