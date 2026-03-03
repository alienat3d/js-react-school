import './App.css';
import Form2Component from './components/Form2Component';
import {useState} from 'react';
// import FormComponent from './components/FormComponent';
// import BatchingExample from './components/BatchingExample';
// import ConcurrentModeExample from './components/ConcurrentModeExample';

function App() {
  // 177.3 Тут у нас также есть стейт с какими-то данными, которые будут передаваться в Form2Component через пропсы, а также по клику на кнопке мы будем менять эти данные через запись нового стейта.
  const [data, setData] = useState({
    mail: 'name@example.com',
    text: 'Hello World!',
  });

  console.log('render');

  return (
    <>
      {/*<ConcurrentModeExample/>*/}
      {/*<FormComponent/>*/}
      {/*<BatchingExample/>*/}
      <Form2Component mail={data.mail} text={data.text}/>
      <button onClick={() => setData({
        mail: 'zaplin.dev@gmail.com',
        text: 'Text me to speak about your project!',
      })}>
        Click Me
      </button>
    </>
  );
}

export default App;