import { Component } from 'react';

import './search-panel.css';

// ? [138.2]
// todo [начало в app.jsx]
// * 1.1.7 Переведём в классовый компонент, чтобы использовать стейт и добавим в него также свойство "term".
// todo [вернёмся в app.jsx]
// * 1.1.10 Сделаем сразу этот компонент управляемым и инпут синхронизировался с локальным стейтом. Т.е. не только передавать наверх это значение, но и содержать внутри компонента этот стейт, чтобы интерфейс работал правильно.
// 1.1.11 Для этого создадим ещё один метод onUpdateSrch() (чтобы как-то отличать от созданного перед этим). В нём аргументом укажем объект события evt. Внутри мы создадим переменную term, которое примет значение нашей строки ввода поиска. Когда событие onChange сработает на инпуте, то сюда мы получим значение строкой, то, что он ввёл.
// 1.1.12 И теперь передаём этот стейт в качестве value в инпут.
// 1.1.13 Далее пробросим наше значение инпута вверх по иерархии: "this.props.onUpdateSearch(term);"
// 1.1.14 Ещё раз заметим, что onUpdateSrch() работает локально внутри компонента, а onUpdateSearch() приходит из app.jsx и выполняет свои действия.
// 1.1.15 Добавляем обработчик события onChange, куда мы поместим запуск метода onUpdateSrch() 
class SearchPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
  }

  onUpdateSrch = (evt) => {
    const term = evt.target.value;
    this.setState({term});
    this.props.onUpdateSearch(term);
  }

  render(onUpdateSearch) {
    return (
      <input
        className="form-control search-input"
        type="text"
        placeholder="Найти сотрудника"
        value={this.state.term}
        onChange={this.onUpdateSrch} />
    );
  }
}

export default SearchPanel;