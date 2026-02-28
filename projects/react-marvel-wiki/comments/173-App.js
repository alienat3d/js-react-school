import decoration from '../../resources/img/vision.png';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

// 173.8.2 Теперь здесь мы можем существенно сократить импорт страниц (особенно, если бы их было не всего 2, а например 20).
/* import HomePage from '../../pages/HomePage';
import AllComicsPage from '../../pages/AllComicsPage'; */
import {HomePage, AllComicsPage} from '../../pages';

/* 173.8.3 Или можно даже импортировать так, но тогда придётся прописывать компоненты страниц "<pages.HomePage/>" и т.п.
import * as pages from '../../pages'; */

import AppHeader from '../appHeader/AppHeader';

// import {useState} from 'react';
// import useComicVineService from '../../services/ComicVineService';
// import ErrorBoundary from '../errorBoundary/ErrorBoundary';
// import RandomChar from '../randomChar/RandomChar';
// import CharList from '../charList/CharList';
// import CharInfo from '../charInfo/CharInfo';
// import ComicsList from '../comicsList/ComicsList';
// import AppBanner from '../appBanner/AppBanner';

const App = () => {
  /*  const [selectedChar, setSelectedChar] = useState(null);
    const onCharSelected = id => setSelectedChar(id);*/
  // const comicVineService = useComicVineService();
  // const triggerBtn = async () => {
  //   const res = await comicVineService.getObjectById(1254);
  //   console.log(res);
  // };

  // 173.1 Router это ключевой компонент в рутинге, в который мы будем оборачивать те компоненты, куда впоследствии будет переходить пользователь по клику на ссылки. По сути, он и есть некий маршрутизатор, внутри которого будут работать все ссылки. Он будет получать сигнал от ссылок "Route" и показывать нужный компонент.
  return (
    <Router>
      <div className="app">
        <AppHeader/>
        {/*<button onClick={triggerBtn}>Click</button>*/}
        <main>
          {/* 173.2 Route у нас как раз отвечают за сигналы, которые передают маршрутизатору Router, что нужно показывать их содержимое на странице. Связывать с конкретными url мы их будем при помощи атрибута "path". "/" — означает главную страницу приложения. */}
          {/* 173.3.0 Ещё часто нам нужно комбинировать разные компоненты, например загрузить главную страницу, но при успешной авторизации пользователя, также загрузить компонент с описанием данных пользователя и/или компонент управления доступного авторизированным пользователям, но недоступного не авторизированным гостям. Это называется «композиция». С этим работает "Switch". */}
          {/* 173.3.1 Т.е. Switch анализирует дочерние компоненты Route, а именно их атрибуты path и загружает первый, который совпадает с url (т.к. идёт не точное сравнение, а только части строки, то главная страница должна идти последней в списке, т.к. "/" есть у каждого path вначале). */}
          {/* 173.3.2 Однако, есть также и другой способ,
           без того, чтобы переставлять компоненты главной страницы в конец — добавить в Route перед атрибутом path атрибут exact. Тогда Switch будет искать полное совпадение пути и Route главной страницы можно оставить сверху. */}
          {/* (Go to [/src/components/appHeader/AppHeader.js]) */}
          <Switch>
            <Route exact path="/">
              {/*<ErrorBoundary>
                <RandomChar/>
              </ErrorBoundary>
              <div className="char__content">
                <ErrorBoundary>
                  <CharList onCharSelected={onCharSelected}/>
                </ErrorBoundary>
                <ErrorBoundary>
                  <CharInfo charId={selectedChar}/>
                </ErrorBoundary>
              </div>*/}
              <HomePage/>
            </Route>
            <Route exact path="/all-comics">
              {/* <AppBanner/>
              <ErrorBoundary>
                <ComicsList/>
              </ErrorBoundary>*/}
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