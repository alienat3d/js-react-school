import { Component } from 'react';

// import './employee-add-form.css';
import './employee-add-form.scss';

// ? [6-141] Работа с SASS-стилями.
// ? [6-145] Class fields & static.
// * 1.1 Вторая фича полей классов — создание любых свойств без конструктора. Теперь мы можем создавать стейты просто, будто мы присваиваем объект переменной state, не создавая её.
// * 1.2.0 Разберём ещё одну возможность, которую нам даёт ключевое слово static.
// ? 1.2.1 Сначала вспомним как мы использовали математические функции при помощи объекта Math, например Math.random(). Но теперь, когда мы знаем про JS-классы. Резонный вопрос, если Math это класс, то как же мы сразу применяем к нему метод, не создавая новый экземпляр этого класса ключевым словом new? И вот такие методы и свойства, которые мы можем использовать без создания класса и называются статическими "static". ↓
// ? 1.2.3 Однако мы можем делать статичные методы, чтобы реализовать такую возможность, рассмотрим на примере нового метода onLog(). ↓
// ? 1.2.4 Однако class fields позволяют нам создавать не только статические методы, как было и до них, но и свойства. Когда для целого класса должно быть одно свойство. (см. static logged ↓)
class EmployeeAddForm extends Component {
  
  state = {
    name: '',
    salary: ''
  }

  onValueChange = (evt) => {
    if (evt.target.type === 'text') {
      evt.target.value = evt.target.value.replace(/\d/g, '')
      this.setState({
        [evt.target.name]: evt.target.value
      })
    } else {
      this.setState({
        [evt.target.name]: evt.target.value
      })
    }
  }

  onSubmit = (evt) => {
    evt.preventDefault();
    // Можно еще и сообщения добавлять, подсветку, атрибуты minlength и т.д.
    if (this.state.name.length < 3 || !this.state.salary) return;
    this.props.onAdd(this.state.name, this.state.salary);
    this.setState({
      name: '',
      salary: ''
    })
  }

  static onLog = () => {
    console.log('logging');
  }

  static logged = 'on';

  render() {
    const { name, salary } = this.state;
    return (
      <div className="app-add-form">
        <h3>Добавьте нового сотрудника</h3>
        <form
          className="add-form d-flex"
          onSubmit={this.onSubmit}>
          <input
            className="form-control new-post-label"
            tabIndex={7}
            type="text"
            placeholder="Как его зовут?"
            name="name"
            value={name}
            onChange={this.onValueChange} />
          <input
            className="form-control new-post-label"
            tabIndex={8}
            type="number"
            placeholder="Зарплата в ₽?"
            name="salary"
            value={salary}
            onChange={this.onValueChange} />
          <button
            className="btn btn-outline-light"
            tabIndex={9}
            type="submit">
            Добавить
          </button>
        </form>
      </div>
    );
  }
}
// ? 1.2.2 Но мы не можем просто так взять название нашего классового компонента и вызвать его метод, у нас вылетит ошибка. ↑
// EmployeeAddForm.onValueChange();
// EmployeeAddForm.onLog();
console.log(EmployeeAddForm.logged);

export default EmployeeAddForm;