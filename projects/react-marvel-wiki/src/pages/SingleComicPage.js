import ErrorBoundary from '../components/errorBoundary/ErrorBoundary';
import SingleComic from '../components/singleComic/SingleComic';

const SingleComicPage = () => {
  return (
    <>
      <ErrorBoundary>
        <SingleComic/>
      </ErrorBoundary>
    </>
  );
};

export default SingleComicPage;