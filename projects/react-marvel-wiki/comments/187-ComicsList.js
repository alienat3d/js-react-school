import './comicsList.scss';
import useComicVineService from '../../services/ComicVineService';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

// 187.8.0 Здесь у нас также очень похожа логика формирования списка, что была в CharList и можно потом это выделить в отдельный файл, но пока просто скопируем. Также добавим сущности для стейт-машины и удалим лишние стейты, а затем добавим ручное переключение стейта на "SUCCESS", после загрузки данных в функции "onRequest", как и делали раньше. ↓
const setContent = (processState, Component, newItemLoading) => {
  switch (processState) {
    case 'IDLE':
      return <Spinner/>;
    case 'LOADING':
      return newItemLoading ? <Component/> : <Spinner/>;
    case 'ERROR':
      return <ErrorMessage/>;
    case 'SUCCESS':
      return <Component/>;
    default:
      throw new Error('Unexpected process state');
  }
};

const ComicsList = () => {
  const {processState, setProcessState, getAllComics} = useComicVineService();
  const [comicsList, setComicsList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [comicsEnded, setComicsEnded] = useState(false);

  const onComicsListLoaded = (newComicsList) => {
    let ended = false;
    if (newComicsList.length < 8) ended = true;

    setComicsList(prevComicsList => [...prevComicsList, ...newComicsList]);
    setNewItemLoading(false);
    setOffset(offset => offset + 8);
    setComicsEnded(ended);
  };

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllComics(offset)
      .then(onComicsListLoaded)
      .then(() => setProcessState('SUCCESS'))
      .catch(error => {
        console.error('ComicsList failed to load comics:', error);
        setNewItemLoading(false);
      });
  };

  function renderItems(arr) {
    const items = arr.map(item => {
      return (
        <li className="comics__item" key={item.id}>
          <Link to={`/comics/${item.id}`} state={{ from: '/comics' }}>
            <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
            <div className="comics__item-name">{item.title}</div>
          </Link>
        </li>
      );
    });

    return <ul className="comics__grid">{items}</ul>;
  }

/*  const items = renderItems(comicsList);
  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading && !newItemLoading ? <Spinner/> : null;*/

  useEffect(() => {
    onRequest(offset, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 187.8.1 Здесь у нас всё то же самое, что и было в CharList, только в метод renderItems мы положим уже comicsList соответственно.
  // (Go to [/src/components/randomChar/RandomChar.js])
  return (
    <div className="comics__list">
      {/*{errorMessage}
      {spinner}
      {items}*/}
      {setContent(processState, () => renderItems(comicsList), newItemLoading)}
      {!comicsEnded && <button className="button button__main button__long"
                                      disabled={newItemLoading}
                                      onClick={() => onRequest(offset)}>
        <div className="inner">load more</div>
      </button>}
    </div>
  );
};

export default ComicsList;