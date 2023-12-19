import { Component } from 'react';

import MarvelService from '../src/services/MarvelService';

import Spinner from '../src/components/spinner/Spinner';
import ErrorMessage from '../src/components/errorMessage/ErrorMessage';
import Skeleton from '../src/components/skeleton/Skeleton';

import './charInfo.scss';

// ?[153.1]
// * 1.0.0 Итак, мы представим, что у нас закралась какая-то ошибка в этом компоненте и нам нужно её обработать, чтобы пользователю был показан не пустая страница. Здесь нам поможет хук, который срабатывает в самом конце жизненного цикла componentDidCatch. ↓
class CharInfo extends Component {

  state = {
    char: null,
    loading: false,
    error: false
  }

  marvelService = new MarvelService();

  componentDidMount() {
    this.updateChar();
  }

  componentDidUpdate(prevProps) {
    if (this.props.charId !== prevProps.charId) {
      this.updateChar();
    }
  }
  // * 1.0.1 Хук componentDidCatch принимает два аргумента ошибку и информацию о компоненте, в котором произошла ошибка. И подставим сюда тоже, что у нас было в методе onError, только не будем трогать loading.
  // 1.0.2 Перенесём этот хук в отдельный компонент ErrorBoundaries.
  // todo перейдём в [projects\react-marvel-wiki\src\components\errorBoundary\ErrorBoundary.js]
  /*   componentDidCatch(err, info) {
      console.log(err, info);
      this.setState({ error: true });
    } */

  updateChar = () => {
    const { charId } = this.props;
    if (!charId) {
      return;
    }

    this.onCharLoading();

    this.marvelService
      .getCharacter(charId)
      .then(this.onCharLoaded)
      .catch(this.onError);

    // this.foo.bar = 0; - для теста предохранителей для ошибок
  }

  onCharLoaded = (char) => {
    this.setState({
      char,
      loading: false
    })
  }

  onCharLoading = () => {
    this.setState({
      loading: true
    })
  }

  onError = () => {
    this.setState({
      loading: false,
      error: true
    })
  }

  render() {
    const { char, loading, error } = this.state;

    const skeleton = char || loading || error ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
      <div className="char__info">
        {skeleton}
        {errorMessage}
        {spinner}
        {content}
      </div>
    )
  }
}

const View = ({ char }) => {
  const { thumbnail, name, description, homepage, wiki, comics } = char;

  let imgStyle = { 'objectPosition': 'center' };
  if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
    imgStyle = { 'objectPosition': 'left bottom' };
  } else if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif') {
    imgStyle = { 'objectPosition': 'right bottom' };
  }

  return (
    <>
      <div className="char__basics">
        <img
          src={thumbnail}
          alt={name}
          style={imgStyle} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length > 0 ? null : 'There is no comics with this character found in our database.'}
        {
          comics.map((item, index) => {
            // eslint-disable-next-line
            if (index > 9) return;
            return (
              <li
                className="char__comics-item"
                key={index}>
                {item.name}
              </li>
            )
          })
        }
      </ul>
    </>
  )
}

export default CharInfo;