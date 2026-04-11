import {useHttp} from '../../hooks/http.hook';
import {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {heroesFetched, heroesFetchingError, heroDeleted} from '../../actions';
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

    // ? 201.1.0 Итак, сперва обозначим проблему: в функцию-диспэтч мы можем передавать лишь объекты, у которых есть поле "type", помимо опциональных других полей. Но бывают ситуации, когда необходимо в функцию-диспэтч отправить не объект, а строку, функцию или др. тип данных. И, конечно же, это вызовет ошибку.
    useEffect(() => {
      // 201.1.1 Например, если здесь вместо action creator "heroesFetching" в диспэтч-функцию передать строку, то у нас возникнет на странице ошибка, которая гласит, что экшены должны быть в виде объектов, но если нам всё-таки нужно использовать, например строчный тип данных, то следует использовать кастомный middleware. И сейчас мы напишем этот middleware, т.е. функционал того, что если в диспэтч-функцию приходит какая-то строка, то нужно передавать в store определённый экшен.
      // (Go to [/store/index.js])
      // dispatch(heroesFetching());
      dispatch('HEROES_FETCHING');
      request('http://localhost:3001/heroes')
        .then(data => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()));
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