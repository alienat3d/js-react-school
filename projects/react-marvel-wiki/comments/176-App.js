import {lazy, Suspense, useState} from 'react';
import {BrowserRouter as Router, Route, Routes, useMatch} from 'react-router-dom';
// import {HomePage, ComicsPage, SingleComicPage} from '../../pages';
import AppHeader from '../appHeader/AppHeader';
import Spinner from '../spinner/Spinner';
// import useComicVineService from '../../services/ComicVineService';
// ? 176.4.0 От нативного JS перейдём к Реакту, у которого тоже есть свой способ динамической загрузки компонентов (также называемый "ленивой загрузкой") метод React.lazy (см. ссылки). Этот метод также делает динамический импорт компонентов и имеет ряд нюансов использования. Например, компонент, подгружаемый через React.lazy должен экспортировать с помощью default.
// 176.4.1 Логично будет рассмотреть механизм работы на компоненте ошибки 404, т.к. он используется не часто. И для динамического импорта нам нужно выделить её в отдельный импорт, т.к. до сих пор мы импортировали её через именованный реэкспорт при помощи index. Также важно вставлять динамические импорты под статическими и помещать в константу, т.к. это вызов метода "import" в обёртке метода Реакта "lazy".
// 176.4.2 Ещё один важный момент, при использовании метода lazy, что в отличие от нативного способа динамического импорта, здесь вместо блока "catch" для отлова ошибок нужно использовать компонент "Suspense". А именно он должен служить обёрткой для того комп., который мы загружаем ленивой загрузкой с помощью "lazy". ↓
const Error404Page = lazy(() => import('../../pages/Error404Page'));
// 176.4.4 Добавим динамический импорт и других страниц включая главную (т.к. пользователи теоретически могут попадать на сайт сразу на другие страницы по ссылке и им не обязательно загружать код с главной, ведь они могут до неё даже не добраться).
// (Go to [react-course-notes/8-176-dynamic-imports-n-reactlazy.md])
const HomePage = lazy(() => import('../../pages/HomePage'));
const ComicsPage = lazy(() => import('../../pages/ComicsPage'));
const SingleComicPage = lazy(() => import('../../pages/SingleComicPage'));

const AppContent = () => {
  /*    const comicVineService = useComicVineService();
      const triggerBtn = async () => {
        const res = await comicVineService.getObjectById(1254);
        console.log(res);
      };*/

  const matchComic = useMatch('/comics/:comicId');
  const matchChar = useMatch('/characters/:charId');

  const [loggerActive, setLoggerActive] = useState(false);

  const handleClick = () => {
    setLoggerActive(!loggerActive);
  };

  // ? 176.1.1 В отличие от обычных импортов это уже вызов функции import. Динамический import возвращает промис с объектом модуля. И этот промис следует обработать в методе then в коллбэк-функции поместим этот объект и из него запусти функцию logger. Ведь, если вспомнить базовую теорию JS: Если мы что-то экспортируем из файла, то экспортируется объект в котором каждая именованная экспортируемая функция — это свойство/метод этого объекта. Если же мы экспортируем со словом default, тогда экспортируется объект с одним свойство default, в котором лежит всё содержимое.
  // 176.1.2 Также не забудем и про catch для отлова ошибок.
  if (loggerActive) {
    /*    import('../../loggerFunc')
          .then(obj => obj.logger())
          .catch(err => console.error(err));*/

    // 176.3 Рассмотрим ещё случай, если у нас функция в loggerFunc.js экспортируется со словом default. Тогда мы уже обращаемся не к названию функции, а к свойству default объекта, т.к. именно там будет лежать импортируемая функция. ↑
    import('../../loggerFunc')
      .then(obj => obj.default())
      .catch(err => console.error(err));
  }

  // 176.2.0 Бывает, что нам нужно импортировать несколько функций из одного файла в одно место, тогда прибегнем к деструктуризации объекта. Однако, стоит помнить, что делать нам надо это внутри асинхронной функции (ведь мы не знаем как быстро они найдутся и запустятся), поэтому используем async...await.
  /*  const testAsyncFunction = async () => {
      const {logger, anotherFunc} = await import('../../loggerFunc');

      // 176.2.1 Теперь мы можем использовать две разные функции из одного файла. ↑
      logger();
      anotherFunc();
    };*/

  return (
    <div className="app">
      {!(matchComic || matchChar) && <AppHeader/>}
      {/*<button onClick={triggerBtn}>Click</button>*/}
      {/* 176.1.0 Для наглядного примера мы создадим простую тестовую функцию в корне проекта, запуск которой мы будем по клику вызывать через смену стейта "loggerActive" с булевым значением по условию (до этого момента она загружаться не будет). ↑ */}
      <button onClick={handleClick}>Click</button>
      <main>
        {/* 176.4.3 Оборачиваем всё в Suspense, который имеет атрибут "fallback" для заглушки, опционально показываемую, пока грузится динамический импорт. Там может быть как компонент, так и просто элемент вёрстки. ↑ */}
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/comics" element={<ComicsPage/>}/>
            <Route path="/comics/:comicId" element={<SingleComicPage/>}/>
            <Route path="*" element={<Error404Page/>}/>
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent/>
    </Router>
  );
};

export default App;