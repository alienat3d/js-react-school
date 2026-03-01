import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {HomePage, ComicsPage, SingleComicPage, Error404Page} from '../../pages';
import AppHeader from '../appHeader/AppHeader';
// import useComicVineService from '../../services/ComicVineService';

// 175.0 Пока что, если ввести какой-то несуществующий URL в адресную строку у нас ничего не происходит, это тоже надо исправить. Однако что именно должно происходить нужно оговаривать с заказчиком, т.к. порой задача, чтобы по любому несуществующему URL пользователя перекидывало на главную, тогда достаточно Route с путём на главную страницу поместить в конец списка страниц. Но также может быть задача показывать стилизованную страницу ошибки 404. В этом случае мы создаём отдельный компонент со специальным Route у которого путь "*".
// 175.1.0 Ок, страница ошибки 404 у нас готова и подключена, теперь займёмся созданием динамически формируемых страниц подробного описания комикса со страницы "Comics".
// (Go to [/src/components/comicsList/ComicsList.js])
const App = () => {
  /*  const comicVineService = useComicVineService();
    const triggerBtn = async () => {
      const res = await comicVineService.getObjectById(1254);
      console.log(res);
    };*/

  return (
    <Router>
      <div className="app">
        <AppHeader/>
        {/*<button onClick={triggerBtn}>Click</button>*/}
        <main>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/comics" element={<ComicsPage/>} />
            <Route path="/comics/:comicId" element={<SingleComicPage />} />
            <Route path="*" element={<Error404Page/>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;