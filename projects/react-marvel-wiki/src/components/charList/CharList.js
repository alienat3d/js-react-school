import './charList.scss';
import '../../style/transition-animation.scss';
import PropTypes from 'prop-types';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {useEffect, useRef, useState} from 'react';
import useComicVineService from '../../services/ComicVineService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

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

const CharList = (props) => {
  const {processState, setProcessState, getAllCharacters} = useComicVineService();
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
      .then(() => setProcessState('SUCCESS'))
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
        <CSSTransition key={item.id} timeout={500} classNames="fade">
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
        </CSSTransition>
      );
    });

    return (
      <ul className="char__grid">
        <TransitionGroup component={null}>
          {items}
        </TransitionGroup>
      </ul>
    );
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => onRequest(offset, true), []);

  return (
    <div className="char__list">
      {setContent(processState, () => renderItems(charList), newItemLoading)}
      {!charEnded && <button className="button button__main button__long"
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