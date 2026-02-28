// 173.7.1 Перенесём сюда из [App.js] всё, что требуется для главной страницы, включая импорты, функции и стейты.
// 173.8.0 Перед завершением этого урока, взглянем на ещё один популярный приём, для этого создадим новый файл index.js в папке страниц "pages".
// (Go to [/src/pages/index.js])
import {useState} from 'react';
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary';
import RandomChar from '../components/randomChar/RandomChar';
import CharList from '../components/charList/CharList';
import CharInfo from '../components/charInfo/CharInfo';


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
        <ErrorBoundary>
          <CharInfo charId={selectedChar}/>
        </ErrorBoundary>
      </div>
    </>
  );
};

export default HomePage;