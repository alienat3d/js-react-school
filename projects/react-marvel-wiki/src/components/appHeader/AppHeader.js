import './appHeader.scss';
import AppBanner from '../appBanner/AppBanner';

const AppHeader = () => {
  return (
    <header className="app__header">
      <div className="app__header-inner">
        <h1 className="app__title">
          <a href="/">
            <span>Comics</span> information portal
          </a>
        </h1>
        <nav className="app__menu">
          <ul>
            <li><a href="/">Characters</a></li>
            /
            <li><a href="/">Comics</a></li>
          </ul>
        </nav>
      </div>
      <AppBanner/>
    </header>
  );
};

export default AppHeader;