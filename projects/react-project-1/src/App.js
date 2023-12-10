import { Component } from 'react';
import styled from 'styled-components';

import './App.css';

const EmpItem = styled.div`
  margin-bottom: 15px;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  a {
    display: block;
    margin: 10px 0 10px 0;
    color: ${props => props.active ? 'orange' : 'navy'};
    &:hover {
      color: yellowgreen;
    }
  }
  input {
    display: block;
    margin-top: 10px;
  }
`;
const Header = styled.h2`
  font-size: 25px;
`;
const SubHeader = styled.h3`
  font-size: 22px;
`;
export const Button = styled.button`
  margin: 0 auto 10px;
  display: block;
  border-radius: 50%;
  padding: 0;
  background-color: gold;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
`;

class WhoAmI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      age: 37,
      imgUrl: './img/plus.svg',
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
    const { age, occupation, imgUrl } = this.state;
    return (
      <EmpItem active>
        <Button onClick={this.nextYear}>
          <img className='btn-icon' src={imgUrl} alt="" />
          {this.state.text}
        </Button>
        <Header>My name is {name} {surname}. I’m {age} years old.</Header>
        <SubHeader>My occupation is {occupation}.</SubHeader>
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
      </EmpItem>
    )
  };
}
const Wrapper = styled.div`
  margin: 80px auto 0 auto;
  width: 600px;
`;

function App() {
  return (
    <Wrapper>
      <WhoAmI name='Al' surname='Tsaplin' link='https://www.linkedin.com/in/altdev/' />
      <WhoAmI name='Andrey' surname='Teplonogov' link='https://www.linkedin.com/in/antepliy/' />
    </Wrapper>
  );
}

export default App;