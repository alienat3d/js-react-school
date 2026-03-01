import './singleComic.scss';
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

  const onComicLoaded = (comic) => {
    setComic(comic);
  };

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
  const {title, description, thumbnail, pageCount, language, price} = comic;

  return (
    <div className="single-comic">
      <img src={thumbnail} alt={title} className="single-comic__img"/>
      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr" dangerouslySetInnerHTML={{__html: description}}/>
        <p className="single-comic__descr">{pageCount} pages</p>
        <p className="single-comic__descr">Language: {language}</p>
        <div className="single-comic__price">{price}$</div>
      </div>
      <Link to="/comics" className="single-comic__back">
        Back to all
      </Link>
    </div>
  );
};

export default SingleComic;

/*return (
<div className="single-comic">
  <img src={xMen} alt="x-men" className="single-comic__img"/>
  <div className="single-comic__info">
    <h2 className="single-comic__name">X-Men: Days of Future Past</h2>
    <p className="single-comic__descr">Re-live the legendary first journey into the dystopian future of 2013 - where
      Sentinels stalk the Earth, and the X-Men are humanity's only hope...until they die! Also featuring the first
      appearance of Alpha Flight, the return of the Wendigo, the history of the X-Men from Cyclops himself...and a
      demon for Christmas!?</p>
    <p className="single-comic__descr">144 pages</p>
    <p className="single-comic__descr">Language: en-us</p>
    <div className="single-comic__price">9.99$</div>
  </div>
  <Link to="/../comics" className="single-comic__back">Back to all</Link>
</div>
);*/