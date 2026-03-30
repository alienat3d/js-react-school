import decoration from '../resources/img/vision.png';
import {useState} from 'react';
import {Helmet} from 'react-helmet';
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary';
import RandomChar from '../components/randomChar/RandomChar';
import CharList from '../components/charList/CharList';
import CharInfo from '../components/charInfo/CharInfo';
import SearchCharacter from '../components/searchCharacter/SearchCharacter';

const HomePage = () => {
  const [selectedChar, setSelectedChar] = useState(null);
  const onCharSelected = id => setSelectedChar(id);

  // 188.4.0 С помощью console.log посмотрим, когда этот компонент рендерится. И вот, когда мы убедились, что по клику на карточке персонажа у нас ререндерится и этот компонент, то мы можем догадаться в чём была причина багом с визуальным выделением персонажа.
  // console.log('render HomePage');
  // (Go to [\src\components\charList\CharList.js])
  return (
    <>
      <Helmet>
        <meta name="description" content="Main page of the Comic Wiki info portal"/>
        <title>Comic Wiki | Home</title>
      </Helmet>
      <ErrorBoundary>
        <RandomChar/>
      </ErrorBoundary>
      <div className="char__content">
        {/* 188.3 И здесь можно заметить, что когда у нас используется CharList, а именно выделяется какая-то карточка персонажей, то id этой карточки сохраняется в стейт этого компонента при помощи "setSelectedChar". ↑ */}
        <ErrorBoundary>
          <CharList onCharSelected={onCharSelected}/>
        </ErrorBoundary>
        <div>
          <ErrorBoundary>
            <CharInfo charId={selectedChar}/>
          </ErrorBoundary>
          <ErrorBoundary>
            <SearchCharacter/>
          </ErrorBoundary>
        </div>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision"/>
    </>
  );
};

export default HomePage;