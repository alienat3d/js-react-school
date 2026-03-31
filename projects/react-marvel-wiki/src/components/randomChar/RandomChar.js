import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {CSSTransition, SwitchTransition} from 'react-transition-group';

import useComicVineService from '../../services/ComicVineService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
// import setContent from '../../utils/setContent';

const RandomChar = () => {
  const [char, setChar] = useState(null);
  const {processState, setProcessState, getRandomCharacter, clearError} = useComicVineService();

  const onCharLoaded = char => setChar(char);

  const updateCharacter = () => {
    clearError();

    getRandomCharacter()
      .then(onCharLoaded)
      .then(() => setProcessState('SUCCESS'))
      .catch(error => console.error('RandomChar failed to load a character:', error));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => updateCharacter(), []);

  return (
    <div className="randomchar">
      {/*{setContent(processState, View, {data: char})}*/}
      {/* LEFT BLOCK (animated) */}
      <div className="randomchar__dynamic">
        {processState === 'ERROR' && <ErrorMessage/>}
        {processState === 'LOADING' && <Spinner/>}
        {processState === 'SUCCESS' && char && (
          <SwitchTransition mode="out-in">
            <CSSTransition key={char.id}
                           timeout={400}
                           classNames="fade-random"
                           appear
            >
              <View data={char}/>
            </CSSTransition>
          </SwitchTransition>
        )}
      </div>
      {/* RIGHT BLOCK (static) */}
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
      <img className="randomchar__img" src={thumbnail} alt={name}/>
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