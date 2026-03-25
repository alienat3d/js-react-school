import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import useComicVineService from '../../services/ComicVineService';
import setContent from '../../utils/setContent';
// import Spinner from '../spinner/Spinner';
// import ErrorMessage from '../errorMessage/ErrorMessage';

const RandomChar = () => {
  const [char, setChar] = useState({});
  const {processState, setProcessState, getRandomCharacter, clearError} = useComicVineService();

  const onCharLoaded = char => setChar(char);

  const updateCharacter = () => {
    clearError();
    getRandomCharacter()
      .then(onCharLoaded)
      .then(() => setProcessState('SUCCESS'))
      .catch(error => console.error('RandomChar failed to load a character:', error));
  };

  useEffect(() => {
    updateCharacter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 187.9 Здесь у нас была та же конструкция, которую нам бы хотелось заменить на новую со стейт-машиной. Этот компонент простой и у него стандартная логика, аналогичная CharInfo.
  // (Go to [/src/components/singlePage/SinglePage.js])
  /*  const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? <View char={char}/> : null;*/

  return (
    <div className="randomchar">
      {/*      {errorMessage}
      {spinner}
      {content}*/}
      {setContent(processState, View, {data: char})}
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

const View = ({data}) => {
  const {thumbnail, name, deck, id, wiki} = data;

  return (
    <div className="randomchar__block">
      <img className="randomchar__img" src={thumbnail} alt="Random character"/>
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{deck ? `${deck.slice(0, 172)}...` : 'Description isn’t found...'}</p>
        <div className="randomchar__btns">
          <Link to={`./characters/${id}`} className="button button__main" target="_blank" rel="noreferrer">
            <div className="inner">Homepage</div>
          </Link>
          <a href={wiki} className="button button__secondary" target="_blank" rel="noreferrer">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;