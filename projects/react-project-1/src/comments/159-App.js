import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

import './App.css';

// ?[159] ref
// ? Шаблон формы взят с [https://getbootstrap.com/docs/5.3/forms/form-control/]
// * 1.0.0 Итак, представим, что у нас есть задача, чтобы при загрузки компонента формы фокус устанавливался на поле ввода e-mail. И это отличный пример задачи, когда нам пригодятся рефы.
// ? ref — это ссылка на элемент или компонент в DOM-дереве (уже в отрендереном интерфейсе на странице). И так как этот элемент уже существует на странице (не где-то в VirtualDOM), то можно использовать метод focus.
// * 1.0.1 Сперва создадим реф (myRef) в constructor. И чтобы создать ссылку на какой-то элемент используем команду реакта React.createRef(). А дальше этот реф (ссылку) нужно присвоить нужному элементу. Находим input и допишем ему атрибут ref и поместим внутрь него "this.myRef".
// 1.0.2 Ну и т.к. нам нужно ставить фокус сразу после загрузки компонента, то создадим хук жизненного цикла componentDidMount, а внутрь поместим ссылку и здесь один нюанс, т.к. именно ссылка на элемент хранится в специальном свойстве current. (Часто возникает ошибка, потому что забывают 'current') Ну и добавим ему метод focus().

// * 1.1.0 Также рефы могут отличаться в зависимости от того на что повешен атрибут. Если на обычный элемент, как это делали на input, то получим ссылку на этот элемент в DOM-дереве. Но рефы можно также повесить и на компоненты, например здесь Container — и тогда свойство "current" получит экземпляр созданного компонента. Зачем это нужно? Чтобы вызывать методы этого компонента, если он у него есть. (Пример: "this.myRef.current.someMethod()")
// ? 1.1.1 Рефы назначаются перед хуками componentDidMount и componentDidUpdate. То есть перед обновлением компонента. Но когда компонент размонтируется, то в myRef установится значение null. А значит нам не нужно делать отписку от рефов, как это необходимо делать с обработчиками событий или интервалами. ↓

// * 1.3.0 Вернём как было вначале, чтобы input был элементом, а не компонентом.
// ? 1.3.1 Мы можем создавать разные рефы, но они обязательно должны быть с разными именами.
// * 1.3.2 Реализуем ещё такую задачу, которая может встретится при валидации форм: Когда при клике на textarea фокус с поля ввода textarea перекидывается на первый input. (Можно представить, что пользователь что-то неправильно ввёл и попробовал отправить форму и его перекинуло на первое поле, где он допустил ошибку. Конечно в реальном проекте логика будет сложнее, но здесь мы просто тренируемся.)

// ? 1.4.0 И ещё есть такое понятие как «коллбэк-рефы» — это когда мы создаём реф не при помощи createRef(), а при помощи функции и записываем ссылку на экземпляр класса. Для примера как это работает создадим метод setInputRef. Это метод, который аргументом пример какой-то элемент и внутри у него будет this.myRef = element. Т.е. у нас есть функция, которая создаёт новое поле this.myRef и в него помещает ссылку на этот элемент. Это нестандартный способ установить рефы, но такая возможность тоже есть.
class Form extends Component {
  /*   myRef = React.createRef();
    mySecondRef = React.createRef(); */

  /*   componentDidMount() {
      this.myRef.current.focus();
      // this.myRef.current.focusOnInput();
    } */

  setInputRef = element => this.myRef = element;

  // 1.4.2 И дальше мы этот реф можем использовать в других методах, однако стоит сделать на всякий случай проверку на действительность ссылки реф.
  // ? 1.4.3 В курсе сказали, что с приёмом коллбэк-рефов current не используется, но на деле браузеру Chrome всё равно, вероятно это пофиксили.
  // ? 1.4.4 Таким образом можно формировать целый массив ссылок на DOM-элементы, если рефы создаются внутри цикла.
  focusFirstTextInput = () => {
    if (this.myRef) {
      this.myRef.focus();
    }
  }
  // 1.4.1 А дальше мы передаём этот метод элементу в пропе ref. Теперь, когда будет создаваться DOM-структура, то запустится эта функция, возьмёт этот элемент, на котором она была вызвана и запишет его в реф (ссылку экземпляра классового компонента). ↑
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
              ref={this.setInputRef} />
              {/* ref={this.myRef} /> */}
            {/* <TextInput ref={this.myRef} /> */}
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
              // ref={this.mySecondRef}
              onClick={this.focusFirstTextInput}>
            </textarea>
          </div>
        </form>
      </Container>
    )
  }
}
// ? 1.1.2 Также рефы нельзя назначать на функциональные компоненты. Рассмотрим на примере TextInput и попытаемся его подставить вверху в рендер Form с рефом:
// 1.1.3 Получаем ошибку, т.к. функциональные компоненты не создают экземпляров, как это делают классы. Чтобы обойти это ограничение переведём его в классовый компонент.
// 1.1.4 Также для теста создадим ему какой-то метод.
// 1.1.5 И снова мы получаем ошибку, почему? Дело в том, что когда мы вешаем реф на обычный элемент, то получаем ссылку на него в DOM-дереве. Но когда мы использовали реф на классовом компоненте, то мы получим ссылку на экземпляр класса. А экземпляр класса это уже объект и мы не можем на нём использовать такой DOM API, как метод focus(). И для таких манипуляций в классовом компоненте нужно прописать метод, который будет устанавливать фокус на инпуте.
// ? 1.2 Есть также альтернативный вариант, который называется перенаправление рефов (forward Ref), если по какой-то причине нам нужно использовать именно функциональные компоненты. Но он используется крайне редко и в основном при создании собственных библиотек. При необходимости можно ознакомиться со ссылками в [react-course-notes\7-159-ref.js].
/* class TextInput extends Component {
  focusOnInput = () => {
    document.querySelector('input[type=email]').focus();
  } 

  render() {
    return (
      <input
        type="email"
        className="form-control"
        id="exampleFormControlInput1"
        placeholder="name@example.com" />
    )
  }
} */

function App() {
  return (
    <Form />
  );
}

export default App;
