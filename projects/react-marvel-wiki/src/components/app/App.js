import {BrowserRouter as Router, Route, Routes, useMatch} from 'react-router-dom';
import {HomePage, ComicsPage, SingleComicPage, Error404Page} from '../../pages';
import AppHeader from '../appHeader/AppHeader';
// import useComicVineService from '../../services/ComicVineService';

const AppContent = () => {
  /*  const comicVineService = useComicVineService();
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
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/comics" element={<ComicsPage/>}/>
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