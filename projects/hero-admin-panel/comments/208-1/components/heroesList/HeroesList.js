// 4.1 А теперь, когда Redux берет на себя всю работу по извлечению и удалению данных, наш компонент становится более лаконичным.
// import {useHttp} from '../../hooks/http.hook';
import {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createSelector} from '@reduxjs/toolkit';
// import {fetchHeroes, heroDeleted} from './heroesSlice';
import {fetchHeroes, deleteHero} from './heroesSlice';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import HeroesListItem from '../heroesListItem/HeroesListItem';
import Spinner from '../spinner/Spinner';

import './heroesList.scss';

const HeroesList = () => {
    const filteredHeroesSelector = createSelector(
      state => state.filters.activeFilter,
      state => state.heroes.heroes,
      (filter, heroesArr) => {
        return filter === 'all' ?
          heroesArr :
          heroesArr.filter(item => item.element === filter);
      }
    );

    const filteredHeroes = useSelector(filteredHeroesSelector);
    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    const dispatch = useDispatch();
    // const {request} = useHttp();

    useEffect(() => {
      dispatch(fetchHeroes());
      // eslint-disable-next-line
    }, []);

    // 4.2 Мы можем полностью удалить отсюда хук "useHttp" и просто вызвать функцию-thunk "deleteHero" вместо него.
    // (Go to [/src/components/heroesList/heroesSlice.js])
    /*const onDelete = useCallback(id => {
      request(`http://localhost:3001/heroes/${id}`, 'DELETE')
        .then(data => dispatch(heroDeleted(id)))
        .catch(error => console.log(error));
      // eslint-disable-next-line
    }, [request]);*/
    const onDelete = useCallback(id => {
      dispatch(deleteHero(id));
      // eslint-disable-next-line
    }, [dispatch]);

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