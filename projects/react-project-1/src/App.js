import './App.css';
import {useCallback, useState} from 'react';
import Form2Component from './components/Form2Component';
// import Form2PureComponent from './components/Form2PureComponent';
// import FormComponent from './components/FormComponent';
// import BatchingExample from './components/BatchingExample';
// import ConcurrentModeExample from './components/ConcurrentModeExample';

function App() {
  const [data, setData] = useState({
    /*mail: {
      name: 'John Doe',
    },*/
    mail: 'name@example.com',
    text: 'Hello World!',
  });

  const logger = useCallback(() => {
    console.log('log')
  }, []);

  return (
    <>
      {/*<ConcurrentModeExample/>*/}
      {/*<FormComponent/>*/}
      {/*<BatchingExample/>*/}
      {/*<Form2PureComponent mail={data.mail} text={data.text}/>*/}
      <Form2Component mail={data.mail} text={data.text} onLog={logger}/>

      <button className="btn btn-warning"
              style={{margin: '50px auto', display: 'block', fontWeight: 'bold'}}
              onClick={() => setData({
                mail: 'zaplin.dev@gmail.com',
                /*mail: {
                  name: 'zaplin.dev@gmail.com',
                },*/
                text: 'Text me to speak about your project!',
              })}>
        Click Me
      </button>
    </>
  );
}

export default App;