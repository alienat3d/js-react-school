import {useState} from 'react';
import {flushSync} from 'react-dom';

function BatchingExample() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  function handleClick() {
    setTimeout(() => {
      flushSync(() => setCount(count => ++count));

      console.log('do something');

      flushSync(() => setFlag(flag => !flag));
    }, 100);
  }

  console.log('render');

  const containerStyle = {
    height: '100vh',
    gap: '20px',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#252627',
  };

  return (
    <div style={containerStyle}>
      <button onClick={handleClick}>Click me</button>
      <h1 style={{color: flag ? 'blue' : 'green'}}>{count}</h1>
    </div>
  );
}

export default BatchingExample;