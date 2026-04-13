import {useHttp} from '../../hooks/http.hook';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import classNames from 'classnames';
// import { filtersFetching, filtersFetched, filtersFetchingError, activeFilterChanged } from '../../actions';
import {fetchFilters, activeFilterChanged} from '../../actions';
import Spinner from '../spinner/Spinner';

const HeroesFilters = () => {
  const {filters, filtersLoadingStatus, activeFilter} = useSelector(state => state.filters);
  const dispatch = useDispatch();
  const {request} = useHttp();

  // 203.5.2 Ну, а здесь мы импортируем новый action creator и применим, который будет включать в себя весь закомментированный код.
  useEffect(() => {
    /*dispatch(filtersFetching());
    request('http://localhost:3001/filters')
      .then(data => dispatch(filtersFetched(data)))
      .catch(() => dispatch(filtersFetchingError()));*/
    dispatch(fetchFilters(request));
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

    return arr.map(({name, className, label}) => {

      const btnClass = classNames('btn', className, {
        'active': name === activeFilter
      });

      // 203.3.0 Теперь рассмотрим два случая: один будет тестовый, а другой реальный. Представим, что у нас есть задача: нужно сделать так, чтобы фильтры переключались с задержкой, т.е. не сразу, а спустя пол секунды после нажатия на кнопку. Без middleware нам пришлось бы функцию, которая вызывается в обработчике события клик на кнопках обернуть в метод "setTimeout". Но это не самое красивое решение и лучше сделать это более централизовано.
      // (Go to [/src/actions/index.js])
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