import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

//smoke test
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router/>, div);
  ReactDOM.unmountComponentAtNode(div);
});


//render test
