import './charInfo.scss';
import PropTypes from 'prop-types';
import useComicVineService from '../../services/ComicVineService';
import {useEffect, useState} from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

// 170.16.0 Здесь мы поработаем над функционалом, который будет показывать оставшиеся комиксы в списке (если таковые имеются) по нажатию на кнопку. Для этого нам нужно создать отдельный стейт, который будет держать кол-во комиксов отображаемых на странице.
const CharInfo = (props) => {
  const {loading, error, getCharacter, clearError} = useComicVineService();
  const [char, setChar] = useState(null);
  const [visibleComics, setVisibleComics] = useState(10);

  const onCharLoaded = char => setChar(char);

  const updateChar = () => {
    const {charId} = props;
    if (!charId) return;
    clearError();
    getCharacter(charId).then(onCharLoaded);
  };

  // 170.16.2 А также нам нужна функция, которая будет увеличивать кол-во показываемых комиксов на 10.
  const showMoreComics = () => setVisibleComics(prevValue => prevValue + 10);

  // 170.16.1 И они будут сбрасываться до 10, когда будет выбран другой персонаж.
  useEffect(() => {
    updateChar();
    setVisibleComics(10);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.charId]);

  const skeleton = char || loading || error ? null : <Skeleton/>;
  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading ? <Spinner/> : null;
  const content = !(loading || error || !char)
    ? <View char={char}
            visibleComics={visibleComics}
            showMoreComics={showMoreComics}/>
    : null;

  return (
    <div className="char__info">
      {skeleton}
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};

const View = ({char, visibleComics, showMoreComics}) => {
  const {name, deck, thumbnail, homepage, wiki, issue_credits} = char;

  return (
    <>
      <div className="char__basics">
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
        {issue_credits.slice(0, visibleComics).map((item, index) => {
          return (
            <li className="char__comics-item"
                key={index}>
              <a href={item.site_detail_url} target="_blank" rel="noreferrer">
                {item.name || `Issue #${item.issue_number}`} {/* Fallback if name is missing */}
              </a>
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