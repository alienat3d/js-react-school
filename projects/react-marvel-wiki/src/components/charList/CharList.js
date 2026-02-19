import './charList.scss';
import PropTypes from 'prop-types';
import {useEffect, useRef, useState} from 'react';
import ComicVineService from '../../services/ComicVineService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const CharList = (props) => {
  const comicVineService = new ComicVineService();
  const [charList, setCharList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [error, setError] = useState(false);
  const [offset, setOffset] = useState(0);
  const [charEnded, setCharEnded] = useState(false);

  const onCharListLoading = () => setNewItemLoading(true);

  const onError = () => {
    setError(true);
    setLoading(false);
  };

  const onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }

    setCharList(charList => [...charList, ...newCharList]);
    setLoading(false);
    setNewItemLoading(false);
    setOffset(offset => offset + 9);
    setCharEnded(ended);
  };

  const onRequest = (offset) => {
    onCharListLoading();
    comicVineService.getAllCharacters(offset).then(onCharListLoaded).catch(onError);
  };

  // Пробовал сделать дозагрузку персонажей, но не доделал.
  /*   onScrollCharLoading = (offset) => {
      if (
        window.scrollY + document.documentElement.clientHeight >=
        document.documentElement.scrollHeight - 1
      ) {
        this.onRequest(offset);
      }
    }
    componentDidMount(offset) {
      this.onRequest()
      window.addEventListener('scroll', () => this.onScrollCharLoading(offset));
    }
    componentWillUnmount() {
      window.removeEventListener('scroll', this.onScrollCharLoading);
    } */

  const itemRefs = useRef([]);

  const focusOnItem = id => {
    if (!itemRefs) return;
    itemRefs.current[id].focus();
  };

  const onKeyDown = (evt, index) => {
    // Selection Keys
    if (evt.key === ' ' || evt.key === 'Enter') {
      evt.preventDefault();
      props.onCharSelected(charList[index].id);
      focusOnItem(index);
    }
    // Navigation Keys (3 columns grid)
    if (evt.key === 'ArrowRight' && index < charList.length - 1) {
      focusOnItem(index + 1);
    }
    if (evt.key === 'ArrowLeft' && index > 0) {
      focusOnItem(index - 1);
    }
    if (evt.key === 'ArrowDown' && index + 3 < charList.length) {
      focusOnItem(index + 3);
    }
    if (evt.key === 'ArrowUp' && index - 3 >= 0) {
      focusOnItem(index - 3);
    }
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
            onKeyDown={(evt) => onKeyDown(evt, index)}>
          <img src={item.thumbnail} alt={item.name}/>
          <div className="char__name">{item.name}</div>
        </li>
      );
    });

    return <ul className="char__grid">{items}</ul>;
  }

  useEffect(() => {
    onRequest();
  // eslint-disable-next-line
  }, []);

  const items = renderItems(charList);

  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading ? <Spinner/> : null;
  const content = !(loading || error) ? items : null;

  return (
    <div className="char__list">
      {errorMessage}
      {spinner}
      {content}
      <button className="button button__main button__long"
              disabled={newItemLoading}
              style={{'display': charEnded ? 'none' : 'block'}}
              onClick={() => onRequest(offset)}>
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired
};

export default CharList;