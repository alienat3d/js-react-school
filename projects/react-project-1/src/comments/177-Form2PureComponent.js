// ? 177.6.0 А что с классовыми компонентами? Всё, что мы узнали до того работает также и с ними: и маршрутизация, и ленивая загрузка и остальные фичи. Однако с memo есть нюанс. По факту, можно попробовать обернуть класс этим методом и он возможно будет даже правильно работать. Однако сами разработчики не рекомендуют этот подход, т.к. он в ряде случаев может вызывать баги. Поэтому, если мы пишем приложение на классовых компонентах, то лучше вместо memo использовать Pure Component. Тут мы перепишем компонент нашей тестовой формы для рассмотрения того, как работать с Pure Component.
// (Go to [projects/react-project-1/src/App.js])
import {Component, PureComponent} from 'react';
import {Container} from 'react-bootstrap';

// 177.7.1 Итак, сперва мы будем экстендить наш классовый компонент уже от обычного Component, а затем использовать хук жизненного цикла компонента shouldComponentUpdate. У него могут быть два параметра "nextProps" & "nextState", т.е. можно проверять, как приходящие новые пропсы, так и стейт. Здесь же нам пригодится только первый параметр.
// 177.7.2 Далее мы запишем условие, при котором мы не хотим, чтобы компонент обновлялся, а именно, когда у нас новое значение свойства "name" в объекте "mail" в пропсах совпадает с предыдущим. Возвращая false мы запрещаем компоненту ререндериться. И теперь у нас всё работает как нужно.
// ? 177.7.3 Также стоит отметить, что сами разработчики Реакт не рекомендуют писать логику слишком глубокого сравнения, т.к. там может возникать баги.
// (Go to [/src/components/Form2Component.js])
// class Form2PureComponent extends PureComponent {
class Form2PureComponent extends Component {
  shouldComponentUpdate(nextProps) {
    /*if (this.props.mail.name === nextProps.mail.name) {
      return false;
    }
    return true;*/
    // В принципе, мы можем переписать более сокращённо, но может менее наглядно и всё будет также работать:
    return this.props.mail.name !== nextProps.mail.name;
  };

  render() {
    console.log('render');

    return (
      <Container>
        <form className="w-50 border mt-5 p-3 m-auto">
          <div className="mb-3">
            <label htmlFor="email" className="form-label mt-3">Email address</label>
            <input value={this.props.mail.name}
                   type="email"
                   className="form-control"
                   id="email"
                   placeholder="name@example.com"/>
          </div>
          <div className="mb-3">
            <label htmlFor="textarea" className="form-label">Note</label>
            <textarea value={this.props.text} className="form-control" id="textarea" rows="3"></textarea>
          </div>
        </form>
      </Container>
    );
  }
}

export default Form2PureComponent;