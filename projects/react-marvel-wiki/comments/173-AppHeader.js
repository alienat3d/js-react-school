import './appHeader.scss';
import {Link, NavLink} from 'react-router-dom';

// 173.4 Ещё нам нужно модифицировать нашу шапку, чтобы её ссылки наконец заработали. В этом нам поможет компонента Реакт Рутера, который называется Link, им мы и заменим все ссылки здесь. И привычный ссылочный атрибут "href" теперь заменяем на реактовский "to".
// 173.5 На самом деле лучше здесь в навигационном элементе применить компонент NavLink для навигации, чтобы можно было стилизовать активную ссылку. Укажем в атрибуте специальным атрибутом "activeClassName" класс, который будет стилизовать активную ссылку.
// ? 173.6 Кстати, если нужно, то и здесь можно прописать атрибут exact для полной проверки значения атрибута "to" для правильной стилизации активной ссылки (если бы у нас была одна из ссылок "/"), но в нашем случае это не требуется.
// 173.7.0 Ну и для удобства принято создавать в отдельной папке ("pages") компоненты страниц, содержащие все компоненты, которые должны показываться на данной странице.
// (Go to [/src/pages/HomePage.js])
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
            <li><NavLink to="/all-characters" activeClassName="app__menu-link--active">Characters</NavLink></li>
            /
            <li><NavLink to="/all-comics" activeClassName="app__menu-link--active">Comics</NavLink></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;