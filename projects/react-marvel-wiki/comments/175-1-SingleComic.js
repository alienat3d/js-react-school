import './singleComic.scss';
import comicVineLogo from '../../resources/img/comic-vine-logo.webp';
import {Link, useLocation, useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import useComicVineService from '../../services/ComicVineService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

const SingleComic = () => {
  const {comicId} = useParams();
  const {loading, error, getComic, clearError} = useComicVineService();
  const location = useLocation();

  const [comic, setComic] = useState(null);

  // 175.5.2 Здесь мы определим куда вернуться по клику на кнопке, продумав также и фоллбэк (на случай, если пользователь пришёл на эту страницу из-вне по ссылке, тогда вернём его на главную).
  // (Go to [/src/components/charInfo/CharInfo.js])
  const backPath = location.state?.from || '/';

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
  // 175.5.1.1 И сюда. ↑
  const content = !(loading || error || !comic) ? <View comic={comic} backPath={backPath}/> : null;

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};

// 175.5.1.0 Также нужно передать стейт сюда. ↑
const View = ({comic, backPath}) => {
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
        <a className="single-comic__comicvine-url" href={comicVineUrl} target="_blank" rel="noreferrer"><img
          src={comicVineLogo} alt="ComicVine Logo"/></a>
      </div>
      {/* 175.5.0 (Homework) Вторая задача у нас была сделать так, чтобы можно было возвращаться со страницы о комиксе в то место, откуда мы на неё попали по клику на ссылку/кнопку. И сделать это можно через передачу значения пути страницы, с которой пришёл пользователь, через стейт ссылки. А опрашивать этот стейт мы будем хуком «useLocation». ↑ */}
      <Link to={backPath} className="button button__main button__long">
        <div className="inner">get back</div>
      </Link>
    </div>
  );
};

export default SingleComic;