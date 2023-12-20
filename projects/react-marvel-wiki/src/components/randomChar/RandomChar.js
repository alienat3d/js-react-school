import { Component } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {
  state = {
    char: {},
    loading: true,
    error: false,
  }

  marvelService = new MarvelService();

  componentDidMount() {
    this.updateCharacter();
    // this.timerId = setInterval(this.updateCharacter, 15000);
  };

  // componentWillUnmount() {
  //   clearInterval(this.timerId);
  // };

  onCharLoaded = (char) => this.setState({
    char,
    loading: false
  })

  onCharLoading = () => this.setState({ loading: true })

  onError = () => this.setState({
    loading: false,
    error: true
  })

  updateCharacter = () => {
    const id = Math.floor(Math.random() * (1011428 - 1010669) + 1010669);
    this.onCharLoading();
    this.marvelService
      .getCharacter(id)
      .then(this.onCharLoaded)
      .catch(this.onError);
  }

  render() {
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
          <button
            className="button button__main"
            onClick={this.updateCharacter}>
            <div className="inner">try it</div>
          </button>
          <img
            src={mjolnir}
            alt="A Mjolnir hammer"
            className="randomchar__decoration" />
        </div>
      </div>
    )
  }
}

const View = ({ char }) => {
  const { thumbnail, name, description, homepage, wiki } = char;
  let imgStyle = { 'objectPosition': 'center' };
  if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
    imgStyle = { 'objectPosition': 'left bottom' };
  } else if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif') {
    imgStyle = { 'objectPosition': 'right bottom' };
  }

  return (
    <div className="randomchar__block">
      <img src={thumbnail}
        alt="Random character"
        className="randomchar__img"
        style={imgStyle} />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{`${description.slice(0, 172)}...`}</p>
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