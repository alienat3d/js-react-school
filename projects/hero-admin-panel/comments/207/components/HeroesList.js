import {useHttp} from '../../hooks/http.hook';
import {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
// 207.7.5 Также и для этого компонента надо поменять путь, откуда мы вытаскиваем action creators.
import {fetchHeroes} from '../../actions'; // однако мы здесь пока оставим импорт комплексного action creator, пока мы его не переделали в следующем уроке.
// (Go to [/tmp/reducers/heroes.js/])
// import {fetchHeroes, heroDeleted} from '../../actions';
import {heroDeleted} from './heroesSlice';
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

    useEffect(() => {
      dispatch(fetchHeroes(request));
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