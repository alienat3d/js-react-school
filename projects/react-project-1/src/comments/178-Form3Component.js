// Used for "React Context" lesson
import {Container} from 'react-bootstrap';
import InputComponent from './InputComponent';

const Form3Component = (props) => {
  console.log('render');

  return (
    <Container>
      <form className="w-50 border mt-5 p-3 m-auto">
        <div className="mb-3">
          <label htmlFor="email" className="form-label mt-3">Email address</label>
          {/* 178.2.1 Здесь мы переделаем инпут в отдельный компонент, чтобы показать небольшой "props drilling" и как Реакт контекст это исправляет. */}
          {/* (Go to [/src/App.js]) */}
          <InputComponent/>
        </div>
        <div className="mb-3">
          <label htmlFor="textarea" className="form-label">Note</label>
          <textarea value={props.text} className="form-control" id="textarea" rows="3"></textarea>
        </div>
      </form>
    </Container>
  );
};

export default Form3Component;