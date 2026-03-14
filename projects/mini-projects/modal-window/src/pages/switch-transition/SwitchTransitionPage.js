import React from 'react';
import {SwitchTransition, CSSTransition} from 'react-transition-group';
import {Button, Form} from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './SwitchTransitionStyles.css';

const modes = ['out-in', 'in-out'];

const SwitchTransitionPage = () => {
  const [mode, setMode] = React.useState('out-in');
  const [state, setState] = React.useState(true);
  const helloRef = React.useRef(null);
  const goodbyeRef = React.useRef(null);
  const nodeRef = state ? helloRef : goodbyeRef;
  return (
    <div className="container mx-auto w-25 mt-5">
      <div className="label">Mode:</div>
      <div className="modes">
        {modes.map((m) => (
          <Form.Check
            key={m}
            label={m}
            id={`mode=msContentScript${m}`}
            type="radio"
            name="mode"
            checked={mode === m}
            value={m}
            onChange={(event) => {
              setMode(event.target.value);
            }}
          />
        ))}
      </div>
      {/* 182.9.2 Здесь мы обернём в "SwitchTransition" базовый компонент "CSSTransition", который устанавливает режим "рендеринга" атрибутом "mode". У него есть два значения: "out-in" & "in-out". В режим "out-in", как мы видим, следующий элемент дожидается, пока предыдущий не исчезнет, а уже потом появляется. */}
      {/* 182.9.3 В режиме "in-out" первый элемент дожидается, пока не появится другой, а уже потом исчезает сам. */}
      {/* (Go to [/src/TransitionGroupPage.js]) */}
      <div className="main">
        <SwitchTransition mode={mode}>
          <CSSTransition
            key={state}
            nodeRef={nodeRef}
            addEndListener={(done) => {
              nodeRef.current.addEventListener('transitionend', done, false);
            }}
            classNames="fade"
          >
            <div ref={nodeRef} className="button-container">
              <Button onClick={() => setState((state) => !state)}>
                {state ? 'Hello, world!' : 'Goodbye, world!'}
              </Button>
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </div>
  );
}

export default  SwitchTransitionPage;