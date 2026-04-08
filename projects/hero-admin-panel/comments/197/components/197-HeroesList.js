import {useHttp} from '../../hooks/http.hook';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {heroesFetching, heroesFetched, heroesFetchingError} from '../../actions';
import HeroesListItem from '../heroesListItem/HeroesListItem';
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
  // 197.5.0 Итак, здесь мы с помощью хука из "React-Redux" вытаскиваем из глобального хранилища стейты массива с героями "heroes" и стейт текущего статуса загрузки "heroesLoadingStatus".
  const {heroes, heroesLoadingStatus} = useSelector(state => state);
  // 197.5.1 С помощью хука «useDispatch» мы также вытащим из store функцию dispatch, которая нам нужна для передачи экшенов.
  const dispatch = useDispatch();
  // 197.5.2 Ну, и хук «useHttp», чтобы получить функцию для отправки запросов.
  const {request} = useHttp();

  // 197.5.3 Хук «useEffect» с зависимостью "[]" применим для того, чтобы запрос вызвался лишь 1 раз вначале.
  useEffect(() => {
    // 197.5.4 Тут применим функцию-диспэтч на action creator "heroesFetching" (см. [/src/actions/index.js]), который переключит стейт статуса запроса в положение "HEROES_FETCHING".
    dispatch(heroesFetching());
    // 197.5.5 Затем произведём запрос по ссылке, дожидаемся ответа с данными и обрабатываем промис в методе "then", с помощью диспэтч-функции и action creator передаём в store экшен 'HEROES_FETCHED', где payload'ом идут только что полученные от сервера данные уже в формате JSON (преобразование идёт на уровне хука 'useHttp').
    // 197.5.6 Однако, если у нас произошла при запросе ошибка, то мы её отловим в "catch" и передадим в store диспэтч-функцией другой экшен — 'HEROES_FETCHING_ERROR'.
    request('http://localhost:3001/heroes')
      .then(data => dispatch(heroesFetched(data)))
      .catch(() => dispatch(heroesFetchingError()));

    // eslint-disable-next-line
  }, []);

  // 197.5.7 Здесь у нас условие, которое вернёт компонент загрузки Spinner, если в стейте статуса загрузки 'loading', а если там 'error' — то текст "Ошибка загрузки".
  if (heroesLoadingStatus === 'loading') {
    return <Spinner/>;
  } else if (heroesLoadingStatus === 'error') {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  // 197.5.8 Если же этих строк в стейте "heroesLoadingStatus" не обнаружено, то запускается функция "renderHeroesList", которая рендерит список карточек героев, но перед этим проверит не пуст ли массив с героями, иначе вернёт надпись "Героев пока нет".
  const renderHeroesList = (arr) => {
    if (arr.length === 0) {
      return <h5 className="text-center mt-5">Героев пока нет</h5>;
    }

    // 197.6.0 Здесь у нас идёт простой перебор массива методом "map", и из каждого элемента массива формируется элемент списка (карточка героя) в виде отдельного компонента HeroesListItem, в него передаём id и прочие пропсы. "id" нам нужен для атрибута "key", а пропсы мы просто передаём все разом через спред-оператор.
    // (Go to [\src\components\heroesListItem\HeroesListItem.js])
    return arr.map(({id, ...props}) => {
      return <HeroesListItem key={id} {...props}/>;
    });
  };

  // 197.5.9 После формирования списка карточек героев они поместятся в переменную "elements" и затем в вёрстку. ↑
  const elements = renderHeroesList(heroes);
  return (
    <ul>
      {elements}
    </ul>
  );
};

export default HeroesList;