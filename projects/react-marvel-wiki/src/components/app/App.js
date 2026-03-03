import {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Route, Routes, useMatch} from 'react-router-dom';
import AppHeader from '../appHeader/AppHeader';
import Spinner from '../spinner/Spinner';

const Error404Page = lazy(() => import('../../pages/Error404Page'));
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

  return (
    <div className="app">
      {!(matchComic || matchChar) && <AppHeader/>}
      {/*<button onClick={triggerBtn}>Click</button>*/}
      <main>
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