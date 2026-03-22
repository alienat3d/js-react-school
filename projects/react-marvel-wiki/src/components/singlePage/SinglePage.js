import {useLocation, useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import useComicVineService from '../../services/ComicVineService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import AppBanner from '../appBanner/AppBanner';

// ? 185.0 Здесь мы создали универсальный компонент страницы, подходящий одновременно как для страницы информации об одном комиксе, так и для страницы информации об одном персонаже комиксов, т.к. эти страницы очень похожи, то определённо есть смысл сделать подобный рефакторинг. Логика у них также похожа — по id мы получаем информацию либо о комиксе, либо о персонаже. И затем можем её перенести в вёрстку.
const SinglePage = ({Component, dataType}) => {
  // 185.1.0 Здесь у нас будет храниться id из адреса страницы.
  const {id} = useParams();
  // 185.1.1 Здесь хранилище каких-то данных (т.к. компонент универсальный, то мы не уточняем какие данные).
  const [data, setData] = useState(null);
  // 185.1.2 Ну, и как раньше нам понадобятся все сущности из нашего сервисного хука. ↓
  const {loading, error, getComic, getCharacter, clearError} = useComicVineService();

  const location = useLocation();

  const backPath = location.state?.from || '/';

  // // 185.1.4 Приходят данные, которые мы записываем в стейт. ↓
  const onDataLoaded = (data) => setData(data);

  // 185.1.3.1 А внутри, при помощи switch case, по-приходящему в компонент "dataType" будет решаться какой метод вызывать для комикса или для персонажа. ↑
  const updateData = () => {
    clearError();

    switch (dataType) {
      case 'comic':
        getComic(id).then(onDataLoaded);
        break;
      case 'character':
        getCharacter(id).then(onDataLoaded);
        break;
      default:
        break;
    }
  };

  // 185.1.3.0 Здесь, когда компонент создастся или id обновится, то будет запускаться функция "updateData" посылающая запрос на сервер за данными о комиксе или персонаже. ↑
  // eslint-disable-next-line
  useEffect(() => updateData(), [id]);

  // 185.1.5.0 Ну, а дальше, по известной уже схеме, мы отобразим либо индикатор загрузки, либо рендер страницы, либо ошибку, если что-то пошло не так во время запроса на сервер.
  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading ? <Spinner/> : null;
  // 185.1.5.1 В контенте мы изначально не знаем, что это будет за компонент (для комикса или для персонажа), его мы также будем передавать через пропсы в компонент, как и dataType.
  // (Go to [App.js])
  const content = !(loading || error || !data) ? <Component data={data} backPath={backPath}/> : null;

  return (
    <>
      <AppBanner/>
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};

export default SinglePage;