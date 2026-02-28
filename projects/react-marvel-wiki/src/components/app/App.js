import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {HomePage, AllComicsPage} from '../../pages';
import AppHeader from '../appHeader/AppHeader';
// import useComicVineService from '../../services/ComicVineService';

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
            <Route path="/all-comics" element={<AllComicsPage/>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;