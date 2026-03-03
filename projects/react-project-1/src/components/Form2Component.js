import {memo} from 'react';
import {Container} from 'react-bootstrap';

// 177.2 Итак, здесь мы имеем компонент с двумя пропсами "mail" & "text", которые будут также соединены со значением атрибута value элементов input & textarea.
// (Go to [projects/react-project-1/src/App.js])
const Form2Component = memo(props => {
  return (
    <Container>
      <form className="w-50 border mt-5 p-3 m-auto">
        <div className="mb-3">
          <label htmlFor="email" className="form-label mt-3">Email address</label>
          <input value={props.mail}
                 type="email"
                 className="form-control"
                 id="email"
                 placeholder="name@example.com"/>
        </div>
        <div className="mb-3">
          <label htmlFor="textarea" className="form-label">Note</label>
          <textarea value={props.text} className="form-control" id="textarea" rows="3"></textarea>
        </div>
      </form>
    </Container>
  );
});

export default Form2Component;