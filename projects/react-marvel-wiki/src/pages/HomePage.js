import decoration from '../resources/img/vision.png';
import {useState} from 'react';
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary';
import RandomChar from '../components/randomChar/RandomChar';
import CharList from '../components/charList/CharList';
import CharInfo from '../components/charInfo/CharInfo';
import SearchCharacter from '../components/searchCharacter/SearchCharacter';


const HomePage = () => {
  const [selectedChar, setSelectedChar] = useState(null);
  const onCharSelected = id => setSelectedChar(id);

  return (
    <>
      <ErrorBoundary>
        <RandomChar/>
      </ErrorBoundary>
      <div className="char__content">
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