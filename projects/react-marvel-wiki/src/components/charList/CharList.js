import { Component } from 'react';

import MarvelService from '../../services/MarvelService';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

// ? [154.1] Пагинация данных - дозагрузка персонажей

/* //* 1.0.0 Проговорим алгоритм реализации дозагрузки персонажей:

  1. Итак, есть кнопка "load more" и по клике на неё должен уходить запрос на сервер, для получения очередных 9-ти персонажей. Т.е. в запросе на сервер метода getAllCharacters(), а именно в его части "offset" нужно указать другую цифру. Это отступ количества персонажей от начала списка;
  2. Когда мы получаем ответ на этот запрос, то новые данные, которые мы получим необходимо объединить со старыми в стейте charList;
  3. Отрендерить интерфейс приложения. (т.к. атрибут key устанавливается по реально уникальному id, то обновиться должны лишь новые элементы)
*/
// todo переходим в [projects\react-marvel-wiki\src\services\MarvelService.js]
// 1.1.1 По хорошему надо разделить loading стейты на обычный (при первичной загрузке) и мы добавим ещё один newItemLoading для загрузки новых элементов. ↓

// * 1.2.0 Теперь у нас стоит задача вызывать метод onRequest каждый раз, когда пользователь кликнет на кнопку "load more". И нам нужно каждый раз сделать запрос с offset на 9 элементов ниже по списку, а именно этот offset увеличивать на 9.
// ? 1.2.1 Как вариант, можно было прямо в MarvelService увеличивать значение переменной _baseOffset каждый раз, когда делается запрос. Но в таком случае у нас будет загрязняться экземпляр объекта, добавляться к нему ненужное действие. Т.к. этот стейт локальный, который существует только в CharList, поэтому логичнее будет, если именно CharList будет отвечать за увеличение offset.
// 1.2.2 Итак для этого в стейте создадим ещё одно состояние offset. ↓
class CharList extends Component {
  state = {
    charList: [],
    loading: true,
    newItemLoading: false,
    error: false,
    offset: 0
  }

  marvelService = new MarvelService();

  componentDidMount() {
    this.onRequest();
  }
  // * 1.0.2 Выделим отдельный метод onRequest с запросом, который будет посылать на сервер запрос, когда пользователь кликнул на кнопку "load more". И т.к. сверху код такой же, отличается лишь тем, что в него не передаётся аргумент, то сократим его вызвав onRequest().
  // * 1.1.0 Также, во время загрузки новых персонажей, нам нужно как-то оповестить пользователя, что они загружаются. Можно либо создать какой-то спиннер, либо заблокировать кнопку, добавив disabled и изменить её стили. Пока в стейт loading: true, то ставим кнопке disabled. Это важно делать, чтобы пользователь от нетерпения не смог накликать много раз эту кнопку, пока загружается новая пачка персонажей. Деактивированная кнопка просто не будет реагировать на щелчки. ↑
  onRequest = (offset) => {
    this.onCharListLoading();

    this.marvelService.getAllCharacters(offset)
      .then(this.onCharListLoaded)
      .catch(this.onError)
  }

  // 1.1.2 Добавим ещё один метод, который будет оповещать о том, что у нас пошла загрузка, устанавливая стейт newItemLoading в true. И его мы вызовем выше в onRequest перед запросом на сервер.
  onCharListLoading = () => this.setState({
    newItemLoading: true
  })
  // 1.1.3 Также, всегда, когда персонажи загрузились нам нужно этот стейт загрузки переключать в false.
  // 1.1.4 Теперь, когда новые данные пришли, мы их не просто перезаписываем, а добавляем к уже существующим, т.е. у нас становится не 9, а 18 персонажей на странице. И здесь, мы можем дописать, что charList будет формироваться из двух сущностей: 1) предыдущие 9 персонажей и 2) ещё 9 новых, что были только что загружены. (Дальше соответственно будет 18 + 9, 27 + 9 и т.д.). Создадим массив, чтобы производить уже с ним какие-то манипуляции. Но теперь здесь нам уже нужен такой стейт, который зависит от предыдущего значения, а значит преобразуем его в коллбэк-функцию.
  // ? Напоминание такой синтаксис () => ({}) означает, что мы вернём объект из этой функции.
  // 1.1.4 Также поместим и деструктурируем объект стейта charList. Теперь, чтобы сформировать новый список персонажей, мы берём старый charList со spread-оператором (мы его разворачиваем) и дальше через запятую добавляем новые элементы, которые пришли у нас с сервера (а новые элементы у нас приходят аргументом в функцию onCharListLoaded, т.к. выше он вызывается в then() и получает массив с загруженными персонажами). А дальше разворачиваем его после запятой, тем самым образуя единый массив, старых и новых персонажей.
  /* //* 1.1.5 И ещё раз краткое изложение логики, которую мы тут написали:  
    1) У нас есть отдельный метод onRequest, который отвечает за запрос на сервер, первый раз он вызывается при загрузке сайта, когда срабатывает хук componentDidMount, т.е. компонент отрендерился впервые (без аргумента, чтобы он ориентировался на базовое значение offset);
    2) Когда он запустился, то срабатывает метод onCharListLoading, который переключит стейт newItemLoading в true (оно нам нужно для оповещения пользователя о загрузке и временной деактивации кнопки);
    3) Когда получаем персонажей с сервера методом getAllCharacters, мы также в then() запускаем onCharListLoaded, который получит в себя новые данные;
    4) Из этих данных сформируется новый стейт, из которого в свою очередь сформируется вёрстка карточек с персонажами.
  */
  // 1.2.2 Теперь в методе, отвечающем за успешную загрузку добавим текущий стейт offset и ниже запишем стейт отступа offset, к которому прибавим 9. ↓
  onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }

    this.setState(({ offset, charList }) => ({
      charList: [...charList, ...newCharList],
      loading: false,
      newItemLoading: false,
      offset: offset + 9
    }))
  }

  onError = () => this.setState({
    error: true,
    loading: false
  })

  // Этот метод создан для оптимизации, 
  // чтобы не помещать такую конструкцию в метод render
  renderItems(arr) {
    const items = arr.map((item) => {
      let imgStyle = { 'objectFit': 'cover' };
      if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = { 'objectFit': 'unset' };
      }

      return (
        <li
          className="char__item"
          key={item.id}
          onClick={() => this.props.onCharSelected(item.id)}>
          <img src={item.thumbnail} alt={item.name} style={imgStyle} />
          <div className="char__name">{item.name}</div>
        </li>
      )
    });
    // А эта конструкция вынесена для центровки спиннера/ошибки
    return (
      <ul className="char__grid">
        {items}
      </ul>
    )
  }
  // 1.2.3 Найдём кнопку загрузки и добавим ей обработчик события onClick, в который поместим метод onRequest, а также атрибут disabled, который будем устанавливать в зависимости от стейта newItemLoading. Когда true - будет присутствовать, а если false, то отсутствовать.
  // ? 1.2.4 В обработчик события onClick мы поместим безымянную стрелочную функцию, чтобы мы могли передать туда аргумент. А аргументом у нас будет текущий стейт offset.
  render() {

    const { charList, loading, error, newItemLoading, offset } = this.state;

    const items = this.renderItems(charList);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? items : null;

    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        {content}
        <button
          className="button button__main button__long"
          disabled={newItemLoading}
          onClick={() => this.onRequest(offset)}>
          <div className="inner">load more</div>
        </button>
      </div>
    )
  }
}

export default CharList;