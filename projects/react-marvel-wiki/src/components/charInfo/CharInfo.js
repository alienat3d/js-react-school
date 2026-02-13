import { Component } from 'react';
import PropTypes from 'prop-types';

import ComicVineService from '../../services/ComicVineService';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

class CharInfo extends Component {
  state = {
    char: null,
    loading: false,
    error: false
  }

  comicVineService = new ComicVineService();

  componentDidMount() {
    this.updateChar();
  }

  componentDidUpdate(prevProps) {
    if (this.props.charId !== prevProps.charId) this.updateChar();
  }

  updateChar = () => {
    const { charId } = this.props;
    if (!charId) return;

    this.onCharLoading();

    this.comicVineService
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
    loading: true,
    error: false
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
  const { name, deck, thumbnail, homepage, wiki, volume_credits } = char;

  /*let imgStyle = { 'objectPosition': 'center' };
  if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
    imgStyle = { 'objectPosition': 'left bottom' };
  } else if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif') {
    imgStyle = { 'objectPosition': 'right bottom' };
  }*/

  return (
    <>
      <div className="char__basics">
        {/*<img
          src={thumbnail}
          alt={name}
          style={imgStyle} />*/}
        <img src={thumbnail}
          alt={name} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a className="button button__main" href={homepage} target="_blank" rel="noreferrer">
              <div className="inner">homepage</div>
            </a>
            <a className="button button__secondary" href={wiki} target="_blank" rel="noreferrer">
              <div className="inner">wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{deck}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {volume_credits.length > 0 ? null : 'There is no comics with this character found in our database.'}
        {
          volume_credits.slice(0, 10).map((item, index) => {
            // eslint-disable-next-line array-callback-return
            // if (index > 9) return;
            return (
              <li className="char__comics-item"
                key={index}>
                <a href={item.site_detail_url} target="_blank" rel="noreferrer">{item.name}</a>
              </li>
            )
          })
        }
      </ul>
    </>
  )
}

CharInfo.propTypes = {
  charId: PropTypes.number
}

export default CharInfo;