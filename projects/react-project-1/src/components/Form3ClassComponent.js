// Used for "React Context" lesson
import {Component} from 'react';
import {Container} from 'react-bootstrap';
import ClassInputComponent from './ClassInputComponent';

class Form3ClassComponent extends Component {
  render() {
    console.log('render');

    return (
      <Container>
        <form className="w-50 border mt-5 p-3 m-auto">
          <div className="mb-3">
            <label htmlFor="email" className="form-label mt-3">Email address</label>
            <ClassInputComponent/>
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

export default Form3ClassComponent;