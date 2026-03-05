import './App.css';
import {useState} from 'react';
// import {useCallback} from 'react';
// import Form3ClassComponent from './components/Form3ClassComponent';
// 178.5.2 Здесь мы будем импортировать контекст из файла [DataContext.js].
// (Go to [/src/components/ClassInputComponent.js])
import {DataContext} from './components/DataContext';
import Form3Component from './components/Form3Component';

// import Form2Component from './components/Form2Component';
// import Form2PureComponent from './components/Form2PureComponent';
// import FormComponent from './components/FormComponent';
// import BatchingExample from './components/BatchingExample';
// import ConcurrentModeExample from './components/ConcurrentModeExample';

// 178.3.0 Чтобы добавить в приложение Реакт-контекст нужно вызвать спец. метод createContext, который принимает один аргумент в виде начального значения и мы поместим туда наш объект с данными из стейта.
/*const dataContext = createContext({
    mail: 'name@example.com',
    text: 'Hello World!',
  });*/

// 178.3.1 Затем мы вытащим две сущности "Provider" & "Consumer", которые нам понадобятся для использования контекста. "Provider" это то, что будет передавать эти данные в dataContext остальным компонентам. Также не забудем экспортировать его, т.к. Consumer нужно будет импортировать в каждом дочернем компоненте, где мы его будем использовать. ↓
// export const {Provider, Consumer} = dataContext;

const {Provider} = DataContext;

function App() {
  const [data, setData] = useState({
    /*mail: {
      name: 'John Doe',
    },*/
    mail: 'name@example.com',
    text: 'Hello World!',
    // 178.8.1 Здесь нам нужно также разместить ссылку на эту функцию.
    // (Go to [/src/components/InputComponent.js])
    changeMail: changeMail
  });

  // 178.8.0 А можно ли изменять данные контекста? Да, мы можем модифицировать наш контекст, чтобы также изменять данные в нём. Рассмотрим на примере функции, которая будет изменять email. Однако помним, что нам нужно правильно указывать стейт, т.к. если мы запишем только связку ключ-значение для ключа "mail", то у нас исчезнет "text", т.к. метод setState перезапишет то, что было тем, что мы в него передадим. Поэтому важно сначала передать spread-оператор, которые передаст предыдущее значение стейта, а потом ключ-свойство на замену. ↑
  function changeMail() {
    setData({...data, mail: 'contact@zapl.in',});
  }

  /*  const logger = useCallback(() => {
      console.log('log')
    }, []);*/

  // 178.3.2 "Provider" мы сделаем обёрткой всем компонентам. У него есть проп value, в который и передаются данные. Далее при помощи Consumer мы будем получать эти данные внутри. Но тут важно помнить, что все "потребители" этих данных, которые являются дочерними компонентами Provider, будут ререндериться, как только данные в пропе "value" изменятся.
  // 178.10 Что ещё следует помнить, что лучше не передавать в атрибут Provider "value" прямые объекты вида "<Provider value={{somekey: 'somevalue'}}, т.к. такая запись может привести к некоторым проблемам с оптимизацией, т.к. если Provider будет заново рендериться, то также произойдёт ререндер всех компонентов, подписанных на этот контекст, т.к. в value заново создаётся объект, который неравен предыдущему.
  return (
    <>
      {/*<Provider value={data}>*/}
      {/*<ConcurrentModeExample/>*/}
      {/*<FormComponent/>*/}
      {/*<BatchingExample/>*/}
      {/*<Form2PureComponent mail={data.mail} text={data.text}/>*/}
      {/*<Form2Component mail={data.mail} text={data.text} onLog={logger}/>*/}
      {/* 178.3.3 Здесь мы можем уже удалить проп "mail", т.к. его мы будем передавать в ClassInputComponent при помощи Consumer. */}
      {/* (Go to [/src/components/ClassInputComponent.js]) */}
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
      {/*</Provider>*/}
    </>
  );
}

export default App;