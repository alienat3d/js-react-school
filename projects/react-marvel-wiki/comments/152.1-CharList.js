import { Component } from 'react';

import Spinner from '../src/components/spinner/Spinner';
import ErrorMessage from '../src/components/errorMessage/ErrorMessage';
import MarvelService from '../src/services/MarvelService';

import './charList.scss';

// ? [152.1]
// * 1.0.0 Нам нужно, чтобы по клику на одном из персонажей в списке — справа отобразилась вся информация о нём.
// 1.0.1 Разбираемся как это сделать: клик повесить на каждый элемент списка персонажей легко обработчиком onClick и тут же мы имеем доступ к разной информации, в том числе и к id персонажа. А также мы знаем, что по id мы можем загружать конкретного персонажа.
/* 1.0.2 Значит алгоритм такой:
  1) При клике на элемент списка с персонажем нам нужно вытащить его id;
  2) Передать его в компонент описания персонажа справа, чтобы тот загрузил все необходимые данные и отобразил их.
*/
// todo [переходим в app/App.js]
// * 1.0.6 Итак ниже в рендере у нас есть теги <li>, в которых вёрстка с персонажами. У каждого из них есть "item.id", которые извлекается из данных. Сюда мы и повесим обработчик события onClick, куда запишем анонимную коллбэк-функцию с методом onCharSelected, который аргументом будет принимать item.id.
// todo [переходим в charInfo/CharInfo.js]
class CharList extends Component {
  state = {
    charList: [],
    loading: true,
    error: false,
  }

  marvelService = new MarvelService();

  componentDidMount() {
    this.marvelService.getAllCharacters()
      .then(this.onCharListLoaded)
      .catch(this.onError)
  }

  onCharListLoaded = (charList) => {
    this.setState({
      charList,
      loading: false
    })
  }

  onError = () => this.setState({
    loading: false,
    error: true
  })

  // ? Этот метод создан для оптимизации, чтобы не помещать такую конструкцию в метод render.
  renderItems(arr) {
    const items = arr.map(item => {
      let imgStyle = { 'objectFit': 'cover' };
      if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = { 'objectFit': 'unset' };
      }

      return (
        <li
          className="char__item"
          key={item.id}
          onClick={() => this.props.onCharSelected(item.id)}>
          <img
            src={item.thumbnail}
            alt={item.name}
            style={imgStyle} />
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

  render() {

    const { charList, loading, error } = this.state;

    const items = this.renderItems(charList);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? items : null;

    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        {content}
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    )
  }
}

export default CharList;