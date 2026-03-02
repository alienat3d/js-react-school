import {BrowserRouter as Router, Route, Routes, useMatch} from 'react-router-dom';
import {HomePage, ComicsPage, SingleComicPage, Error404Page} from '../../pages';
import AppHeader from '../appHeader/AppHeader';
// import useComicVineService from '../../services/ComicVineService';

// 175.0 Пока что, если ввести какой-то несуществующий URL в адресную строку у нас ничего не происходит, это тоже надо исправить. Однако что именно должно происходить нужно оговаривать с заказчиком, т.к. порой задача, чтобы по любому несуществующему URL пользователя перекидывало на главную, тогда достаточно Route с путём на главную страницу поместить в конец списка страниц. Но также может быть задача показывать стилизованную страницу ошибки 404. В этом случае мы создаём отдельный компонент со специальным Route у которого путь "*".
// 175.1.0 Ок, страница ошибки 404 у нас готова и подключена, теперь займёмся созданием динамически формируемых страниц подробного описания комикса со страницы "Comics". ↓
const AppContent = () => {
  /*  const comicVineService = useComicVineService();
    const triggerBtn = async () => {
      const res = await comicVineService.getObjectById(1254);
      console.log(res);
    };*/
  // 175.2.0 Напишем условие, чтобы не отображать шапку на странице отображения комикса с помощью хука Реакт Рутера «useMatch».
  const matchComic = useMatch('/comics/:comicId');
  // 175.2.1 Также добавим с заделом на будущее паттерн и для страницы описания персонажа.
  const matchChar = useMatch('/characters/:charId');

  /* ? 175.2.3 Кстати, если бы нам требовалось добавить больше страниц, например 5-10, то для удобства можно было бы использовать и подобную схему с хуком «useLocation»:
  const { pathname } = useLocation();

  175.2.4 Создадим массив строк к путям, где шапка должна скрываться
  const hiddenRoutes = ['/comics/:id', '/characters/:id'];

  175.2.5 Проверим, что текущий URL попадает в один из паттерн в нашем массиве
  const isHidden = hiddenRoutes.some(path => matchPath({ path, exact: true }, pathname)); */
  // (Go to [/src/components/singleComic/SingleComic.js])

  return (
    <div className="app">
      {/* 175.2.2 ↑ */}
      {!(matchComic || matchChar) && <AppHeader/>}
      {/*<button onClick={triggerBtn}>Click</button>*/}
      <main>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/comics" element={<ComicsPage/>}/>
          {/* 175.1.1 Сразу создадим динамический путь для отображения информации об отдельных комиксах. */}
          <Route path="/comics/:comicId" element={<SingleComicPage/>}/>
          <Route path="*" element={<Error404Page/>}/>
        </Routes>
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