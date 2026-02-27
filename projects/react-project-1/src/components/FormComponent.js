import {useState} from 'react';
import {Container} from 'react-bootstrap';

function useInputWithValidation(initialValue) {
  const [value, setValue] = useState(initialValue);

  const onChange = evt => setValue(evt.target.value);

  const validateInput = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  return {value, onChange, validateInput};
}

const FormComponent = () => {
  const input = useInputWithValidation('');
  const textarea = useInputWithValidation('');

  const color = input.validateInput() ? 'text-success' : 'text-danger';

  return (
    <Container>
      <form className="w-50 border mt-5 p-3 m-auto">
        <div className="mb-3">
          <label htmlFor="output" className="form-label mt-3">Output</label>
          <input value={`Email: ${input.value} | Note: ${textarea.value}`}
                 type="text"
                 className="form-control bg-warning-subtle"
                 id="output"
                 disabled/>
          <label htmlFor="email" className="form-label mt-3">Email address</label>
          <input onChange={input.onChange}
                 type="email"
                 value={input.value}
                 className={`form-control ${color}`}
                 id="email"
                 placeholder="name@example.com"/>
        </div>
        <div className="mb-3">
          <label htmlFor="textarea" className="form-label">Note</label>
          <textarea onChange={textarea.onChange}
                    value={textarea.value}
                    className="form-control"
                    id="textarea"
                    rows="3"></textarea>
        </div>
      </form>
    </Container>
  );
};

export default FormComponent;