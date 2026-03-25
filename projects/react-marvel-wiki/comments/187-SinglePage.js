import {useLocation, useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import useComicVineService from '../../services/ComicVineService';
import setContent from '../../utils/setContent';
// import ErrorMessage from '../errorMessage/ErrorMessage';
// import Spinner from '../spinner/Spinner';
import AppBanner from '../appBanner/AppBanner';

// 187.10.0 Один из последних "сетевых компонентов" с логикой загрузки данных с сервера, который нам нужно также переделать под работу со стейт-машиной. Это также компонент с простой логикой, как в CharInfo & RandomChar. ↓
const SinglePage = ({Component, dataType}) => {
  const {id} = useParams();
  const [data, setData] = useState(null);
  // const {loading, error, getComic, getCharacter, clearError} = useComicVineService();
  // 187.10.1 Всё, как и в предыдущих компонентах, избавляемся от loading & error, которые с новой концепцией не нужны и добавляем вместо них стейт processState и метод изменения этого стейта. ↓
  const {processState, setProcessState, getComic, getCharacter, clearError} = useComicVineService();

  const location = useLocation();

  const backPath = location.state?.from || '/';

  const onDataLoaded = (data) => setData(data);

  // 187.10.2 Здесь нам нужно в обоих случаях добавить ручное переключение стейта стейт-машины в 'SUCCESS'.
  const updateData = () => {
    clearError();

    switch (dataType) {
      case 'comic':
        getComic(id).then(onDataLoaded).then(() => setProcessState('SUCCESS'));
        break;
      case 'character':
        getCharacter(id).then(onDataLoaded).then(() => setProcessState('SUCCESS'));
        break;
      default:
        break;
    }
  };

  // eslint-disable-next-line
  useEffect(() => updateData(), [id]);

  /* const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading ? <Spinner/> : null;
  const content = !(loading || error || !data) ? <Component data={data} backPath={backPath}/> : null; */

  return (
    <>
      <AppBanner/>
      {/*{errorMessage}
      {spinner}
      {content}*/}
      {/* 187.10.3 А здесь мы вновь запустим функцию setContent, но вторым аргументом у нас уже пойдёт Component с нужными пропсами. */}
      {/* (Go to [/src/hooks/http.hook.js]) */}
      {setContent(processState, Component, {data: data, backPath})}
    </>
  );
};

export default SinglePage;