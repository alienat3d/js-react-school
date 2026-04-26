import {useHttp} from '../../hooks/http.hook';
import {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
// import {createSelector} from '@reduxjs/toolkit';
// 209.7.1 Здесь мы импортируем из слайса этот метод.
import {fetchHeroes, filteredHeroesSelector, heroDeleted} from './heroesSlice';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import HeroesListItem from '../heroesListItem/HeroesListItem';
import Spinner from '../spinner/Spinner';

import './heroesList.scss';

const HeroesList = () => {
    // 209.9.0 Рассмотрим ещё одну деталь, которая встречается во многих проектах. Чтобы получить список отфильтрованных героев мы используем функцию "filteredHeroesSelector", созданную, через метод "createSelector". Но представим, что приложение будет расти количество страниц, функционала и модулей будет тоже расти. И возможно в другой части приложения понадобится снова получить этот массив и тогда придётся копировать всю эту функцию, а это дурной тон и нарушение принципа DRY (Don't Repeat Yourself). Поэтому лучше будет создать этот селектор в одном месте с последующим экспортом туда, где он потребуется. И создадим мы его в том слайсе, которому он логически принадлежит (в данном случае heroesSlice). Теперь мы можем эту функцию-селектор просто вырезать и переместить в слайс "heroesSlice".
    // (Go to [/src/components/heroesList/heroesSlice.js])
    /*const filteredHeroesSelector = createSelector(
      state => state.filters.activeFilter,
      // 209.7.2 И эта функция больше не нужна, т.к. вместо неё мы применим функцию адаптера из слайса "heroesSlice" "selectAll", которая сделает то же самое и уже не в виде объекта сущностей, а в виде массива. Она получит стейт, точнее его часть "heroes" и извлечёт из него массив со всеми героями.
      // (Go to [/src/components/heroesList/heroesSlice.js])
      // state => state.heroes.heroes,
      selectAll,
      (filter, heroesArr) => {
        return filter === 'all' ?
          heroesArr :
          heroesArr.filter(item => item.element === filter);
      }
    );*/

    // 209.9.3 Здесь, где мы получаем отфильтрованных героев мы уже поместим импортируемую из слайса с героями функцию-селектор "filteredHeroesSelector".
    // ? 209.9.4 Т.о. мы, во-первых, теперь можем использовать этот селектор в разных частях приложения, а во-вторых теперь приложение имеет более чёткое разграничение логической части работы с данными в Redux и визуальной UI-части. И Реакт-компонент меньше знает о работе стейта, как и должно быть в хорошем веб-приложении. Компонент "HeroesList" (список героев) лишь получает данные из store и затем их отображает. А значит, будет гораздо проще дебажить и заменить этот компонент на Реакте, при желании, чем-то другим, например написанным на Vanilla JS.
  // (Go to [/src/components/heroesFilters/filtersSlice.js])
    const filteredHeroes = useSelector(filteredHeroesSelector);
    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
      dispatch(fetchHeroes());
      // eslint-disable-next-line
    }, []);

    const onDelete = useCallback(id => {
      request(`http://localhost:3001/heroes/${id}`, 'DELETE')
        .then(data => dispatch(heroDeleted(id)))
        .catch(error => console.log(error));
      // eslint-disable-next-line
    }, [request]);

    if (heroesLoadingStatus === 'loading') {
      return <Spinner/>;
    } else if (heroesLoadingStatus === 'error') {
      return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
    }

    const renderHeroesList = arr => {
      if (arr.length === 0) {
        return (
          <CSSTransition timeout={0} classNames="hero">
            <h5 className="text-center mt-5">Героев пока нет</h5>
          </CSSTransition>
        );
      }

      return arr.map(({id, ...props}) => {
        return (
          <CSSTransition key={id} timeout={500} classNames="hero">
            <HeroesListItem {...props} onDelete={() => onDelete(id)}/>
          </CSSTransition>
        );
      });
    };

    const elements = renderHeroesList(filteredHeroes);
    return (
      <TransitionGroup component="ul">
        {elements}
      </TransitionGroup>
    );
  }
;

export default HeroesList;