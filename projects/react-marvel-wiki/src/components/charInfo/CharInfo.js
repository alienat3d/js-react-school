import './charInfo.scss';
import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import useComicVineService from '../../services/ComicVineService';
import setContent from '../../utils/setContent';

const CharInfo = (props) => {
  const {processState, setProcessState, getCharacter, clearError} = useComicVineService();
  const [char, setChar] = useState(null);
  const [visibleComics, setVisibleComics] = useState(10);

  const onCharLoaded = char => setChar(char);

  const updateChar = () => {
    const {charId} = props;
    if (!charId) return;
    clearError();
    getCharacter(charId)
      .then(onCharLoaded)
      .then(() => setProcessState('SUCCESS'));
  };

  const showMoreComics = () => setVisibleComics(prevValue => prevValue + 10);

  useEffect(() => {
    updateChar();
    setVisibleComics(10);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.charId]);

  return (
    <div className="char__info">
      {setContent(processState, View, {data: char, visibleComics, showMoreComics})}
    </div>
  );
};

const View = ({data, visibleComics, showMoreComics}) => {
  const {thumbnail, name, id, deck, wiki, issue_credits} = data;

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name}/>
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <Link className="button button__main" to={`./characters/${id}`} target="_blank" rel="noreferrer">
              <div className="inner">homepage</div>
            </Link>
            <a className="button button__secondary" href={wiki} target="_blank" rel="noreferrer">
              <div className="inner">wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{deck}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {issue_credits.length > 0 ? null : 'There is no comics with this character found in our database.'}
        {issue_credits.slice(0, visibleComics).map((item, index) => {
          return (
            <li className="char__comics-item" key={index}>
              <Link to={`/comics/${item.id}`} state={{from: '/'}}>
                {item.name || `Issue #${item.issue_number}`}
              </Link>
            </li>
          );
        })}
      </ul>
      {issue_credits.length > visibleComics && (
        <button
          className="char__comics-btn button button__main button__long"
          onClick={showMoreComics}
        >
          <div className="inner">show more</div>
        </button>
      )}
    </>
  );
};

CharInfo.propTypes = {
  charId: PropTypes.number
};

export default CharInfo;