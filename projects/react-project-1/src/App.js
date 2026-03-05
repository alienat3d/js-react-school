import './App.css';
import {useState} from 'react';
// import {useCallback} from 'react';
// import Form3ClassComponent from './components/Form3ClassComponent';
import {DataContext} from './components/DataContext';
import Form3Component from './components/Form3Component';
// import Form2Component from './components/Form2Component';
// import Form2PureComponent from './components/Form2PureComponent';
// import FormComponent from './components/FormComponent';
// import BatchingExample from './components/BatchingExample';
// import ConcurrentModeExample from './components/ConcurrentModeExample';

const {Provider} = DataContext;

function App() {
  const [data, setData] = useState({
    /*mail: {
      name: 'John Doe',
    },*/
    mail: 'name@example.com',
    text: 'Hello World!',
    changeMail: changeMail
  });

  function changeMail() {
    setData({...data, mail: 'contact@zapl.in',});
  }

  /*  const logger = useCallback(() => {
      console.log('log')
    }, []);*/

  return (
    <Provider value={data}>
      {/*<ConcurrentModeExample/>*/}
      {/*<FormComponent/>*/}
      {/*<BatchingExample/>*/}
      {/*<Form2PureComponent mail={data.mail} text={data.text}/>*/}
      {/*<Form2Component mail={data.mail} text={data.text} onLog={logger}/>*/}
      {/*<Form3ClassComponent text={data.text}/>*/}
      <Form3Component text={data.text}/>

      <button className="btn btn-warning"
              style={{margin: '50px auto', display: 'block', fontWeight: 'bold'}}
              onClick={() => setData({
                mail: 'zaplin.dev@gmail.com',
                /*mail: {
                  name: 'zaplin.dev@gmail.com',
                },*/
                text: 'Text me to speak about your project!',
                changeMail
              })}>
        Click Me
      </button>
    </Provider>
  );
}

export default App;