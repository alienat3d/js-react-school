// import { Component, Fragment } from 'react';
import { Component } from 'react';

import './App.css';

// * == Реакт-фрагменты == * \\
// ? [6.137]
// todo [начало в react-course-notes\6-137-react-fragments.js]
// * 1.1.1 Итак, сперва импортируем "Fragment" ↑. 

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
  // * 1.1.2 А далее мы можем использовать его уже как компонент для замены нашего пустого div’а. Таким образом мы избавились от пустого div'а.
  // * 1.1.3 Для определённых задач мы бы могли поступить иначе и оставить в render() <div>, а Fragment указать уже ниже в функции App, возвращающей наши компоненты. ↓
  // render() {
  //   const { name, surname, link } = this.props;
  //   const { age, occupation } = this.state;
  //   return (
  //     // <Fragment>
  //     <div className='wrapper'>
  //       <button onClick={this.nextYear}>
  //         {this.state.text}
  //       </button>
  //       <h2>My name is {name} {surname}. I’m {age} years old.</h2>
  //       <h3>My occupation is {occupation}.</h3>
  //       <a href={link}>My LinkedIn Profile</a>
  //       <form>
  //         <label htmlFor="occupation">
  //           Type your occupation
  //           <input
  //             type='text'
  //             id='occupation'
  //             onChange={(evt) => this.commitInputChanges(evt, 'some color')} />
  //         </label>
  //       </form>
  //     {/* </Fragment> */}
  //     </div>
  //   )
  // };
  // * 1.2.0 Однако есть и второй способ, который сейчас чаще всего используется в реакт-фрагментах. Здесь нам уже Fragment не нужно импортировать [см. Ln2]. А также в render() не использовать никакие теги — Реакт и так поймёт, что это реакт-фрагмент.
  // ? При том, что использовать будем в основном второй, но в редких случаях и первый способ может тоже пригодиться. Когда мы создаём какие-то списки, например, при помощи метода map(), то мы тоже можем использовать реакт-фрагменты, т.е. внутри уже формирующегося каждого элемента списка. И вот там, если мы хотим назначить атрибут key для чего-то, мы сможем это сделать для реакт-фрагментов. "React.Fragment key='123'" — пример записи, если вдруг понадобится подобный функционал, к пустым тегом добавить ключи не получится, поэтому мы используем такой синтаксис.
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
  // return (
  //   // <div className="App">
  //   <Fragment>
  //     <WhoAmI name='Al' surname='Tsaplin' link='https://www.linkedin.com/in/altdev/' />
  //     <WhoAmI name='Andrey' surname='Teplonogov' link='https://www.linkedin.com/in/antepliy/' />
  //   {/* </div> */}
  //   </Fragment>
  // );
  // * [1.2.0]
  return (
    <div className="App">
      <WhoAmI name='Al' surname='Tsaplin' link='https://www.linkedin.com/in/altdev/' />
      <WhoAmI name='Andrey' surname='Teplonogov' link='https://www.linkedin.com/in/antepliy/' />
    </div>
  );
}

export default App;
