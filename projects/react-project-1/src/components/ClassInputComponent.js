// Used for "React Context" lesson
import {Component} from 'react';
import {DataContext} from './DataContext';

class ClassInputComponent extends Component {
  static contextType = DataContext;

  render() {
    return (
      <input value={this.context.mail}
             type="email"
             className="form-control"
             id="email"
             placeholder="name@example.com"/>
    );
  };
}

// ClassInputComponent.contextType = Consumer;

export default ClassInputComponent;