import {Link} from 'react-router-dom';

const Error404Page = () => {
  return (
    <div className="error404">
      <div className="error404__inner">
        <h1 className="error404__title"><span>Error 404</span>: Page Not Found</h1>
        <strong className="error404__undertitle">Not even the Eye of Uatu sees your request…</strong>
        <p className="error404__text">Check that you typed the address correctly, go back to your previous page or click
          on the button below to return to the homepage.</p>
        <Link to="/" className="button button__main button__long">
          <div className="inner">back home</div>
        </Link>
      </div>
    </div>
  );
};

export default Error404Page;