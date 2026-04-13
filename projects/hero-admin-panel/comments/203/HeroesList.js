import {useHttp} from '../../hooks/http.hook';
import {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
// 203.4.2 Теперь целых три action creator у нас заменит один новый. ↓
// import {heroesFetching, heroesFetched, heroesFetchingError, heroDeleted} from '../../actions';
import {fetchHeroes, heroDeleted} from '../../actions';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import Spinner from '../spinner/Spinner';
import HeroesListItem from '../heroesListItem/HeroesListItem';

import './heroesList.scss';
import {createSelector} from 'reselect';

const HeroesList = () => {
    const filteredHeroesSelector = createSelector(
      (state) => state.filters.activeFilter,
      (state) => state.heroes.heroes,
      (filter, heroesArr) => {
        return filter === 'all' ?
          heroesArr :
          heroesArr.filter(item => item.element === filter);
      }
    );

    const filteredHeroes = useSelector(filteredHeroesSelector);
    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    const dispatch = useDispatch();
    const {request} = useHttp();

    // 203.2 Здесь протестируем как работает "ReduxThunk" и где мы подставляли в диспэтч строку, подставим в этот раз функцию без вызова. Всё работает как прежде, а значит "ReduxThunk" активизировалась и расширила функции диспэтча в нашем проекте.
    // (Go to [\src\components\heroesFilters\HeroesFilters.js])
    // 203.4.0 Ок, теперь рассмотрим задачу более реалистичную. У нас здесь есть действие по получению данных с сервера и оно довольно неплохо работает, но, во-первых, может смущать повторение dispatch внутри. А во-вторых, что для получения списка героев нам придётся копипастить этот участок кода из компонента в компонент. И мы могли бы прийти к мысли, что было бы удобнее создать одно действие, которые будет это всё в себя включать. И именно для этого уместно создать action creator в виде функции.
    // (Go to [projects/hero-admin-panel/src/actions/index.js])
    // 203.4.3 Осталось здесь запустить диспэтч-функцию с новым action creator "fetchHeroes" и подставить в него функцию запроса на сервер "request".
    // 203.5.0 Создадим нечто схожее с action creator "fetchHeroes", но уже для фильтров в [/src/components/heroesFilters/HeroesFilters.js]
    // (Go to [/src/actions/index.js])
    useEffect(() => {
      // dispatch('HEROES_FETCHING');
      /*dispatch(heroesFetching);
      request('http://localhost:3001/heroes')
        .then(data => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()));*/
      dispatch(fetchHeroes(request));
      // eslint-disable-next-line
    }, []);

    const onDelete = useCallback(id => {
      request(`http://localhost:3001/heroes/${id}`, 'DELETE')
        .then(data => console.log(data, `${data.name} has been deleted.`))
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