import decoration from '../../resources/img/vision.png';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
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
          <Switch>
            <Route exact path="/">
              <HomePage/>
            </Route>
            <Route exact path="/all-comics">
              <AllComicsPage/>
            </Route>
          </Switch>
          <img className="bg-decoration" src={decoration} alt="vision"/>
        </main>
      </div>
    </Router>
  );
};

export default App;