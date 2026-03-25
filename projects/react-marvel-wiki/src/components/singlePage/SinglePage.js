import {useLocation, useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import useComicVineService from '../../services/ComicVineService';
import setContent from '../../utils/setContent';
import AppBanner from '../appBanner/AppBanner';

const SinglePage = ({Component, dataType}) => {
  const [data, setData] = useState(null);
  const {processState, setProcessState, getComic, getCharacter, clearError} = useComicVineService();

  const {id} = useParams();
  const location = useLocation();
  const backPath = location.state?.from || '/';

  const onDataLoaded = (data) => setData(data);

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

  return (
    <>
      <AppBanner/>
      {setContent(processState, Component, {data: data, backPath})}
    </>
  );
};

export default SinglePage;