// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом
import {useHttp} from '../../hooks/http.hook';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import classNames from 'classnames';

import {filtersFetching, filtersFetched, filtersFetchingError, activeFilterChanged} from '../../actions';
import Spinner from '../spinner/Spinner';

// 198.1.0 Итак, у нас здесь есть фильтры, которые загружаются с сервера. ↓

const HeroesFilters = () => {
  const {filters, filtersLoadingStatus, activeFilter} = useSelector(state => state);
  const dispatch = useDispatch();
  const {request} = useHttp();

  // Запрос на сервер для получения фильтров и последовательной смены состояния
  useEffect(() => {
    dispatch(filtersFetching());
    request('http://localhost:3001/filters')
      .then(data => dispatch(filtersFetched(data)))
      .catch(() => dispatch(filtersFetchingError()));

    // eslint-disable-next-line
  }, []);

  if (filtersLoadingStatus === 'loading') {
    return <Spinner/>;
  } else if (filtersLoadingStatus === 'error') {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  const renderFilters = (arr) => {
    if (arr.length === 0) {
      return <h5 className="text-center mt-5">Фильтры не найдены</h5>;
    }

    // 198.1.1 На базе загруженных фильтров формируется кусочек вёрстки: это кнопки, у которых свои ключи, уникальные id, CSS-классы и слушатель события "клик". В базе данных раздел "filters" мы преобразовали из простых строк — названий фильтров, в массив объектов, где у каждого фильтра также есть лейбл и "className" (CSS-класс для разного отображения каждого из фильтров). Именно из этих данных будут генерироваться кнопки фильтра.
    // (Go to [/src/reducers/index.js])
    // Данные в json-файле я расширил классами и текстом
    return arr.map(({name, className, label}) => {

      // Используем библиотеку «classnames» и формируем классы динамически
      const btnClass = classNames('btn', className, {
        'active': name === activeFilter
      });

      // 198.1.3 При клике на кнопку будет срабатывать диспэтч-функция с action creator, который будет также забирать в payload экшена название фильтра.
      // (Go to [/src/reducers/index.js])
      return (
        <button
          key={name}
          id={name}
          className={btnClass}
          onClick={() => dispatch(activeFilterChanged(name))}
        >{label}</button>
      );
    });
  };

  const elements = renderFilters(filters);

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">
          {elements}
        </div>
      </div>
    </div>
  );
};

export default HeroesFilters;