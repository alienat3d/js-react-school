import comicVineLogo from '../../resources/img/comic-vine-logo.jpg';
import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom';

// 185.6 И да, если того требует задача, мы естественно можем вставлять данные динамически. Например, на этой динамически формирующейся из данных, полученных по id комикса информационной странице об отдельном комиксе, логично будет и в заголовок вставить название этого конкретного комикса.
const SingleComponentLayout = ({data, backPath}) => {

  const {title, description, pageCount, thumbnail, language, coverDate, comicVineUrl} = data;

  return (
    <div className="single-page">
      <Helmet>
        <meta name="description" content={`Info about «${title}» comic book`}/>
        <title>«{title}» comic</title>
      </Helmet>
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