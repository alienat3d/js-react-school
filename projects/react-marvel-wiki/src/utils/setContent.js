import Skeleton from '../components/skeleton/Skeleton';
import Spinner from '../components/spinner/Spinner';
import ErrorMessage from '../components/errorMessage/ErrorMessage';

const setContent = (processState, Component, data) => {
  switch (processState) {
    case 'IDLE':
      return <Skeleton/>;
    case 'LOADING':
      return <Spinner/>;
    case 'ERROR':
      return <ErrorMessage/>;
    case 'SUCCESS':
      return <Component {...data}/>;
    default:
      throw new Error('Unexpected process state');
  }
};

export default setContent;