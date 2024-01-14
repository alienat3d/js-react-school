import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

import './App.css';

class Form extends Component {
  /*   myRef = React.createRef();
    mySecondRef = React.createRef(); */

  componentDidMount() {
    this.myRef.focus();
    // this.myRef.current.focusOnInput();
  }

  setInputRef = element => this.myRef = element;

  focusFirstTextInput = () => {
    if (this.myRef) {
      this.myRef.focus();
    }
  }

  render() {
    return (
      <Container>
        <form className="w-50 border mt-5 p-3 m-auto">
          <div className="mb-3">
            <label
              htmlFor="exampleFormControlInput1"
              className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
              // ref={this.myRef} />
              ref={this.setInputRef} />
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleFormControlTextarea1"
              className="form-label">
              Example textarea
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              onClick={this.focusFirstTextInput}>
            </textarea>
          </div>
        </form>
      </Container>
    )
  }
}

function App() {
  return (
    <Form />
  );
}

export default App;
