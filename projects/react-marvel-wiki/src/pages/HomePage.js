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

  // 185.4 Здесь, на главной странице приложения мы добавим компонент библиотеки Helmet. И если, скажем, нам нужно менять на разных страницах title и мета-теги "name" & "content", то добавим их внутрь комп. Helmet. И мы сразу увидим, что заголовок закладки меняется, когда мы меняем содержимое тега title. Сделаем также и на других страницах.
  // (Go to [projects/react-marvel-wiki/src/pages/ComicsPage.js])
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