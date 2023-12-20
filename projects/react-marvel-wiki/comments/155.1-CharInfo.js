import { Component } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../src/services/MarvelService';

import Spinner from '../src/components/spinner/Spinner';
import ErrorMessage from '../src/components/errorMessage/ErrorMessage';
import Skeleton from '../src/components/skeleton/Skeleton';

import './charInfo.scss';

// ?[155.1] PropTypes

// * 1.0.0 Теперь, после установки одноимённого npm-пакета и импорта сущности PropTypes, мы можем брать пропсы компонента CharInfo и проверять пропсы, которые в него приходят. (скролл в конец кода) ↓
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

  onCharLoaded = (char) => this.setState({
    char,
    loading: false
  })

  onCharLoading = () => this.setState({
    loading: true
  })

  onError = () => this.setState({
    loading: false,
    error: true
  })

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
// 1.0.1 Перед экспортом запишем этот компонент, которому зададим статичное свойство propTypes и в него запишем объект, в котором свойством будет свойством название того пропа, что приходит (например charId), а значением будет его валидация (чем оно должно являться), а именно PropTypes.(то, что мы хотим проверять). Например нам нужно про верить, что charId должен быть числом. Но если мы поменяем например на string, то тут же получим предупреждение в консоли.
// ? 1.0.2 В документации можно посмотреть, что также можно проверить на булево значение, функции, массивы, объекты и символы. Но и это не всё, можно ещё много на что проверять, например на ноду или элемент. И даже на определённую структуру.
// ? 1.0.3 Отдельно стоит обратить внимание на "isRequired", который можно добавить к любому типу, чтобы показать предупреждение, если проп не был передан.
// ? 1.0.4 Есть также опция написать собственный валидатор, если понадобится.
CharInfo.propTypes = {
  charId: PropTypes.number
}

export default CharInfo;