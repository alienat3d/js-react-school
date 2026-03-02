import './singleComic.scss';
import comicVineLogo from '../../resources/img/comic-vine-logo.webp';
import {Link, useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import useComicVineService from '../../services/ComicVineService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

const SingleComic = () => {
  const {comicId} = useParams();
  const {loading, error, getComic, clearError} = useComicVineService();

  const [comic, setComic] = useState(null);

  useEffect(() => {
    updateComic();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comicId]);

  const updateComic = () => {
    clearError();
    getComic(comicId)
      .then(onComicLoaded);
  };

  const onComicLoaded = (comic) => setComic(comic);

  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading ? <Spinner/> : null;
  const content = !(loading || error || !comic) ? <View comic={comic}/> : null;

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};

const View = ({comic}) => {
  const {thumbnail, title, coverDate, description, pageCount, language, comicVineUrl} = comic;

  return (
    <div className="single-comic">
      <img src={thumbnail} alt={title} className="single-comic__img"/>
      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">Date of publishing: {coverDate}</p>
        <p className="single-comic__descr" dangerouslySetInnerHTML={{__html: description}}/>
        {pageCount && <p className="single-comic__descr">{pageCount} pages</p>}
        {language && <p className="single-comic__descr">Language: {language}</p>}
        <a className="single-comic__comicvine-url" href={comicVineUrl} target="_blank" rel="noreferrer"><img src={comicVineLogo} alt="ComicVine Logo"/></a>
      </div>
      <Link to="/comics" className="button button__main button__long">
        <div className="inner">back to all</div>
      </Link>
    </div>
  );
};

export default SingleComic;