import { Component } from 'react';

import './App.css';

class WhoAmI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      age: 37,
      text: '+',
      occupation: ''
    }
  }
  nextYear = () => {
    this.setState(state => ({
      age: state.age + 1
    }));
  }
  commitInputChanges = (evt, color) => {
    console.log(color);
    this.setState({
      occupation: evt.target.value
    })
  }
  render() {
    const { name, surname, link } = this.props;
    const { age, occupation } = this.state;
    return (
      <>
        <button onClick={this.nextYear}>
          {this.state.text}
        </button>
        <h2>My name is {name} {surname}. I’m {age} years old.</h2>
        <h3>My occupation is {occupation}.</h3>
        <a href={link}>My LinkedIn Profile</a>
        <form>
          <label htmlFor="occupation">
            Type your occupation
            <input
              type='text'
              id='occupation'
              onChange={(evt) => this.commitInputChanges(evt, 'some color')} />
          </label>
        </form>
      </>
    )
  };
}
function App() {
  return (
    <div className="App">
      <WhoAmI name='Al' surname='Tsaplin' link='https://www.linkedin.com/in/altdev/' />
      <WhoAmI name='Andrey' surname='Teplonogov' link='https://www.linkedin.com/in/antepliy/' />
    </div>
  );
}

export default App;