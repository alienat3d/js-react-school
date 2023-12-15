import { Component } from 'react';

import Spinner from '../src/components/spinner/Spinner';
import ErrorMessage from '../src/components/errorMessage/ErrorMessage';
import MarvelService from '../src/services/MarvelService';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

// ? [151.1]
// * 1.0.1 Вспомним ошибку в консоли, которая напоминала нам ещё вначале написания компонента RandomChar.js, о том, что делать сетевой запрос во время конструирования класса это плохая практика. Конкретно с сетевыми запросами может быть ещё несколько багов при таком подходе, кроме того, что мы уже заметили,что у нас выполняется 2 запроса, вместо 1.
// 1.0.2 Второй баг связан с возможной утечкой памяти, когда у нас например настроен setInterval() на компонент, который убирается со страницы, то не смотря на то, что он будет удалён, то запросы продолжают идти и чем больше раз он будет появляться и исчезать, тем больше будет идти запросов, пока приложение не зависнет. Это связано с тем, что нигде не используется clearInterval (остановка интервала) и он всё продолжает работать, даже не смотря на то, что компонент был удалён из вёрстки. Также, если в JS есть ссылка на какой-то объект, то он не исчезнет из памяти — сборщик мусора его не затронет. И вот в случае, когда интервал повешен на компонент, то каждый раз, когда он пересоздаётся — старый компонент также остаётся в памяти (на него есть ссылка, т.к. на нём работает интервал). Всё это колоссальная утечка памяти и этого нельзя допускать в приложении.
// ? 1.0.3 Встаёт вопрос — «А где же вызывать команду clearInterval, чтоб остановить интервал. И вот мы упираемся в обоих проблемах в то, что мы не знаем как наш компонент поведёт себя, когда появляется на странице: что у него вызывается и в каком порядке. Сейчас мы с этим разберёмся.
/*//*  1.0.4 Существует понятие «Жизненный Цикл Компонентов Реакт». В этом цикле есть 3 этапа: 
  1) Компонент появляется на странице; // todo [componentDidMount()]
  2) Компонент обновляется\перерендерится (в 2-ух случаях): 
    2.а) Если компонент получает свойство (new props);
    2.б) Если внутри него был изменён стейт (setState);
  // todo [componentDidUpdate()]
  3) Компонент удаляется со страницы. // todo [componentWillUnmount()]
  *) (Дополнительно, но не включено) Произошла ошибка. // todo [componentDidCatch()]
*/
// * 1.0.5 На каждом из перечисленных этапов мы можем вызвать определённые функции — «хуки жизненного цикла» (Life Cycle Hooks). Перечислены выше в []. Это не все хуки, но в 95% случаев используются они.
// ? [Подробнее можно увидеть на скриншотах 151.3-life-cycle-hooks.jpg] 
// 1.1.0 Для лучшего понимания можно провести следующий эксперимент: вставляем команду console.log() с подписью каждого из этапа жизненного цикла компонента. Также добавим 3 хука жизненных циклов, которые записываются как обычные функции.
// ? 1.1.1 Так почему же происходит 2 запроса к серверу? Потому, что когда на этапе constructor мы делаем запрос — нам ещё некуда было поместить эти данные, возможно даже стейт не был готов. Реакт видя всё это отправил второй запрос, чтобы адекватно получить данные и использовать их в методе render. Т.е. за счёт того, что у нас неправильно был расположен вызов в нашей сетевой функции — 2-ой этап сработал 2 раза и поэтому получаем 2 запроса и 2 ответа.
// ? 1.1.2 Если мы посмотрим на диаграмму на картинке, то увидим, что части каждого цикла разделены на 2 части: Render & Commit. И вот во второй части Commit, где и находятся хуки мы можем назначать обновления. И можно быстро смекнуть, что хук componentDidMount() — прекрасное место, чтобы вызывать какие-то сетевые функции и там же назначать инициализацию компонентов.
// 1.1.3 Чтобы в этом убедиться переместим наш сетевой метод updateCharacter() в хук componentDidMount.
// ? 1.3 constructor теперь оказывается бесполезным и мы можем от него избавиться.
class RandomChar extends Component {
  state = {
    char: {},
    loading: true,
    error: false,
  }

  marvelService = new MarvelService();

  onCharLoaded = (char) => {
    // console.log('update');
    this.setState({
      char,
      loading: false
    })
  }
  // todo 1.1.4 /!\ Из этого примера мы видим, что любые обновления, запросы к API и серверам нужно делать из componentDidMount, а не из constructor.
  componentDidMount() {
    // console.log('mount');
    this.updateCharacter();
    // this.timerId = setInterval(this.updateCharacter, 15000);
  };
  
  /* componentDidUpdate() {
    console.log('2.3 componentDidUpdate');
  }; */
  
  // * 1.2 Теперь к примеру с setInterval(), из всего вышесказанного становится понятно, что clearInterval нам нужно помещать в хук на этапе удаления компонента — "componentWillUnmount".
  // todo /!\ Нужно помнить всегда выполнять отписку от повторяющихся действий.
  // todo Ещё ремарка: Если где-то в реакте мы назначили обработчик события при помощи addEventListener, то его потом необходимо и удалять при помощи removeEventListener.
  componentWillUnmount() {
    // console.log('unmount');
    clearInterval(this.timerId);
  };

  onError = () => this.setState({
    loading: false,
    error: true
  })

  updateCharacter = () => {
    const id = Math.floor(Math.random() * (1011428 - 1011100) + 1011100);
    // const id = 1011428; // увеличивать ✓
    // const id = 1011100; // уменьшать
    this.marvelService
      .getCharacter(id)
      .then(this.onCharLoaded)
      .catch(this.onError);
  }

  render() {
    // console.log('render');
    const { char, loading, error } = this.state;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <View char={char} /> : null;

    return (
      <div className="randomchar">
        {errorMessage}
        {spinner}
        {content}
        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!<br />
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">
            Or choose another one
          </p>
          <button className="button button__main">
            <div className="inner">try it</div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    )
  }
}

const View = ({ char }) => {
  const { thumbnail, name, description, homepage, wiki } = char;

  return (
    <div className="randomchar__block">
      <img src={thumbnail} alt="Random character" className="randomchar__img" />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">Homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default RandomChar;