import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Material from './Material';
import GridContainer from './materialComponents/Grid';
import IntersectionDemo from './intersectionobserver/IntersectionDemo';

ReactDOM.render(
  <App></App>
  // <IntersectionDemo></IntersectionDemo>
  // <Material></Material>
  // <GridContainer></GridContainer>
  // <div>hi</div>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
