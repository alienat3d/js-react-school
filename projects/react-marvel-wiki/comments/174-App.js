import decoration from '../../resources/img/vision.png';
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
          {/* 174.1.1 Меняем Switch на Routes. У компонента Routes был изменён алгоритм сравнивания значения атрибута "path" у компонентов Route и теперь уже для правильной работы им атрибут "exact" не требуется (точнее его уже не существует в v.6). */}
          {/* (Go to [react-course-notes/8-174-react-router-6.md]) */}
          {/*<Switch>*/}
          <Routes>
            {/* 174.1.2 Ещё одно изменение в React Router v.6 это, что компоненты страниц у нас теперь не вкладываются в компонент Route, а прописываются значением в атрибут "element". */}
            {/*<Route exact path="/">
              <HomePage/>
            </Route>
            <Route exact path="/all-comics">
              <AllComicsPage/>
            </Route>*/}
            <Route path="/" element={<HomePage/>} />
            <Route path="/all-comics" element={<AllComicsPage/>} />
          </Routes>
          {/*</Switch>*/}
          <img className="bg-decoration" src={decoration} alt="vision"/>
        </main>
      </div>
    </Router>
  );
};

export default App;