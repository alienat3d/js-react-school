import {useState, useEffect} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';

/* 180.11.0 Теперь несколько правил, когда стоит создавать хоки, а когда нет.
* Когда не стоит создавать:
* 1) В компоненте "withSlider" мы передали аж 4 пропса компоненту BaseComponent, иногда их может быть намного больше. И вот, когда кол-во передаваемых пропсов сильно разрастается, то и смысла в хоке особенно нет. Например, в проекте «Comic Wiki» изначально может показаться, что логику компонентов ComicsList & CharList можно объединить в одном хоке, но если присмотреться, то там у нас будет слишком длинный список передаваемых пропсов, поэтому оно того не стоило — компоненты всё-таки слишком разные, несмотря на похожую структуру, для создания хока. Итак, правило №1 "Чем больше передаваемых пропсов через хок — тем меньше в нём смысл";
* 2) Если в проекте имеется лишь один компонент, подходящий под хок, то и нет смысла тратить время на вынесение логики в хок;
* 3) Если нам нужно каждый раз модифицировать компонент высшего порядка, когда подключаем новый компонент, то это плохая практика и лучше отказаться от такого хока.
* */
/* 180.11.1 Когда стоит создавать HOC:
* 1) Поведение в таком компоненте подходит многим компонентам в проекте, где они находятся (особенно это касается второй рассмотренной здесь цели хока — добавление функционала к готовому компоненту);
* 2) Когда мы знаем, что разрастания кол-ва пропсов не предвидится;
* 3) Когда нужно добавить какую-то общую логику для множества компонентов в проекте (это могут быть самые разные задачи вроде логирования, отправление метрик, статистики при загрузке и др. подобные универсальные для разных компонентов задачи).
*  */

// 180.5.0 Приступим к созданию HOC withSlider. Во-первых, заметим, что есть негласное соглашение у разработчиков называть хоки со слова "with". Во-вторых, функция будет принимать два параметра: BaseComponent (собственно компонент) и getData (сюда будет приходить либо одно, либо другая функция для использования внутри хука useEffect).
const withSlider = (BaseComponent, getData) => {
  // 180.5.1 Далее, здесь у нас будет возвращаться другая функция, которая примет пропсы. На самом деле это функциональный компонент, который использует другие вещи. И как компонент он должен мочь принимать пропсы. А ещё он должен уметь делать всё то же, что делал компонент слайдера.
  return (props) => {
    const [slide, setSlide] = useState(0);
    const [autoplay, setAutoplay] = useState(false);

    // 180.5.2 Логика двух компонентов слайдера отличается только функцией, которая передаётся в useEffect, поэтому здесь в setSlide мы передаём параметр "getData". ↓
    useEffect(() => {
      // setSlide(getDataFromSecondFetch());
      setSlide(getData());
    }, []);

    function changeSlide(i) {
      setSlide(slide => slide + i);
    }

    // 180.5.3 Здесь мы будем возвращать компонент, а в него передадим все необходимые стейты и методы в пропсах.
    // 180.6 Также в этой возвращаемой хоком функции были пропсы. Их тоже надо не забыть передать в BaseComponent при помощи развёртывания spread-оператором. ↓
    return <BaseComponent {...props}
                          slide={slide}
                          autoplay={autoplay}
                          setAutoplay={setAutoplay}
                          changeSlide={changeSlide} />;
  };
};

const getDataFromFirstFetch = () => {
  return 10;
};
const getDataFromSecondFetch = () => {
  return 20;
};

// 180.4.2 Вы можете спросить, «А почему бы обе эти функции сверху не передавать в компонент слайдера как пропсы?». И это действительно можно было реализовать таким образом, если бы у нас возвращалась одна и та же вёрстка, но у этих двух компонентов слайдера и вёрстка немного отличается. Поэтому здесь гораздо лучше подойдёт «хок» — компонент высшего порядка. Здесь у нас функциональные компоненты, но с ними всё работает точно также, как и с классовыми (но, как мы помним в классовых компонентах вместо хуков используются методы жизненного цикла компонента). ↑
// 180.9.1 Здесь мы вставим этот пропс "name" в заголовок. ↓
const SliderFirst = (props) => {
// Т.к. мы перенесли всю логику в HOC, то в обоих компонентах её теперь можно удалить. Они превратятся в просто возвращающие вёрстку компоненты. Однако нам нужно добавить пропсы, чтобы их использовать при формировании в вёрстки.
/*  const [slide, setSlide] = useState(0);

  useEffect(() => {
    setSlide(getDataFromFirstFetch());
  }, []);

  function changeSlide(i) {
    setSlide(slide => slide + i);
  }*/

  return (
    <Container>
      <div className="slider w-50 m-auto my-5">
        <h1 className="text-center">{props.name}</h1>
        <img className="d-block w-100" src="/assets/img/10.webp" alt="slide"/>
        <div className="text-center mt-5">Active slide {props.slide}</div>
        <div className="buttons mt-3 d-flex justify-content-center">
          <button
            className="btn btn-primary me-2"
            onClick={() => props.changeSlide(-1)}>-1
          </button>
          <button
            className="btn btn-primary me-2"
            onClick={() => props.changeSlide(1)}>+1
          </button>
        </div>
      </div>
    </Container>
  );
};

