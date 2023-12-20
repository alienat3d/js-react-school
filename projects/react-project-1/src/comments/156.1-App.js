import React, { Component } from 'react';
import styled from 'styled-components';

import BootstrapTest from '../BootstrapTest';

import './App.css';

// ?[156.1] props children

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

// * 1.0.0 Для тестирования props children создадим новый элемент DynamicGreetings. Ему пропишем div и Bootstrap-классы для стилизации. Причём последний класс border-color будет создан так, что цвет будет приходить туда из пропсов. Теперь, как нам сказать реакт, чтобы он рендерил ту структуру, которая будет передана при вызове? Пока мы не знаем, что будет внутри этого блока. Может быть просто сообщение, компонент слайдера, форма и многое другое.
// ? 1.0.1 Часто подобная ситуация встречается в различный сайдбарах или модальных окнах (например, когда есть оболочка какого-то модального окна, но мы не знаем что будет внутри). Здесь нам и понадобится такое свойство как props.children. Дословно можно сказать, что вместо этой конструкции будут подставляться любые элементы или компоненты, которые мы передадим во внутрь компонента DynamicGreeting.
// * 2.0.0 Допустим, что теперь в компонент DynamicGreeting приходят какие-то элементы, но нам нужно добавить к каждому из этих элементов добавить какие-то классы и сделать это не хардкодом, а динамически внутри описания компонента DynamicGreeting. В подобном случае нам пригодятся методы перебора и cloneElement.
// ? 2.0.1 Также, для этого нужно не забыть импортировать сюда нужные нам сущности. ↑
// 2.0.2 Один или несколько дочерних элементов не имеет значения. Но если дочерних элементов будет >1, то сформируется массив дочерних элементов.
// 2.0.3 Т.к. в реакт мы должны соблюдать принципы иммутабельности, то мы не хотим мутировать элементы, а клонировать и клонам прибавить нужные нам классы.
// ? 2.0.4 Из документации видно, что в cloneElement у нас будет приходить 3 аргумента: 1) элемент, 2) [config] (новые пропсы, которые будут добавляться в клонированный элемент) и 3) [...children] (дочерние элементы, которые будут передаваться внутрь компонента). Итак на нашем примере мы берём каждый child (дочерний элемент, что будет приходить в метод map), вешать на него новые Bootstrap-классы.
// ? 2.0.5 При разработке сложных интерфейсов, где очень много разных компонентов это действительно очень полезный и удобный приём.
// ? 2.0.6 Ну и в классовых компонентов всё будет аналогично, только пропсы будут с контекстом вызова this.
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
// 1.0.2 Ну и теперь применим, также передадим внутрь проп color со значением "primary".

// * 3.0.2  Итак мы поместим <BootstrapTest /> и создаём для вставки два пропа left & right, соответственно и помещаем внутрь компонент. Теперь вся структура компонента DynamicGreeting будет передаваться в BootstrapTest.js в {props.left}, ну и правая часть {props.right}, соответственно. Это два отдельных компонента, которые совершенно не знают, что будет у них внутри, по аналогии с props.children. И как мы видим они отлично комбинируются.
// ? 3.0.3 Такого рода приёмы мы можем применять повсеместно и они очень помогают с оптимизацией процесса. Когда приложение будет всё больше разрастаться, то скорее всего мы захотим уменьшить количество компонентов и оптимизировать структуру. Здесь очень пригодятся подобные приёмы. А также ещё один приём, который называется render.props, урок по которому будет дальше.
function App() {
  return (
    <Wrapper>
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