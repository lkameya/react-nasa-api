import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

const API = 'https://hn.algolia.com/api/v1/search?query=';
const DEFAULT_QUERY = 'redux';

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
      hits: [],
      isLoading: false,
      teste: false,
      error: null,
    };
  }

  getStories = async () => {
    this.setState({ isLoading: true });
    try {
      const result = await axios.get(API + DEFAULT_QUERY)
      console.log(result);
      this.setState({
        hits: result.data.hits,
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
    this.getStories();
  }

  render() {
    const { hits, isLoading, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return (
      <ul>
        {hits.map(hit =>
          <li key={hit.objectID}>
            <a href={hit.url}>{hit.title}</a>
          </li>
        )}
      </ul>
    );
  }
}

export default App;
