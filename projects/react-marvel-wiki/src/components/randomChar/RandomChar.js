import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import useComicVineService from '../../services/ComicVineService';
import {useEffect, useState} from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const RandomChar = () => {
  const [char, setChar] = useState({});
  // 170.7.0 Эти стейты можем удалить, ведь теперь они у нас есть в хуке "http.hook", но извлечь мы их можем также из функции "ComicVineService". Ведь там мы их также импортировали и снова экспортировали.
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(false);
  const {loading, error, getRandomCharacter, clearError} = useComicVineService();

  // 170.7.1 А дальше мы удалим уже лишние/повторяющиеся функции для индикатора загрузки и ошибок, ведь они у нас есть теперь в хуке "http.hook" и контролируются оттуда.
  // (Go to [/src/components/charList/CharList.js])
  const onCharLoaded = (char) => {
    setChar(char);
    // setLoading(false);
  };
  /*  const onCharLoading = () => {
      setLoading(true);
      setError(false);
    };
    const onError = () => {
      setLoading(false);
      setError(true);
    };*/

  // 170.13 Для стабилизации функции updateCharacter убедимся, что происходит отлов ошибок после того, как количество попыток соединиться истратилось.
  // (Go to [/src/hooks/http.hook.js])
  const updateCharacter = () => {
    clearError();
    // const id = Math.floor(Math.random() * (196724 - 1) + 196724); // Old randomizer func for Marvel API, that we don't need anymore.
    // onCharLoading();
    // comicVineService.getRandomCharacter().then(onCharLoaded).catch(onError);
    getRandomCharacter()
      .then(onCharLoaded)
      .catch(error => console.error("RandomChar failed to load a character:", error));
  };

  useEffect(() => {
    updateCharacter();
    /*    const timerId = setInterval(updateCharacter, 60000);

        return () => {
          clearInterval(timerId);
        };*/
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading ? <Spinner/> : null;
  const content = !(loading || error) ? <View char={char}/> : null;

  return (
    <div className="randomchar">
      {errorMessage}
      {spinner}
      {content}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!<br/>
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">
          Or choose another one
        </p>
        <button className="button button__main" onClick={updateCharacter}>
          <div className="inner">try it</div>
        </button>
        <img className="randomchar__decoration" src={mjolnir} alt="A Mjolnir hammer"/>
      </div>
    </div>
  );
};

const View = ({char}) => {
  const {thumbnail, name, deck, homepage, wiki} = char;
  /*let imgStyle = { 'objectPosition': 'center' };
  if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
    imgStyle = { 'objectPosition': 'left bottom' };
  } else if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif') {
    imgStyle = { 'objectPosition': 'right bottom' };
  }*/

  return (
    <div className="randomchar__block">
      <img className="randomchar__img" src={thumbnail} alt="Random character"/>
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{deck ? `${deck.slice(0, 172)}...` : 'Description isn’t found...'}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main" target="_blank" rel="noreferrer">
            <div className="inner">Homepage</div>
          </a>
          <a href={wiki} className="button button__secondary" target="_blank" rel="noreferrer">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;