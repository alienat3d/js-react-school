import {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Route, Routes, useMatch} from 'react-router-dom';
import AppHeader from '../appHeader/AppHeader';
import Spinner from '../spinner/Spinner';

const Error404Page = lazy(() => import('../../pages/error404/Error404Page'));
const HomePage = lazy(() => import('../../pages/HomePage'));
const ComicsPage = lazy(() => import('../../pages/ComicsPage'));
// const SingleComicPage = lazy(() => import('../../pages/SingleComicPage'));
const SingleComicLayout = lazy(() => import('../../pages/singleComicLayout/SingleComicLayout'));
const SingleCharacterLayout = lazy(() => import('../../pages/singleCharacterLayout/SingleCharacterLayout'));
const SinglePage = lazy(() => import('../singlePage/SinglePage'));

const AppContent = () => {
  // На случай, если понадобится получить в консоль объект со всеми данными персонажа.
  /*    const comicVineService = useComicVineService();
      const triggerBtn = async () => {
        const res = await comicVineService.getObjectById(1254);
        console.log(res);
      };*/

  const matchComic = useMatch('/comics/:id');
  const matchChar = useMatch('/characters/:id');

  return (
    <div className="app">
      {!(matchComic || matchChar) && <AppHeader/>}
      {/*<button onClick={triggerBtn}>Click</button>*/}
      <main>
        <Suspense fallback={<Spinner/>}>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/comics" element={<ComicsPage/>}/>
            <Route path="/comics/:id"
                   element={<SinglePage Component={SingleComicLayout} dataType="comic"/>}/>
            <Route path="/characters/:id"
                   element={<SinglePage Component={SingleCharacterLayout} dataType="character"/>}/>
            <Route path="*" element={<Error404Page/>}/>
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

const App = () => {
  return (
    // Добавил атрибут "future" сюда, чтобы избавиться от предупреждений в консоли, т.к. этот проект использует React Router v.6
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppContent/>
    </Router>
  );
};

export default App;