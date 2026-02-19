// import { Component } from 'react';
import './charList.scss';
import PropTypes from 'prop-types';
import ComicVineService from '../../services/ComicVineService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import {useEffect, useRef, useState} from 'react';

// class CharList extends Component {
const CharList = (props) => {
  // comicVineService = new ComicVineService();
  const comicVineService = new ComicVineService();
  /*  state = {
      charList: [],
      loading: true,
      newItemLoading: false,
      error: false,
      offset: 0,
      charEnded: false
    }*/
  const [charList, setCharList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [error, setError] = useState(false);
  const [offset, setOffset] = useState(0);
  const [charEnded, setCharEnded] = useState(false);

  // onCharListLoading = () => this.setState({ newItemLoading: true })
  // onError = () => this.setState({ error: true, loading: false })
  /*onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) { ended = true }

    this.setState(({ offset, charList }) => ({
      charList: [...charList, ...newCharList],
      loading: false,
      newItemLoading: false,
      offset: offset + 9,
      charEnded: ended
    }))
  }*/
  /*onRequest = (offset) => {
    this.onCharListLoading();
    this.comicVineService.getAllCharacters(offset)
      .then(this.onCharListLoaded)
      .catch(this.onError);
  }*/
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
  // itemRefs = [];
  // setRef = ref => this.itemRefs.push(ref);
  const itemRefs = useRef([]);

/*  focusOnItem = id => {
    if (!this.itemRefs) return;

    this.itemRefs[id].focus();
  };*/
  const focusOnItem = id => {
    if (!itemRefs) return;

    itemRefs.current[id].focus();
  };

  /*onKeyDown = (evt, index) => {
    const {charList} = this.state;

    // 1. Selection Keys
    if (evt.key === ' ' || evt.key === 'Enter') {
      evt.preventDefault();
      this.props.onCharSelected(charList[index].id);
      this.focusOnItem(index);
    }

    // 2. Navigation Keys (3 columns grid)
    if (evt.key === 'ArrowRight' && index < charList.length - 1) {
      this.focusOnItem(index + 1);
    }
    if (evt.key === 'ArrowLeft' && index > 0) {
      this.focusOnItem(index - 1);
    }
    if (evt.key === 'ArrowDown' && index + 3 < charList.length) {
      this.focusOnItem(index + 3);
    }
    if (evt.key === 'ArrowUp' && index - 3 >= 0) {
      this.focusOnItem(index - 3);
    }
  };*/
  const onKeyDown = (evt, index) => {
    // 1. Selection Keys
    if (evt.key === ' ' || evt.key === 'Enter') {
      evt.preventDefault();
      props.onCharSelected(charList[index].id);
      focusOnItem(index);
    }
    // 2. Navigation Keys (3 columns grid)
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

  // renderItems(arr) {
  function renderItems(arr) {
    const items = arr.map((item, index) => {
      /*let imgStyle = { 'objectFit': 'cover' };
      if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = { 'objectFit': 'unset' };
      }*/

      return (
        /*<li
          className="char__item"
          tabIndex={0}
          ref={this.setRef}
          key={item.id}
          onClick={() => {
            this.props.onCharSelected(item.id);
            this.focusOnItem(index);
          }}
          onKeyDown={(evt) => this.onKeyDown(evt, index)}>*/
          // 168.1 Здесь мы напишем напрямую в рефе функцию. Как мы прошли в уроке про рефы, мы можем создать коллбэк-функция, которая единственным элементом принимает тот элемент, где был вызван (т.е. <li>). "el" это у нас ссылка на этот элемент в DOM-дереве, который будет складываться в реф-массив "itemRefs". Таким образом мы заменили функцию "setRef" с её методом push, который мог бы вызвать ошибку.
          <li
          className="char__item"
          tabIndex={0}
          ref={el => itemRefs.current[index] = el}
          key={item.id}
          onClick={() => {
            props.onCharSelected(item.id);
            focusOnItem(index);
          }}
          onKeyDown={(evt) => onKeyDown(evt, index)}>
          <img
            src={item.thumbnail}
            alt={item.name}/>
          <div className="char__name">{item.name}</div>
        </li>
      );
    });

    return <ul className="char__grid">{items}</ul>;
  }

  // render() {
  //   const { charList, loading, error, newItemLoading, offset, charEnded } = this.state;

  // componentDidMount() { this.onRequest() }
  useEffect(() => {
    onRequest();
  // eslint-disable-next-line
  }, []);

  // const items = this.renderItems(charList);
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
              {/*onClick={() => this.onRequest(offset)}>*/}
        <div className="inner">load more</div>
      </button>
    </div>
  );
  // }
};

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired
};

export default CharList;