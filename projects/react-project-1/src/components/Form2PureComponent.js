// Used for "React memo & PureComponent" lesson
// import {PureComponent} from 'react';
import {Component} from 'react';
import {Container} from 'react-bootstrap';

class Form2PureComponent extends Component {
  shouldComponentUpdate(nextProps) {
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