const SliderSecond = (props) => {
/*  const [slide, setSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(false);

  useEffect(() => {
    setSlide(getDataFromSecondFetch());
  }, []);

  function changeSlide(i) {
    setSlide(slide => slide + i);
  }*/

  return (
    <Container>
      <div className="slider w-50 m-auto my-5">
        <h2 className="text-center">{props.name}</h2>
        <img className="d-block w-100" src="/assets/img/11.webp" alt="slide"/>
        <div className="text-center mt-5">Active slide {props.slide} <br/>{props.autoplay ? 'auto' : null} </div>
        <div className="buttons mt-3 d-flex justify-content-center">
          <button
            className="btn btn-primary me-2"
            onClick={() => props.changeSlide(-1)}>-1
          </button>
          <button
            className="btn btn-primary me-2"
            onClick={() => props.changeSlide(1)}>+1
          </button>
          <button
            className="btn btn-primary me-2"
            onClick={() => props.setAutoplay(autoplay => !autoplay)}>toggle autoplay
          </button>
        </div>
      </div>
    </Container>
  );
};

// 180.7.0 Теперь, когда мы создали HOC, то время начать его использовать. Чтобы взять один из слайдеров и добавить ему логику мы должны вызвать этот компонент вместе с нашим HOC следующим образом: создадим новую переменную, в которой будет лежать компонент. Затем ей присваиваем вызов нашего HOC'а, а в него первым аргументом мы поместим компонент, в который мы хотим добавить логику из HOC'а. Вторым аргументом будут добавляться функции, которые отличались между двумя компонентами слайдеров.
// 180.7.1 Также мы вызовем хок и для второго слайдера, подставив нужный компонент и функцию для него.
// ? 180.8 И вот, таким образом мы можем сохранять в хоках логику для похожих компонентов с разными данными и немного отличающейся вёрсткой, существенно сокращая кодовую базу и оптимизируя приложение.
const SliderWithFirstFetch = withSlider(SliderFirst, getDataFromFirstFetch);
const SliderWithSecondFetch = withSlider(SliderSecond, getDataFromSecondFetch);

// 180.10.0 Но помимо выноса одинаковой логики компонентов хоки могут помочь и добавлять какую-то логику к уже готовым компонентам. И если в предыдущем варианте мы подстраивали хок под определённую структуру, то в этом варианте нам может приходить любой компонент. Для примера опишем простой компонент. Просто, чтобы понять механику работы. Допустим, нам поступила задача добавить к этому компоненту добавить какое-то дополнительное поведение, не трогая его внутренности. Создадим ещё один хок "withLogger", у которого есть параметр WrappedComponent (оборачиваемый в новую логику компонент), далее мы возвращаем ещё одну стрелочную функцию, принимающую пропсы. В сущности, это просто более сокращённая запись той же функции хока, но без слова return, что мы описывали выше.
// 180.10.3 Теперь любой компонент, обёрнутый в хок withLogger будет получать useEffect, запускающий метод console.log в момент первого рендера этого компонента. ↓
const withLogger = (WrappedComponent) => (props) => {
  // 180.10.2 А также здесь мы можем здесь добавить какое-то доп. поведение при помощи хука useEffect.
  useEffect(() => {
    console.log('First render happened');
  }, [])

  // 180.10.1 Здесь мы вернём этот компонент, добавив в него пропсы.
  return <WrappedComponent {...props} />;
}

const TitleComponent = (props) => {
  return <p className="text-center display-4">{props.title}</p>;
}

// 180.10.4 Обернём наш тестовый TitleComponent, чтобы протестировать работу хока. ↑
const TitleComponentWithLogger = withLogger(TitleComponent);

// 180.9.0 Мы также можем передавать в каждый из таких компонентов пропсы, как в обычные компоненты. ↑
function AppHOC() {
  return (
    <>
      {/*<SliderFirst/>*/}
      {/*<SliderSecond/>*/}
      <TitleComponentWithLogger title='Hello!'/>
      <SliderWithFirstFetch name='The beautiful Eiffel Tower' />
      <hr/>
      <SliderWithSecondFetch name='Another Eiffel Tower slider' />
    </>
  );
}

export default AppHOC;