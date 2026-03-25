import './charList.scss';
import '../../style/transition-animation.scss';
import PropTypes from 'prop-types';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {useEffect, useRef, useState} from 'react';
import useComicVineService from '../../services/ComicVineService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

/* 187.7.6 Итак мы скопируем сюда setContent, чтобы её адаптировать под этот компонент. Итак, что же здесь должно работать иначе:
  1) в стейте "IDLE" у нас будет сразу Spinner, а не Skeleton, т.к. в этом компоненте Skeleton просто отсутствует;
  2) в "LOADING" нам следует либо отображать спиннер, либо не менять тот контент, который был на странице, чтобы визуально он не исчезал. И в целом логично сделать также, как было до этого у нас, мы будем отталкиваться от значения стейта newItemLoading (т.к. функция у нас во внешней зоне видимости, то этот стейт будет приходить в качестве аргумента). */
// (Go to [/src/components/comicsList/ComicsList.js])
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

// 187.7.0 Убедившись, что компонент CharInfo работает как раньше перейдём к рефакторингу CharList компонента. Здесь используется похожая логика получения данных от API и рендера списка персонажей, но со своими нюансами. ↓

const CharList = (props) => {
  // 187.7.1 Во-первых, нам нужно добавить также сюда стейт processState и метод для его изменения setProcessState, а loading & error можно удалить, т.к. здесь теперь будет также использоваться стейт-машина вместо старой системы. ↓
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

  // 187.7.2 Также, как и в случае с CharInfo, когда данные загрузились и сохранились в стейт, то нам нужно поменять стейт стейт-машины на "SUCCESS". ↓
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

  useEffect(() => {
    onRequest(offset, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 187.7.3 Однако, здесь нет компонента View, а вёрстка формируется через функцию renderItems. ↓
  /*  const items = renderItems(charList);
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;*/

  // 187.7.4 Здесь мы будем вызывать всё также функцию setContent, но вторым аргументом нам нужно передать компонент, формирующий вёрстку. И вот, мы знаем, что функциональный компонент — это функция, которая возвращает Реакт-элементы. И вот вместо компонента мы можем передать также функцию, например "renderItems(charList)", которая формирует список карточек персонажей. Ну, а третьего аргумента здесь не будет, что, впрочем, и не важно.
  // 187.7.5 И, вроде бы, всё хорошо работает, пока мы не нажмём на кнопку «load more» и увидим, что поведение чуть поломалось: весь список исчезает и рендерится вновь. И это выглядит прямо скажем не очень здорово. И этот компонент пример того, когда какие-то компоненты выбиваются из общей структуры — у них есть своя собственная логика и посему нам нужно здесь написать адаптированную под этот конкретный компонент функцию setContent, которая будет отличаться. ↑
  return (
    <div className="char__list">
      {/*{errorMessage}
      {spinner}
      {items}*/}
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