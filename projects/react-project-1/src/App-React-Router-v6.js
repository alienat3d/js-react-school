import { BrowserRouter } from "react-router-dom";
import {Routes, Route, Outlet, Link} from 'react-router-dom';

export default function AppReactRouterV6() {
  return (
    <div>
      <h1>Basic Example</h1>

      <p>
        This example demonstrates some of the core features of React Router
        including nested <code>&lt;Route&gt;</code>s,{' '}
        <code>&lt;Outlet&gt;</code>s, <code>&lt;Link&gt;</code>s, and using a
        "*" route (aka "splat route") to render a "not found" page when someone
        visits an unrecognized URL.
      </p>

      {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
      <BrowserRouter>
        {/* 174.2.1 Мы видим здесь у нас один корневой компонент Routes, а в него вложен общий для всех Layout, а в него уже маршруты загружающие разные компоненты разных страниц приложения, причём у главной страницы вместо атрибута "path" - "index". Для страницы "Ошибка 404" есть специальный путь "*". ↓ */}
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home/>}/>
            {/* 174.3 Ну, и благодаря пропу "element" мы теперь можем передавать в компонент свои собственные свойства. Например, представим, что у компонента есть проп "animate": */}
            {/* (Go to [react-course-notes/8-174-react-router-6.md]) */}
            <Route path="about" element={<About animate={true} />}/>
            <Route path="dashboard" element={<Dashboard/>}/>

            {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
            <Route path="*" element={<NoMatch/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function Layout() {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/nothing-here">Nothing Here</Link>
          </li>
        </ul>
      </nav>

      <hr/>

      {/* When using a nested config, routes with children should render an <Outlet> in order to render their child routes. This makes it easy to render layouts with nested UI. */}
      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      {/* 174.2.2 На месте этого компонента Outlet будут появляться разные компоненты страниц, в зависимости от url. ↑ */}
      <Outlet/>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}