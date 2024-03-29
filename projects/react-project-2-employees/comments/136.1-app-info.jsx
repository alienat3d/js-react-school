import './app-info.css';

// ? [136.1]

// * 1.0.0 Теперь мы займёмся этим виджетом с общей информации, чтобы он нам выводит информацию о числе сотрудников и сколько из них получат премию. Но небольшая сложность заключается в том, что AppInfo находится в другой части приложение, чем список сотрудников, а для подсчёта ему нужно знать эти данные. 
// * 1.0.1 И хотя у нас компоненты независимы друг от друга, у нас есть один компонент, который хранит все данные внутри себя — app.jsx. Значит нам нужно написать механизм, который брал бы внутреннее состояние из employee-list-item и передавал бы его наверх в app.
// ? Такой приём, когда мы стейт какого-то компонента поднимаем выше по иерархии называется - «подъём стейта» (state lifting). Это важно уметь делать, когда у нас данные хранятся на самом верхнем уровне в app.jsx.
// * 1.0.2 Когда все данные хранятся в главном компоненте App, как сейчас в нашем варианте, то App называют "источником истин", т.к. он должен контролировать всё. В таком варианте мы должны уметь пробрасывать данные, как вниз, так и наверх. В прошлых уроках мы пробрасывали их вниз, теперь пришло время поднять их наверх.
// todo [перейдём в .\src\app\app.jsx]
// * 1.3.2 Теперь мы просто передаём нужные пропсы со значениями в вёрстку.
const AppInfo = ({employeesCount, increasedCount}) => {
  return (
    <div className="app-info">
      <h1>Учёт сотрудников компании «Рога и копыта»</h1>
      <h2>Общее число сотрудников: {employeesCount}</h2>
      <h2>Премию получат: {increasedCount}</h2>
    </div>
  );
}

export default AppInfo;