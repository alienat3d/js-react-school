import { Component } from 'react';
import styled from 'styled-components';

import './App.css';

// ? [143.1]
// * 1.0 Сперва мы импортируем Styled Components туда, где мы будем их использовать. ↑

// * 1.1.2 Для закрепления создадим ещё пару элементов подобным образом. Этот компонент мы будем использовать для обёртки каждого блока с информацией.
// ? 1.5 Что же, если я хочу пользоваться CSSinJS, то каждый элемент, что есть в вёрстке превращать в Styled Component для назначения стилей? Мы можем сделать чуть иначе, что будет похоже на то, как мы это делали в препроцессорах. Styled Components поддерживают также вложенности. Например мы можем сказать, что все ссылки внутри компонента EmpItem.
// 1.6.2 Теперь в стилях к ссылкам можем прописать в ${} пропсы. В объекте пропсов у нас действительно существует свойство active и мы его проверим тернарником. А значит мы можем менять стили динамически при помощи коллбэк-функций и пропсов, которые передаются в этот компонент.
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
// 1.1.3 И ещё пара у нас будет с заголовками h2 и h3.
const Header = styled.h2`
  font-size: 25px;
`;
const SubHeader = styled.h3`
  font-size: 22px;
`;
// 1.1.4 Также стилизуем кнопку для увеличения значений.
// * 1.2.0 К примеру мы можем экспортировать нашу кнопку и тогда перейдя в файл другого компонента, например index.js и импортируем его туда.
// todo [перейдём в index.js]
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
  // ? 1.6.0 Ещё одной важной возможностью этой технологии является поддержка своих пропсов. Т.е. в такие компоненты мы можем передавать какие-то свойства и использовать внутри стилей. Это может быть активная ссылка, выделенная карточка, важная запись и т.п. Т.к. тут из повторяющихся компонентов только WhoAmI, то сделаем для всех, чтобы продемонстрировать как это работает. 
  // 1.6.1 Компоненту EmpItem передадим атрибут active в позиции true, как мы уже делали раньше. Дальше вернёмся вверх к стилям этого компонента. ↑
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

// * 1.1.0 Теперь, допустим, нам нужно создать какой-то блок-обёртку, который будет оборачивать весь наш контент. И как в примере из документации, используем сперва объект библиотеки "styled", а после точки типа блока (его тег), а потом бэктики. Внутрь этих бэктиков можно указывать те стили, которые мы бы хотели применить к div'у. И поместим его в роли главного родительского тега внутрь App.
// ? 1.1.1 Отличительная особенность такого подхода, что созданным подобным образом тегам будет присваиваться класс из совершенно случайных сочетаний букв. В этом есть свои преимущества и недостатки.
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