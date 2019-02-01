import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

const API = 'https://api.nasa.gov/planetary/apod';

const randomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

class App extends Component {
  constructor(props) {
    super(props);

    this.synth = window.speechSynthesis;

    this.state = {
      explanation: '',
      imageURL: '',
      date: randomDate(new Date(2017, 0, 1), new Date()),
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
        date: randomDate(new Date(2017, 0, 1), new Date())//new Date(date.setDate(date.getDate() - 1))
      });

      this.readText(this.state.explanation);
    }
    catch (e) {
      this.setState({
        error: e,
        isLoading: false
      })
    }
    finally {
      setTimeout(() => {
        this.synth.cancel();
        this.getPictureOfTheDay();
      }, 60000)
    }
  }

  componentDidMount() {
    this.getPictureOfTheDay();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  readText(text) {
    const chunks = text.split('.');
    for (let chunk of chunks) {
      let utterThis = new SpeechSynthesisUtterance(chunk);
      utterThis.voice = this.synth.getVoices()[5];
      this.synth.speak(utterThis);
    }
  }

  render() {
    const { explanation, imageURL, title, error } = this.state;
    if (error) {
      return <p>{error.message}</p>;
    }

    return (
      <main>
        <h1 className="title">{title}</h1>
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
