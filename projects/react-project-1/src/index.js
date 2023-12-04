// * 1.0.0 Чтобы использовать "Strict mode" мы можем импортировать его из объекта React, используя деструктуризацию.
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import { Header, Field, Button } from "./App";

// 1.0.1 Теперь мы можем его использовать, поместив в него наши компоненты.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App/>
  </StrictMode>
);