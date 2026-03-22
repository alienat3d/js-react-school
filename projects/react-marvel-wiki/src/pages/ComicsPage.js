import {Helmet} from 'react-helmet';
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary';
import AppBanner from '../components/appBanner/AppBanner';
import ComicsList from '../components/comicsList/ComicsList';

// 185.5 Нас интересуют именно файлы страниц, т.к. логично, что именно страницы отвечают за изменение этой информации. Снова импортируем используемый библиотекой комп. Helmet и вставляем его сверху, где изменим содержимое тегов.
// (Go to [projects/react-marvel-wiki/src/pages/singleComicLayout/SingleComicLayout.js])
const ComicsPage = () => {
  return (
    <>
      <Helmet>
        <meta name="description" content="List of all comics in the DB"/>
        <title>Comic Wiki | Comics List</title>
      </Helmet>
      <AppBanner/>
      <ErrorBoundary>
        <ComicsList/>
      </ErrorBoundary>
    </>
  );
};

export default ComicsPage;