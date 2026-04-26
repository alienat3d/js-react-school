import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import classNames from 'classnames';
// 209.10.6 Теперь здесь мы импортируем метод "selectAll" из слайса фильтров и переименуем его в "selectAllFilters" для наглядности. ↓
import {fetchFilters, activeFilterChanged, selectAll as selectAllFilters} from './filtersSlice';
import Spinner from '../spinner/Spinner';

const HeroesFilters = () => {
  // 209.10.7 Здесь же, нам уже нужно в метод "useSelector" помещать то, что извлечёт метод "selectAll" в объекте-адаптере в слайсе, т.к. структура у нас поменялась и иначе у нас будет в filters попадать не массив, а объект и вызывать ошибку далее в коде.
  // (Go to [/src/components/heroesAddForm/HeroesAddForm.js])
  // const {filters, filtersLoadingStatus, activeFilter} = useSelector(state => state.filters);
  /* ? Кстати, если бы мы не использовали Redux с React'ом, то нам бы пришлось импортировать store и получать массив фильтров чуть иначе:
  * const filters = selectAll(store.getState()); */
  const filters = useSelector(selectAllFilters);
  const {filtersLoadingStatus, activeFilter} = useSelector(state => state.filters);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFilters());
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