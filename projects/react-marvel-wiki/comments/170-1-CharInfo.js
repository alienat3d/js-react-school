import './charInfo.scss';
import PropTypes from 'prop-types';
import useComicVineService from '../../services/ComicVineService';
import {useEffect, useState} from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

// 170.15

const CharInfo = (props) => {
  // const comicVineService = ComicVineService();
  const {loading, error, getCharacter, clearError} = useComicVineService();

  const [char, setChar] = useState(null);
/*  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);*/
/*  const onCharLoading = () => {
    setLoading(true);
    setError(false);
  };*/
  /*  const onError = () => {
    setLoading(false);
    setError(true);
  };*/

  const onCharLoaded = (char) => {
    setChar(char);
    // setLoading(false);
  };

  const updateChar = () => {
    const {charId} = props;
    if (!charId) return;
    // onCharLoading();
    // comicVineService.getCharacter(charId).then(onCharLoaded).catch(onError);
    clearError();
    getCharacter(charId).then(onCharLoaded);
  };

  useEffect(() => updateChar(), [props.charId]);

  const skeleton = char || loading || error ? null : <Skeleton/>;
  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading ? <Spinner/> : null;
  const content = !(loading || error || !char) ? <View char={char}/> : null;

  return (
    <div className="char__info">
      {skeleton}
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};

const View = ({char}) => {
  /*let imgStyle = { 'objectPosition': 'center' };
  if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
    imgStyle = { 'objectPosition': 'left bottom' };
  } else if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif') {
    imgStyle = { 'objectPosition': 'right bottom' };
  }*/
  const {name, deck, thumbnail, homepage, wiki, issue_credits} = char;

  return (
    <>
      <div className="char__basics">
        {/*<img
          src={thumbnail}
          alt={name}
          style={imgStyle} />*/}
        <img src={thumbnail} alt={name}/>
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
        {issue_credits.length > 0 ? null : 'There is no comics with this character found in our database.'}
        {
          issue_credits.slice(0, 10).map((item, index) => {
            // eslint-disable-next-line array-callback-return
            // if (index > 9) return;
            return (
              <li className="char__comics-item"
                  key={index}>
                <a href={item.site_detail_url} target="_blank" rel="noreferrer">
                  {item.name || `Issue #${item.issue_number}`} {/* Fallback if name is missing */}
                </a>
              </li>
            );
          })
        }
      </ul>
    </>
  );
};

CharInfo.propTypes = {
  charId: PropTypes.number
};

export default CharInfo;