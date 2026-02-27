import './charList.scss';
import PropTypes from 'prop-types';
import {useEffect, useRef, useState} from 'react';
import useComicVineService from '../../services/ComicVineService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const CharList = (props) => {
  const {loading, error, getAllCharacters} = useComicVineService();
  const [charList, setCharList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [charEnded, setCharEnded] = useState(false);

  const onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) ended = true;

    setCharList(charList => [...charList, ...newCharList]);
    setNewItemLoading(false);
    setOffset(offset => offset + 9);
    setCharEnded(ended);
  };

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllCharacters(offset)
      .then(onCharListLoaded)
      .catch(error => {
        console.error('CharList failed to load characters:', error);
        setNewItemLoading(false);
      });
  };

  const itemRefs = useRef([]);

  const focusOnItem = id => {
    if (!itemRefs) return;
    itemRefs.current[id].focus();
  };

  const onKeyDown = (evt, index) => {
    if (evt.key === ' ' || evt.key === 'Enter') {
      evt.preventDefault();
      props.onCharSelected(charList[index].id);
      focusOnItem(index);
    }
    if (evt.key === 'ArrowRight' && index < charList.length - 1) focusOnItem(index + 1);
    if (evt.key === 'ArrowLeft' && index > 0) focusOnItem(index - 1);
    if (evt.key === 'ArrowDown' && index + 3 < charList.length) focusOnItem(index + 3);
    if (evt.key === 'ArrowUp' && index - 3 >= 0) focusOnItem(index - 3);
  };

  function renderItems(arr) {
    const items = arr.map((item, index) => {
      return (
        <li className="char__item"
            tabIndex={0}
            ref={el => itemRefs.current[index] = el}
            key={item.id}
            onClick={() => {
              props.onCharSelected(item.id);
              focusOnItem(index);
            }}
            onKeyDown={evt => onKeyDown(evt, index)}>
          <img src={item.thumbnail} alt={item.name}/>
          <div className="char__name">{item.name}</div>
        </li>
      );
    });

    return <ul className="char__grid">{items}</ul>;
  }

  useEffect(() => {
    onRequest(offset, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const items = renderItems(charList);
  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading && !newItemLoading ? <Spinner/> : null;

  return (
    <div className="char__list">
      {errorMessage}
      {spinner}
      {items}
      {!(loading || error || charEnded) && <button className="button button__main button__long"
                                      disabled={newItemLoading}
                                      onClick={() => onRequest(offset)}>
        <div className="inner">load more</div>
      </button>}
    </div>
  );
};

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired
};

export default CharList;