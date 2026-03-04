import './App.css';
import Form2Component from './components/Form2Component';
import {useCallback, useState} from 'react';
import Form2PureComponent from './components/Form2PureComponent';
// import FormComponent from './components/FormComponent';
// import BatchingExample from './components/BatchingExample';
// import ConcurrentModeExample from './components/ConcurrentModeExample';

function App() {
  // 177.3 Тут у нас также есть стейт с какими-то данными, которые будут передаваться в Form2Component через пропсы, а также по клику на кнопке мы будем менять эти данные через запись нового стейта.
  const [data, setData] = useState({
    // 177.5.1 Рассмотрим подробнее, что имеется в виду. Например, у нас тут была бы вложенность
    /*mail: {
      name: 'John Doe',
    },*/
    // 177.6.1 Мы вернём стейт и передачу новых данных стейту к одноуровневому виду. И мы заметим, что PureComponent срабатывает, как и memo — дополнительных рендеров компонента при неизменных значениях стейта не происходит. Т.к. в PureComponent есть метод shouldComponentUpdate, который выполняет операции поверхностного сравнения пропсов самостоятельно. В отличие от memo, здесь также не будет рендеринга при тех же значениях стейта.
    // ? 177.7.0 Однако, если у нас будут в пропсах вложенные объекты, тогда нам нужно будет использовать кастомные сравнение при помощи метода shouldComponentUpdate (может попасться на собесах).
    // (Go to [/src/components/Form2Component.js])
    mail: 'name@example.com',
    text: 'Hello World!',
  });

  // 177.10.1 Решается эта проблема легко при помощи хука «useCallback», который позволяет сохранить функцию.
  const logger = useCallback(() => {
    console.log('log')
  }, []);

  // ? 177.4.0 Если мы ради теста будем передавать те же данные, что у нас были вначале в стейте, то у нас всё равно будет происходить ререндер компонента. Правильно, ведь объект с пропсами, вне зависимости, что в нём — с точки зрения JS это уже другой объект, ведь сравнение идёт по ссылкам, которые уникальны у каждого нового объекта, а не по содержанию. Однако в приложениях бывают компоненты, которые могут постоянно получать одинаковые значения в пропсы и каждый раз будут бессмысленно ререндериться. Это поведение мы можем оптимизировать с помощью метода Реакта «memo», который сохраняет (мемоизирует) комп. если у него не изменялись значения пропсов.
  // (Go to [/src/components/Form2Component.js])
  return (
    <>
      {/*<ConcurrentModeExample/>*/}
      {/*<FormComponent/>*/}
      {/*<BatchingExample/>*/}
      {/* 177.10.0 Ещё бывает так, что в пропсы приходит функция и с этим тоже может быть отдельная неприятность. Рассмотрим на примере, добавив ещё одним пропсом в компонент простую функцию, выводящую текст в консоль. А также вернём пропсы к более простому варианту для лучшей наглядности. И вот теперь у нас снова каждый раз срабатывает рендер компонента. Ведь дело в том, что эта функция создаётся каждый раз заново. ↑ */}
      <Form2Component mail={data.mail} text={data.text} onLog={logger}/>
      {/*<Form2PureComponent mail={data.mail} text={data.text}/>*/}

      <button className="btn btn-warning"
              style={{margin: '50px auto', display: 'block', fontWeight: 'bold'}}
              onClick={() => setData({
                mail: 'zaplin.dev@gmail.com',
                // 177.5.2 Здесь мы сохраняем также объект.
                // (Go to [/src/components/Form2Component.js])
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