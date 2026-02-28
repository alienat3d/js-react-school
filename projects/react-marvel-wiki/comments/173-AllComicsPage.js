import ErrorBoundary from '../components/errorBoundary/ErrorBoundary';
import AppBanner from '../components/appBanner/AppBanner';
import ComicsList from '../components/comicsList/ComicsList';

const AllComicsPage = () => {
  return (
    <>
      <AppBanner/>
      <ErrorBoundary>
        <ComicsList/>
      </ErrorBoundary>
    </>
  );
};

export default AllComicsPage;