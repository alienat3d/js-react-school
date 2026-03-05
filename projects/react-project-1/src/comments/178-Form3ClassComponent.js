// 178.2.0 Начнём разбор с классового компонента, т.к. в нём применение Реакт-контекста будет выглядеть чуть иначе, чем в функциональном.

// Used for "React Context" lesson
import {Component} from 'react';
import {Container} from 'react-bootstrap';
import ClassInputComponent from './ClassInputComponent';

class Form3ClassComponent extends Component {
  render() {
    console.log('render');

    return (
      <Container>
        <form className="w-50 border mt-5 p-3 m-auto">
          <div className="mb-3">
            <label htmlFor="email" className="form-label mt-3">Email address</label>
            {/* 178.2.1 Здесь мы переделаем инпут в отдельный компонент, чтобы показать небольшой "props drilling" и как Реакт контекст это исправляет. */}
            {/* (Go to [/src/App.js]) */}
            <ClassInputComponent/>
          </div>
          <div className="mb-3">
            <label htmlFor="textarea" className="form-label">Note</label>
            <textarea value={this.props.text} className="form-control" id="textarea" rows="3"></textarea>
          </div>
        </form>
      </Container>
    );
  }
}

export default Form3ClassComponent;