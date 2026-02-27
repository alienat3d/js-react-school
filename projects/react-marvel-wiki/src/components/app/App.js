import decoration from '../../resources/img/vision.png';
import {useState} from 'react';
// import useComicVineService from '../../services/ComicVineService';
import AppHeader from '../appHeader/AppHeader';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
// import ComicsList from '../comicsList/ComicsList';

const App = () => {
  const [selectedChar, setSelectedChar] = useState(null);
  const onCharSelected = id => setSelectedChar(id);
  // const comicVineService = useComicVineService();
  // const triggerBtn = async () => {
  //   const res = await comicVineService.getObjectById(1254);
  //   console.log(res);
  // };

  return (
    <div className="app">
      <AppHeader/>
      {/*<button onClick={triggerBtn}>Click</button>*/}
      <main>
        <ErrorBoundary>
          <RandomChar/>
        </ErrorBoundary>
        <div className="char__content">
          <ErrorBoundary>
            <CharList onCharSelected={onCharSelected}/>
          </ErrorBoundary>
          <ErrorBoundary>
            <CharInfo charId={selectedChar}/>
          </ErrorBoundary>
        </div>
        {/*<ComicsList/>*/}
      <img className="bg-decoration" src={decoration} alt="vision"/>
      </main>
    </div>
  );
};

export default App;