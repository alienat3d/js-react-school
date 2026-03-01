import './appHeader.scss';
import {Link, NavLink} from 'react-router-dom';

const AppHeader = () => {
  return (
    <header className="app__header">
      <div className="app__header-inner">
        <h1 className="app__title">
          <Link to="/">
            <span>Comics</span> information portal
          </Link>
        </h1>
        <nav className="app__menu">
          <ul>
            <li><NavLink to="/characters"
                         className={({isActive}) => isActive ? 'app__menu-link--active' : ''}>Characters</NavLink></li>
            /
            <li><NavLink to="/comics"
                         className={({isActive}) => isActive ? 'app__menu-link--active' : ''}>Comics</NavLink></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;