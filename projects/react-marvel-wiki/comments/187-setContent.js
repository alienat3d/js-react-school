import Skeleton from '../components/skeleton/Skeleton';
import Spinner from '../components/spinner/Spinner';
import ErrorMessage from '../components/errorMessage/ErrorMessage';

// 187.6.1 Изначально мы не знаем, что будет в компоненте View, где-то это будут комиксы, а где-то персонажи или возможно что-то другое. Поэтому мы заменим его пропсы на просто data, а вместо View это будет абстрактный Component. Также укажем его в качестве параметра функции, туда будет попадать ссылка на компонент с вёрсткой, который должен рендериться, если у нас в processState — "SUCCESS".
// (Go to [/src/components/charInfo/CharInfo.js])
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