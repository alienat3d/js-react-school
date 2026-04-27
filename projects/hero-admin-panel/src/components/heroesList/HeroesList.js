import {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchHeroes, filteredHeroesSelector, heroDeleted} from './heroesSlice';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import HeroesListItem from '../heroesListItem/HeroesListItem';
import Spinner from '../spinner/Spinner';
import {request} from '../../utils';

import './heroesList.scss';

const HeroesList = () => {
  const filteredHeroes = useSelector(filteredHeroesSelector);
  const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
  const dispatch = useDispatch();

  // eslint-disable-next-line
  useEffect(() => {
    dispatch(fetchHeroes());
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

  return <TransitionGroup component="ul">{elements}</TransitionGroup>;
};

export default HeroesList;