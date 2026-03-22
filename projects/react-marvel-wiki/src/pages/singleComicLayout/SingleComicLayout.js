import comicVineLogo from '../../resources/img/comic-vine-logo.jpg';
import {Link} from 'react-router-dom';

const SingleComponentLayout = ({data, backPath}) => {

  const {title, description, pageCount, thumbnail, language, coverDate, comicVineUrl} = data;

  return (
    /*<div className="single-comic">
      <img className="single-comic__img" src={thumbnail} alt={title}/>
      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__description">{description}</p>
        <p className="single-comic__description">{pageCount}</p>
        <p className="single-comic__description">Language: {language}</p>
      </div>
      <Link to="comics"/>
    </div>*/
    <div className="single-page">
      <img src={thumbnail} alt={title} className="single-page__img"/>
      <div className="single-page__info">
        <h2 className="single-page__name">{title}</h2>
        <p className="single-page__descr">Date of publishing: {coverDate}</p>
        <p className="single-page__descr" dangerouslySetInnerHTML={{__html: description}}/>
        {pageCount && <p className="single-page__descr">{pageCount} pages</p>}
        {language && <p className="single-page__descr">Language: {language}</p>}
        <a className="single-page__comicvine-url" href={comicVineUrl} target="_blank" rel="noreferrer"><img
          src={comicVineLogo} alt="ComicVine Logo"/></a>
      </div>
        <Link to={backPath} className="button button__main button__long">
          <div className="inner">get back</div>
        </Link>
    </div>
  );
};

export default SingleComponentLayout;