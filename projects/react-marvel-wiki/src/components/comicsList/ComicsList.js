import './comicsList.scss';
import useComicVineService from '../../services/ComicVineService';
import {useEffect, useState} from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import {Link} from 'react-router-dom';

const ComicsList = () => {
  const {loading, error, getAllComics} = useComicVineService();
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
      .catch(error => {
        console.error('ComicsList failed to load comics:', error);
        setNewItemLoading(false);
      });
  };

  // 175.1.1 Для начала мы заменим ссылку на Link, с путём на динамически формируемую страницу описания комикса по его id.
  function renderItems(arr) {
    const items = arr.map(item => {
      return (
        <li className="comics__item" key={item.id}>
          <Link to={`/comics/${item.id}`}>
            <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
            <div className="comics__item-name">{item.title}</div>
          </Link>
        </li>
      );
    });

    return <ul className="comics__grid">{items}</ul>;
  }

  const items = renderItems(comicsList);
  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading && !newItemLoading ? <Spinner/> : null;

  useEffect(() => {
    onRequest(offset, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="comics__list">
      {errorMessage}
      {spinner}
      {items}
      {!(loading || error || comicsEnded) && <button className="button button__main button__long"
                                      disabled={newItemLoading}
                                      onClick={() => onRequest(offset)}>
        <div className="inner">load more</div>
      </button>}
    </div>
  );
};

export default ComicsList;