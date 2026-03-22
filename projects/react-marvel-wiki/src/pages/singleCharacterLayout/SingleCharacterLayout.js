import comicVineLogo from '../../resources/img/comic-vine-logo.jpg';
import {Link} from 'react-router-dom';

const SingleCharacterLayout = ({data, backPath}) => {

  const {pic, name, deck, wiki} = data;

  return (
    <div className="single-page">
      <img src={pic} alt={name} className="single-page__img"/>
      <div className="single-page__info">
        <h2 className="single-page__name">{name}</h2>
        <p className="single-page__descr">{deck}</p>
        <a className="single-page__comicvine-url" href={wiki} target="_blank" rel="noreferrer"><img
          src={comicVineLogo} alt="ComicVine Logo"/></a>
      </div>
      <Link to={backPath} className="button button__main button__long">
        <div className="inner">get back</div>
      </Link>
    </div>
  );
};

export default SingleCharacterLayout;