import './charList.scss';
import '../../style/transition-animation.scss';
import PropTypes from 'prop-types';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {useEffect, useMemo, useRef, useState} from 'react';
import useComicVineService from '../../services/ComicVineService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

// * 188.0 После всех предыдущих преобразований у нас в этом компоненте появился баг с отображением выделения выбранного персонажа в списке, когда мы по нему кликаем или выбираем с клавиатуры. Хотя, если нажать второй раз, то выбранный персонаж подсвечивается. Этот баг часто встречается, когда мы используем функциональные компоненты, рефы и при этом у нас есть переключение состояний типа конечных автоматов. Дело в том, что у нас здесь список персонажей несколько раз рендерится при определённых действиях. ↓

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

  // 188.4.1 А дело в следующем: т.к. у нас при выборе персонажа при помощи функции focusOnItem ставится фокус на выбранный элемент карточки персонажа, а данные о её id передаются наверх к родительскому комп., а он в свою очередь ререндерится, т.к. у него обновился стейт, то мы имеем коллизию, что его дочерний CharList тоже за счёт этого обновляется. Это значит всё внутри него пересоздаётся, включала фокусировку, которой больше нет. Однако повторный клик по карточке ставит фокусировку, т.к. стейт родительского компонента HomePage не изменяется (id тот же) и ререндера не происходит и мы всё же видим визуальное отображение этой фокусировки на карточке. ↓
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

  // 188.1 Добавим в функцию "renderItems", которая рендерит список карточек-персонажей console.log, чтобы видеть каждый раз, когда она вновь запускается. Так мы узнаем, что когда мы нажмём на карточку персонажа, то происходит ещё один запуск этой функции, а во второй раз — нет. ↓
  function renderItems(arr) {
    // console.log('renderItems');
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

  // 188.2 Т.е. выше мы нашли, что происходит один лишний запуск функции, а спустившись сюда где она запускается, мы увидим, что эта функция запускается, когда рендерится компонент. И если эта функция запускается повторно, то логично предположить, что весь компонент, в котором она находится ререндерится. Как мы помним, такое бывает, например, в случае обновления стейта компонента. Но стейт у этого компоненты мы здесь не меняем. Другое дело, если родительский компонент CharList'а ререндерится сам по себе и соответственно запускает также ререндер своих дочерних компонентов. Родительским компонентом для CharList является [Homepage.js].
  // (Go to [\src\pages\HomePage.js])
  // 188.5 И вот что мы можем сделать, чтобы компонент CharList не ререндерился из-за ререндера его родительского комп., а его рендер зависел от определённого параметра. Для этой задачи нам отлично подойдёт один из уже пройденных хуков «useMemo». Для этого мы создадим ещё одну переменную elements и поместим в него хук-обёртку «useMemo», у которого внутри коллбэк-функция, где будет находиться вызов "setContent". Ну, а на её прежнем месте будет эта переменная. Т.о. хук запомнит результат выполнения этой функции, т.е. сам компонент, который рендерится, а в зависимость запишем то, при изменении чего у нас всё-таки будет происходить новый запуск этой функции, т.е. это будет смена стейта processState (если у нас будет новая загрузка, то нужно вновь рендерить, т.к. могут появиться новые карточки персонажей).
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const elements = useMemo(() => setContent(processState, () => renderItems(charList), newItemLoading), [processState]);

  return (
    <div className="char__list">
      {/*{setContent(processState, () => renderItems(charList), newItemLoading)}*/}
      {elements}
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