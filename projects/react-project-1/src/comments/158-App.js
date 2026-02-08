import React, { Component } from 'react';
import styled from 'styled-components';

import BootstrapTest from '../BootstrapTest';

import './App.css';

//?[158] render props

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
  nextYear = () => this.setState(state => ({ age: state.age + 1 }));

  commitInputChanges = (evt, color) => {
    console.log(color);
    this.setState({ occupation: evt.target.value })
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

const DynamicGreeting = (props) => {
  return (
    <div className={'mb-3 p-3 border border-' + props.color}>
      {
        React.Children.map(props.children, child => {
          return React.cloneElement(child, { className: 'shadow p-3 m-3 border rounded' })
        })
      }
      {/* {props.children} */}
    </div>
  )
}

const HelloGreeting = (props) => {
  return (
    <div style={{ 'width': '600px', 'margin': '0 auto' }}>
      <DynamicGreeting color={'danger'}>
        <h1>Hi, {props.name} 🥷!</h1>
      </DynamicGreeting>
    </div>
  )
}

// * 1.0.0 Для примера создадим какой-то компонент, который будет зависеть от состояния своего родителя.
// 1.0.2 Итак, у нас получился компонент Message может в себе содержать любой счётчик с пропсом. Т.е. туда может передаваться любое значение, которое будет счётчиком. Это совершенно независимый компонент.

// * 1.0.11 Подведём итог изученного. Если у нас задача объединить два независимых друг от друга компонента и нам нужно сохранить их гибкость (специфичность). При этом один должен появится внутри другого, пользуясь его стейтом. Решением было применить приём render props. Мы взяли компонент Counter и во время его рендера мы передали ему специальный проп render, который внутри содержит коллбэк-функцию, которая внутри себя принимает аргумент и возвращает другой компонент (какой именно мы там указываем и он может быть любым). Далее внутри компонента Counter, в нужном месте мы прописали команду {this.props.render(this.state.counter)}, указывая, что здесь должна сработать функция render и появится тот компонент, который мы указывали в коллбэк-функции в пропе render. И чтобы связать стейт с тем компонентом, внутрь передали аргумент "this.state.counter" и потом используется для вывода компонента Message на страницу.
// ? 1.0.12 На самом деле мы могли бы назвать этот проп как угодно, то всё же принято называть именно render, чтобы сохранять наглядность и читаемость кода. Так любой разработчик сразу поймёт, что мы используем именно этот приём.
// ? 1.0.13 Также можно передавать сразу несколько таких пропсов в виде функций, как впрочем и {this.props.render(this.state.counter)} мы могли бы указать сразу в нескольких местах компонента.
const Message = (props) => {
  return <h2>The counter is {props.counter}</h2>
}
// 1.0.1 Далее создадим ещё один классовый компонент, у которого будет стейт counter в значении 0. Также создадим внутри него метод для изменения значения счётчика. Вытащим деструктуризацией counter из объекта state и записывать мы будем значение counter + 1. Ну и render с кнопкой в которую будем передавать метод changeCounter.
// 1.0.3 Также и отдельный классовый компонент Counter, который имеет свой стейт счётчика, и рендерит кнопку, а она меняет этот стейт счётчика.
// ? 1.0.4 Как мы можем связать эти два компонента, чтобы они оставались независимыми друг от друга, но при этом компонент Message находился бы внутри компонента Counter и использовал бы его состояние? Ведь если мы взяли и просто поместили бы Message внутрь компонента Counter в его функцию render, то это была бы жёсткая привязка. Компонент Counter потеряет свою специфичность, потому, что внутри будет содержать конкретный компонент. А значит, если понадобится внутри не Message, а другой компонент, то придётся создавать копию компонента Counter. 
// 1.0.5 На практике мы не хотим делать, как в закомментированной строке ниже, чтобы не делать жёсткой привязки одного компонента к другому. И если понадобится такой же компонент Counter, но с другим компонентом вместо Message, то скорее всего придётся копировать весь Counter, чтобы заменить один компонент внутри.

// 1.0.9 Теперь туда, где мы раньше прописывали жёстко Message мы можем записать {this.props.render()}, что означает, что там будет рендериться что-то, что мы только что записали в пропсе с именем render. Теперь там выполнится функция render() и на месте себя оставит <Message counter={counter} />, т.е. тот компонент, который мы туда динамически передали.
// 1.0.10 Также нам понадобится передать какой-то аргумент, им как раз будет "this.state.counter".
class Counter extends Component {
  state = { counter: 0 }

  changeCounter = () => this.setState(({ counter }) => ({
    counter: ++counter
  }))

  render() {
    return (
      <>
        {this.props.render(this.state.counter)}
        <button className='btn btn-primary text-center' onClick={this.changeCounter}>
          Click me
        </button>
        {this.props.render(this.state.counter)}
        {/* <Message counter={this.state.counter}/> */}
      </>
    )
  }
}
// ? 1.0.6 И чтобы не терять гибкость мы можем применить приём render props. И выглядит он следующим образом: Под Wrapper запишем компонент Counter.
// 1.0.7 Что означает рендер пропсы? В пропсы компонента передаётся что-то, что будет рендерить какую-то структуру внутри компонента. И если речь идёт о действии, то это скорее всего должна быть функция. Т.е. в качестве пропа в компонент можем также передавать функцию, которая запустится внутри этого компонента и будет рендерить какую-то структуру внутри него и называться проп будет render. Далее помести внутрь коллбэк-функцию, которая примет один аргумент и дальше мы вернём из этой функции компонент Message.
// 1.0.8 Т.к. Компонент Message принимает пропсы и нам нужен counter, значит передадим туда проп counter. И в данный момент мы можем не знать, что именно это будет, но мы знаем, что когда запустится коллбэк-функция, то мы туда передадим какой-то аргумент, который будет помещаться внутрь Message. ↑
function App() {
  return (
    <Wrapper>

      <Counter render={counter => (
        <Message counter={counter} />
      )}/>

      <HelloGreeting name='Jack JS-Samurai' />
      <BootstrapTest
        left={
          <DynamicGreeting color={'primary'}>
            <h2>Hello world!</h2>
            <h3>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus asperiores totam fuga ut culpa placeat.</h3>
          </DynamicGreeting>
        }
        right={
          <DynamicGreeting color={'secondary'}>
            <h2>Hello underworld!</h2>
            <p>Lorem ipsum.</p>
          </DynamicGreeting>
        }
      />

      <WhoAmI name='Al' surname='Tsaplin' link='https://www.linkedin.com/in/altdev/' />
      <WhoAmI name='Andrey' surname='Teplonogov' link='https://www.linkedin.com/in/antepliy/' />
    </Wrapper >
  );
}

export default App;