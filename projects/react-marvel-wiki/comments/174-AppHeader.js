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
          {/* 174.7.1 Заменим версию для React Router v.5 на более новую для v.6+ */}
          <ul>
            {/*<li><NavLink to="/all-characters" activeClassName="app__menu-link--active">Characters</NavLink></li>
            /
            <li><NavLink to="/all-comics" activeClassName="app__menu-link--active">Comics</NavLink></li>*/}
             {/*Пример с инлайн-стилями в v.6:
            <li>
              <NavLink to="/all-characters"
                       style={({isActive}) => ({color: isActive ? 'green' : 'inherit'})}>
                Characters
              </NavLink>
            </li>*/}
            <li><NavLink to="/all-characters"
                         className={({isActive}) => isActive ? 'app__menu-link--active' : ''}>Characters</NavLink></li>
            /
            <li><NavLink to="/all-comics"
                         className={({isActive}) => isActive ? 'app__menu-link--active' : ''}>Comics</NavLink></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;