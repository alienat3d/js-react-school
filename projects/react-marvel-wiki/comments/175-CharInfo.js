import './charInfo.scss';
import PropTypes from 'prop-types';
import useComicVineService from '../../services/ComicVineService';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

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

  const showMoreComics = () => setVisibleComics(prevValue => prevValue + 10);

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
      {/* * 175.4 (Homework) Чтобы сделать пункты списка комиксов, в которых принимал участие выбранный персонаж, нам всего лишь нужно было изучить получаемый объект данных и найти там массив с комиксами, затем увидеть, что у каждого из комиксов в этом массиве есть id. Его-то мы и используем в пути для формирования динамической ссылки на страницу информации о комиксе. (До этого там находилась ссылка на инфо о комиксе на сайте ComicVine.) */}
      {/* (Go to [\src\components\singleComic\SingleComic.js]) */}
      <ul className="char__comics-list">
        {issue_credits.length > 0 ? null : 'There is no comics with this character found in our database.'}
        {issue_credits.slice(0, visibleComics).map((item, index) => {
          return (
            <li className="char__comics-item" key={index}>
              {/* // 175.5.3 Добавим стейт линкам здесь и в [/src/components/comicsList/ComicsList.js]. */}
              <Link to={`/comics/${item.id}`} state={{ from: '/' }}>
                {item.name || `Issue #${item.issue_number}`} {/* Fallback if name is missing */}
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