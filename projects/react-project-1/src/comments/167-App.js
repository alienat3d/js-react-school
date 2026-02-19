import {useEffect, useRef, useState} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';

// 167.1 Задача стоит такая же, как и раньше мы делали в аналогичном классовом компоненте — переводить фокус на инпут, когда юзер кликает на элементе textarea. Но теперь мы будем использовать для этого хук «useRef».
// 167.2.0 Также рассмотрим и второе применение рефов, которое однако часто используется — сохранять какие-то неизменяемые данные, использующиеся компонентом. Для начала создадим стейт.
const Form = () => {
  const [text, setText] = useState('');
  const myRef = useRef(1);

  /*const focusFirstTI = () => {
    myRef.current.focus();
  };*/

  // 167.2.3 И если бы здесь у нас был не реф, а стейт, то такой useEffect без зависимостей вызвал бы проблему "infinity loop", т.к. постоянно вызывал бы ререндер снова и снова. Но теперь мы знаем, что реф, в отличие от стейта, не вызывает ререндера и потому мы можем так сделать.
  useEffect(() => {
    console.log(myRef.current);
  })

  // 167.2.4 И теперь, проверим наш тестовый функционал: когда мы вводим что-то в инпут, то будет происходить ререндер компонента и вызываться useEffect с console.log, показывающий актуальное значение в рефе myRef. Но, когда мы будем кликать по элементу textarea ререндера происходить не будет, однако значение рефа будет увеличиваться на 1 каждый клик. Т.о. это поведение можно использовать, когда нам нужно производить какие-то операции без ререндера компонента.
  return (
    <Container>
      <form className="w-50 border mt-5 p-3 m-auto">
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
          {/* 167.2.2 А здесь будем записывать в стейт ввёденные данные в инпут. */}
          <input onChange={(evt) => setText(evt.target.value)} type="email"
                 className="form-control"
                 id="exampleFormControlInput1"
                 placeholder="name@example.com"/>
          {/*<input ref={myRef} type="email"
                 className="form-control"
                 id="exampleFormControlInput1"
                 placeholder="name@example.com"/>*/}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
          {/* 167.2.1 Здесь мы добавим слушатель клика, по которому будем увеличивать на 1 данные в myRef ↑ */}
          <textarea onClick={() => myRef.current++} className="form-control" id="exampleFormControlTextarea1"
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"></textarea>
          {/*<textarea onClick={focusFirstTI}
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"></textarea>*/}
        </div>
      </form>
    </Container>
  );
};

function App() {
  return (
    <Form/>
  );
}

export default App;