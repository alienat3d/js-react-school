import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import App from '../App';
// import BootstrapTest from './BootstrapTest';
import styled from 'styled-components';
import { Button } from '../App';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const BigButton = styled(Button)`
  border-radius: 15px;
  padding: 4px 10px;
  max-width: 200px;
  text-align: center;
`;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
    <BigButton>CLICK ME</BigButton>
    <BigButton as='a' href='www.google.com'>I’m a link now!</BigButton>
    {/* <BootstrapTest /> */}
  </StrictMode>
);