import './charList.scss';
import PropTypes from 'prop-types';
import {useEffect, useRef, useState} from 'react';
import useComicVineService from '../../services/ComicVineService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

// 170.8.0 Похожим образом, как и в предыдущем компоненте нужно сделать и здесь: заменить местные стейты загрузки и ошибки на те, что у нас в кастомном хуке, а также нужно извлечь функцию получения всех персонажей "getAllCharacters". ↓

const CharList = (props) => {
  const {loading, error, getAllCharacters} = useComicVineService();
  const [charList, setCharList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [charEnded, setCharEnded] = useState(false);
  /*  const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);*/

  // const onCharListLoading = () => setNewItemLoading(true);

  /*  const onError = () => {
      setError(true);
      setLoading(false);
    };*/

  const onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }

    setCharList(charList => [...charList, ...newCharList]);
    // setLoading(false);
    setNewItemLoading(false);
    setOffset(offset => offset + 9);
    setCharEnded(ended);
  };

  // 170.9.0 Чтобы синхронизировать работу компонента и хука добавим ещё один параметр "initial", в который будем передавать булево значение. В зависимости от значения этого параметра будет меняться значение стейта "setNewItemLoading". Но сперва мы будем делать проверку, чтобы поменять значение на противоположное.
  // 170.9.1 Ещё раз, если идёт повторная загрузка (initial — "false"), то состояние "setNewItemLoading" меняется каждый на true... ↓
  // 170.12 Нам нужно убедиться, что когда все попытки подключиться закончатся, то newItemLoading вернёт значение false, чтобы кнопка "load more" не оставалась заблокированной.
  // (Go to [/src/components/randomChar/RandomChar.js])
  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    // onCharListLoading();
    // setNewItemLoading(true);
    // comicVineService.getAllCharacters(offset).then(onCharListLoaded).catch(onError);
    getAllCharacters(offset)
      .then(onCharListLoaded)
      .catch(error => {
        console.error('CharList failed to load characters:', error);
        setNewItemLoading(false);
      });
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

  // ? Функция создана для оптимизации, чтобы не помещать такую конструкцию в render
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

  // 170.9.2 ... а здесь мы добавляем аргументы "offset" и true. ↓
  useEffect(() => {
    onRequest(offset, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const items = renderItems(charList);

  // 170.9.3 Ок, мы сделали проверку идёт ли первичная или вторичная загрузка персонажей, но осталось ещё поменять немного поведение на уровне вёрстки. Теперь мы показываем спиннер, когда идёт загрузка, но не когда идёт загрузка дополнительных персонажей в список после нажатия кнопки "load more".
  // 170.10.0 Отлично, вот только у нас остался ещё один баг — при нажатии кнопки "load more" все персонажи в списке на мгновение исчезают и появляются вновь. Это распространённая проблема при работе с подобными компонентами, где есть какая-то дозагрузка доп. элементов. Происходит это из-за того, что состояния charList & loading каждое нажатие по этой кнопке меняются и идёт ререндер компонента. Выглядит не слишком красиво и поэтому будем это фиксить.
  // 170.10.1 Модифицируем компонент, чтобы убрать условие для формирования content, как у нас было до этого. Именно этот "null" в условии и создаёт эффект краткого исчезания персонажей списка.
  const errorMessage = error ? <ErrorMessage/> : null;
  // const spinner = loading ? <Spinner/> : null;
  const spinner = loading && !newItemLoading ? <Spinner/> : null;
  // const content = !(loading || error) ? items : null;

  return (
    <div className="char__list">
      {errorMessage}
      {spinner}
      {/*{content}*/}
      {/* 170.10.2 Теперь вместо "content" с условием у нас тут будут отрендереные функцией "renderItems" элементы. И таким образом мы исправили эту проблему.*/}
      {/* (Go to [/src/hooks/http.hook.js]) */}
      {items}
      {!(loading || error) && <button className="button button__main button__long"
                                      disabled={newItemLoading}
                                      style={{'display': charEnded ? 'none' : 'block'}}
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