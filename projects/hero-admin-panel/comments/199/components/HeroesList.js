import {useHttp} from '../../hooks/http.hook';
import {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {heroesFetching, heroesFetched, heroesFetchingError, heroDeleted} from '../../actions';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import Spinner from '../spinner/Spinner';
import HeroesListItem from '../heroesListItem/HeroesListItem';

import './heroesList.scss';
import {createSelector} from 'reselect';

const HeroesList = () => {
    // ? 199.3.6.4 В этом компоненте чуточку посложнее, т.к. используется функционал из двух разных стейтов. На этом моменте вспомним документацию (https://react-redux.js.org/api/hooks#equality-comparisons-and-updates) и до того, как мы коснулись этой темы разделения функции-редьюсера на несколько частей, могло быть непонятно зачем нам нужен функционал по получению всего двух полей из store, т.к. там не объясняется, что функция-редьюсер может быть разделена и теперь нам требуется получать части store по отдельности. И здесь мы логически приходим к этому: нам требуется получить активное значение фильтра из "filters" и список героев из "heroes". Неоптимизированным вариантом здесь будет сформировать объект из двух разных полей и как-то его использовать. Рассмотрим для начала и этот вариант, описанный в документации, тоже. Мы создадим переменную "someState", в которую поместим результат выполнения хука «useSelector». В нём будет коллбэк-функция и она вернёт объект с полями "activeFilter" & "heroes", в которые мы поместим нужные кусочки стейта из разных частей store.
    // ? 199.3.6.5 Однако, во-первых, при таком способе этот компонент будет ререндериться при каждом изменении стейта, т.к. в хуке идёт строгое сравнение объекта, который формируется в useSelector с предыдущим объектом. В итоге объекты у нас никогда не равны и каждый раз, когда компонент будет ререндериться — то переменная someState будет создана заново. Это совсем не здорово, т.к. вызовет просадки по оптимизации и компоненты, которые зависят от этой переменной будут также ререндериться. ↓
    /*const someState = useSelector(state => ({
      activeFilter: state.filters.activeFilter,
      heroes: state.heroes.heroes,
    }))*/

    // ? 199.2.0 Итак, рассмотрим, как можно это сделать иначе. Здесь мы получали массив "filteredHeroes" уже отфильтрованных героев, чтобы затем заполнять им вёрстку. И до этого мы не задействовали хук «useSelector», а часто именно в нём используют какую-то фильтрацию нужных данных. Давайте это исправлять.
    // 199.2.1 Создадим переменную filteredHeroes для помещения в неё массива с отфильтрованными героями. Тут также используем хук «useSelector», который пример коллбэк функцию, куда будет попадать стейт и выполнять фильтрацию прямо внутри хука. Далее мы по сути перепишем то, что у нас было в функции-редьюсере кейса на экшен 'ACTIVE_FILTER_CHANGED'. Пропишем условие, что если в стейте "activeFilter" находится строчное значение "all", то мы вернём весь массив в стейте "heroes", а если значение другое, то проводим фильтрацию: если свойство "element" героя совпадает с выбранным фильтром, то он попадает в отфильтрованный массив.
    // ? 199.2.3.9 Также, теперь мы красиво работаем с хуком «useSelector». Т.е. чтобы отфильтровать героев мы просто внутри этого хука фильтруем получаемые из глобального стейта данные.
    // (Go to [/src/reducers/index.js])
    // ? 199.3.6.6 Ну, а во-вторых, на базе этих данных нам всего лишь нужно вернуть другое значение, поэтому нет смысл возвращать объект. А мы выполняем какие-то действия (см. filteredHeroes чуть ниже), чтобы вернуть какой-то результат. Поэтому, предыдущий вариант нам здесь не подходит. Вместо этого мы применим похожий подход на тот, что мы уже использовали для формирования массива "filteredHeroes", но только чуточку подправим пути к стейту (ведь store у нас теперь разделён на два редьюсера).
    /*const filteredHeroes = useSelector(state => {
      return state.activeFilter === 'all' ?
        state.heroes :
        state.heroes.filter(item => item.element === state.activeFilter);
    });*/
    // 199.3.7.0 И всё ещё такой код остаётся недостаточно оптимизированным, т.к. если мы будем кликать по одному и тому же фильтру, то у нас всё равно будет срабатывать эта функция, т.к. стейт как будто бы обновился (произошёл триггер на обновление) и это легко проверить добавив в код вывод какой-то строки в консоль. И чтобы этого избежать, конечно, нам следует применить мемоизацию. Делать это мы будем при помощи библиотеки "Reselect" и её метода "createSelect". Этот метод внутри себя будет запоминать значение поля и если оно не изменилось с прошлого раза, то ререндера происходить не будет. (Документация этот библиотеки есть в ссылках к уроку.)
    // 199.3.7.1 Рассмотрим синтаксис этой библиотеки на нашем примере. Здесь мы создаём новый селектор с помощью метода "createSelector" библиотеки "Reselect". В этом методе будет две коллбэк-функции, которые будут получать стейт и возвращать какие-то поля из разных разделов store. Здесь у нас вернётся значение текущего активного фильтра и массив с героями. А третьей функции мы можем использовать два этих полученных из предыдущих функций значения стейта, где первым аргументом будет то, что пришло из первой функции (filter), а вторым, что пришло из второй (heroes). И в этой же 3-й функции мы выполняем все те действия, что выполнялись в раньше, в filteredHeroes с использованием хука «useSelector» чуть ниже, но вместо пути к стейту мы уже указываем просто названия, которые мы создали в аргументах для этой функции ("filter" & "heroesArr"), где уже содержаться данные, полученные из стейта.
    // 199.3.7.2 В итоге мы получили функцию-селектор (или просто селектор) — так называют функцию, которая получает какую-то часть из глобального стейта. ↓
    const filteredHeroesSelector = createSelector(
      (state) => state.filters.activeFilter,
      (state) => state.heroes.heroes,
      (filter, heroesArr) => {
        // console.log('render HeroesList');
        return filter === 'all' ?
          heroesArr :
          heroesArr.filter(item => item.element === filter);
      }
    );

    /*const filteredHeroes = useSelector(state => {
      // console.log('render HeroesList');
      return state.filters.activeFilter === 'all' ?
        state.heroes.heroes :
        state.heroes.heroes.filter(item => item.element === state.filters.activeFilter);
    });*/
    // 199.2.2 Здесь мы уже вернём только один стейт.
    // (Go to [projects/hero-admin-panel/src/reducers/index.js])

    // 199.3.7.3 Далее мы формируем массив отфильтрованных для рендеринга героев при помощи хука «useSelector», но внутрь поместим подготовленную и мемоизированную функцию-селектор "filteredHeroesSelector". Всё, проблема с лишними ререндерами компонентов решена, а код у нас оптимизирован.
    const filteredHeroes = useSelector(filteredHeroesSelector);

    const heroesLoadingStatus = useSelector(state => state.heroesLoadingStatus);
    // const {filteredHeroes, heroesLoadingStatus} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
      dispatch(heroesFetching());
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