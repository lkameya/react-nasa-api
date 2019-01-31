import React from 'react';
import ReactDOM from 'react-dom';
import App, { doIncrement, doDecrement } from './App';

// Testing functions
it('should increment the counter in state', () => {
  const state = { counter: 0 };
  const newState = doIncrement(state);

  expect(newState.counter).toEqual(1);
});

it('should decrement the counter in state', () => {
  const state = { counter: 0 };
  const newState = doDecrement(state);

  expect(newState.counter).toEqual(-1);
});


// Smoke test
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
