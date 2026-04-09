import {useHttp} from '../../hooks/http.hook';
import {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {heroesFetching, heroesFetched, heroesFetchingError, heroDeleted} from '../../actions';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import Spinner from '../spinner/Spinner';
import HeroesListItem from '../heroesListItem/HeroesListItem';

import './heroesList.scss';

// 198.0.1 Итак, приступим к выполнению первого задания: Задача для этого компонента: При клике на "крестик" идет удаление персонажа из общего состояния.
// Усложненная задача: Удаление идет и с json файла при помощи метода DELETE.

const HeroesList = () => {
  const {filteredHeroes, heroesLoadingStatus} = useSelector(state => state);
  const dispatch = useDispatch();
  const {request} = useHttp();

  useEffect(() => {
    dispatch(heroesFetching());
    request('http://localhost:3001/heroes')
      .then(data => dispatch(heroesFetched(data)))
      .catch(() => dispatch(heroesFetchingError()));
    // eslint-disable-next-line
  }, []);

  // 198.0.2 Функция берёт id и по нему удаляет персонажа, которого пользователь хочет удалить из store, но только если запрос на удаление прошёл успешно. Здесь эту функцию мы обязательно обернём в хук «useCallback», т.к. эта функция передаётся ниже по иерархии к дочернему компоненту [HeroesListItem.js] в качестве пропа. И вот, чтобы каждый раз не вызывать ререндер всех дочерних компонентов, то мы используем этот хук.
  const onDelete = useCallback(id => {
    // 198.0.3 Здесь мы удалим персонажа из БД по его id с помощью метода "DELETE". Также в методе "then" в "data" мы получаем того персонажа, который был удалён и выводим его в консоль. В следующем "then" мы при помощи диспэтч-функции передадим в store action creator "heroDeleted", который передаст экшен "HERO_DELETED" и id персонажа в payload.
    // (Go to [/src/components/heroesFilters/HeroesFilters.js])
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
};

export default HeroesList;