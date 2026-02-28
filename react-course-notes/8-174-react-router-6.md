*[React Router v6 (174)]*

? 174.0 Здесь мы рассмотрим миграцию с 5-й на 6-ю версию Реакт Рутер и какие появились изменения и новые фичи в ней. 
174.1.0 И начнём с того, что Switch в 6-й версии Реакт Рутера заменён на Routes.

Рассмотрим на практическом примере: [\projects\react-marvel-wiki\comments\174-App.js]

174.2.0 Также в v.6 добавился новый компонент Outlet, он требуется для комбинирования компонентов в зависимости от условий (вспоминаем прошлый урок, где мы рассматривали Switch). 
<script>
import {Outlet} from 'react-router-dom'; 

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                // В маршруте Users вложены ещё два маршрута. И теперь в зависимости от того, что у нас в url будет отображаться либо OwnUserProfile (url: site.com/users/me), либо UserProfile (url: site.com/users/динамический id пользователя)
                <Route path="users" element={<Users />}>
                    <Route path="me" element={<OwnUserProfile />} />
                    <Route path=":id" element={<UserProfile />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

// Чтобы правильно отрендерить такой вот вложенный компонент и совместить его с другими нам потребуется место, где можно его разместить. И как раз для этого нужен комп. Outlet, без которого эта вложенность работать не будет.
function Users() {
    return (
        <div>
            <nav>
                <Link to="me">My Profile</Link>
            </nav>

            <Outlet />
        </div>
    );
}
</script>


Чтобы более подробно рассмотреть этот механизм рутинга с Outlet создадим новый небольшой компонент в нашем проекте-песочнице (также ссылка на копию есть по ссылке ↓): []

174.4.0 В v.6 не только маршруты, но и ссылки стали относительными. В 5-й версии, работая с вложенными друг в друга компонентами можно было столкнуться с проблемой, связанной с путями ссылок. Например, в м 5-й версии, если бы мы находились на странице c URL: "site.com/users", а <Link to="me">, то он бы рендерил <a href="/me">, но если бы URL оканчивался бы "/" ("site.com/users/), то тогда тот же компонент Link рендерил бы <a href="/users/me">. Из-за этого могла бы происходить путаница и ссылки вели бы не туда, куда задумывалось. Т.ч. прибегали к ухищрению вроде создания ссылок от корневого URL при помощи конструкции "match.url". В v.6 это исправили и Link будет рендерить всегда один и тот же <a href="...">, независимо от текущего URL.

<script>
//
function App() {
    return (
        <Routes>
            // 174.4.1 Например, у нас есть здесь родительский маршрут с путём "users" и внутри него есть ещё один маршрут с динамическим id.
            <Route path="users" element={<Users />}>
                <Route path=":id" element={<UserProfile />}>
            </Route>
        </Routes>
    );
}

// 174.4.2 А этот компонент Users рендерится внутри этого маршрута вверху. Внутри этого компонента есть ссылки.
function Users() {
    return (
        <div>
            <h2>
                // 174.4.3 Этот Link с точкой в пути ведён на "/users" — текущий маршрут
                <Link to=".">Users</Link>
            </h2>

            <ul>
                {users.map(user => (
                    <li>
                        // 174.4.4 Этот Link ведёт на "/users/:id" — дочерний маршрут с динамически подставляемым id из данных о пользователе
                        <Link to={user.id}>{user.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function UserProfile() {
    return (
        <div>
            <h2>
                // 174.4.5 Этот Link с путём ".." ведёт на "/users" — родительский маршрут
                <Link to="..">All Users</Link>
            </h2>

            <h2>
                // 174.4.6 Этот Link ведёт на "/users/:id" — текущий маршрут
                <Link to=".">User Profile</Link>
            </h2>

            <h2>
                // 174.4.7 Этот Link ведёт "/users/mj" — соседний маршрут
                <Link to="../mj">MJ</Link>
            </h2>
        </div>
    );
}
</script>

// ? 174.4.8 Можно думать о текущем URL, будто это путь к папке в файловой системе, а <Link to> словно команда "cd", которую мы вводим в терминал для перехода к папке.

// 174.5 Ещё одна замена произошла при переходе с v.5 на v.6 хук «useHistory» был заменён на «useNavigate»:

// React Router v5:
<script>
import { useHistory } from "react-router-dom";

function App() {
    let history = useHistory();
    function handleClick() {
        history.push("/home");
    }
    return (
        <div>
            <button onClick={handleClick}>go home</button>
        </div>
    );
}
</script>

// React Router v6:
<script>
import { useNavigate } from "react-router-dom";

function App() {
    let navigate = useNavigate();
    function handleClick() {
        navigate("/home");
    }
    return (
        <div>
            <button onClick={handleClick}>go home</button>
        </div>
    );
}
</script>

// 174.6 Также в v.6 в компонентах NavLink атрибуты "exact" поменялись на "end" (мы их использовали для корректного применения стилей активной ссылки, когда, например одна из ссылок имеет path="/").

// 174.7.0 Помимо этого из NavLink были удалены пропы "activeClassName" & "activeStyle". Теперь же стили или CSS-класс активности добавляется через коллбэк-функцию. Это надо пойти исправить.

(Go to [\projects\react-marvel-wiki\comments\174-AppHeader.js])

// 174.8 Также хук «useRouteMatch» переименовали на «useMatch» и немного изменил свои свойства (см. ссылку ↓).

// 174.9 Ещё есть такой компонент <Prompt>, который позволяет спрашивать пользователя, когда он уходит со страницы.

|===:===:===:===>
**links**
 * (EN Список изменений): https://github.com/remix-run/react-router/releases
 * (History API): https://developer.mozilla.org/ru/docs/Web/API/History_API
 * (EN Гайд по миграции с 5-й на 6-ю версию): https://github.com/remix-run/react-router/blob/main/docs/upgrading/v5.md#upgrade-to-react-router-v6
 * (Пример): https://stackblitz.com/github/remix-run/react-router/tree/main/examples/basic?file=src/App.tsx 