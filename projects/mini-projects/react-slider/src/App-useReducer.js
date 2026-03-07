import {useReducer, useState} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';

function reducer(state, action) {
  switch (action.type) {
    case 'toggle':
      return {autoplay: !state.autoplay};
    case 'slow':
      return {autoplay: 5000};
    case 'fast':
      return {autoplay: 1000};
    case 'custom':
      return {autoplay: convertSecondsToMilliseconds(action.payload)};
    default:
      throw new Error(`Unknown action type ${action.type}`);
  }
}

function init(initial) {
  return {autoplay: initial};
}

function convertSecondsToMilliseconds(value) {
  if (!value) return false;
  return Math.round(value) * 1000;
}

const Slider = ({initial}) => {
  const [slide, setSlide] = useState(0);
  const [autoplay, dispatch] = useReducer(reducer, initial, init);

  function changeSlide(i) {
    setSlide(slide => slide + i);
  }

  return (
    <Container>
      <div className="slider w-50 m-auto">
        <img className="d-block w-100" src="/assets/img/01.webp" alt="slide"/>
        <div className="text-center mt-5">Active slide {slide} <br/>{autoplay.autoplay ? 'auto' : null} </div>
        <div className="buttons mt-3">
          <button className="btn btn-primary me-2"
                  onClick={() => changeSlide(-1)}>-1
          </button>
          <button className="btn btn-primary me-2"
                  onClick={() => changeSlide(1)}>+1
          </button>
          <button className="btn btn-primary me-2"
                  onClick={() => dispatch({type: 'toggle'})}>toggle autoplay
          </button>
          <button className="btn btn-primary me-2"
                  onClick={() => dispatch({type: 'slow'})}>slow autoplay
          </button>
          <button className="btn btn-primary me-2"
                  onClick={() => dispatch({type: 'fast'})}>fast autoplay
          </button>
          <div class="input-group my-2 w-75">
            <input type="number" class="form-control" aria-label="Custom slider autoplay speed in seconds"
                   placeholder="Enter custom slider autoplay in seconds"
                   onChange={(evt) => dispatch({type: 'custom', payload: evt.target.value})}/>
            <div class="input-group-append">
              <span class="input-group-text">seconds</span>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

function App() {
  return (
    <Slider initial={false}/>
  );
}

export default App;