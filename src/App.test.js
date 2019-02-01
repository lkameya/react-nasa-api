import React from 'react';
import ReactDOM from 'react-dom';
import App, { doIncrement, doDecrement } from './App';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import sinon from 'sinon';

configure({ adapter: new Adapter() });

// Testing functions
it('should increment the counter in state', () => {
  const state = { counter: 0 };
  const newState = doIncrement(state);

  expect(newState.counter).toEqual(1);
});

it('should decrement the counter in state', () => {
  const state = { counter: 0 };
  const newState = doDecrement(state);
  m
  expect(newState.counter).toEqual(-1);
});

// Smoke test
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  shallow(<App />);
});

describe('App', () => {

  const result = {
    data: {
      hits: [
        { objectID: '1', url: 'https://blog.com/hello', title: 'hello', },
        { objectID: '2', url: 'https://blog.com/there', title: 'there', },
      ],
    }
  };

  const promise = Promise.resolve(result);

  beforeAll(() => {
    sinon
      .stub(axios, 'get')
      .withArgs('https://hn.algolia.com/api/v1/search?query=redux')
      .returns(promise);
  });

  afterAll(() => {
    axios.get.restore();
  });

  it('stores data in local state', (done) => {
    const wrapper = mount(<App />);

    expect(wrapper.state().hits).toEqual([]);

    promise.then(() => {
      wrapper.update();

      expect(wrapper.state().hits).toEqual(result.data.hits);
      expect(wrapper.state().teste).toEqual(false);

      done();
    });
  });


  it('renders data when it fetched data successfully', (done) => {
    const wrapper = mount(<App />);

    expect(wrapper.find('p').text()).toEqual('Loading ...');

    promise.then(() => {
      wrapper.update();

      expect(wrapper.find('li')).toHaveLength(2);

      done();
    });
  });

});

