import {useContext} from 'react';
import {DataContext} from './DataContext';

const InputComponent = () => {
  const context = useContext(DataContext);

  return (
    <input value={context.mail}
           type="email"
           className="form-control"
           id="email"
           placeholder="name@example.com"
           onFocus={context.changeMail}/>
  );
};

export default InputComponent;