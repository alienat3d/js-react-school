import './App.css';
import {useState} from 'react';
import {Container} from 'react-bootstrap';
// import Modal from './components/Modal';
import CssModal from './components/CssModal';

// 182.4.0 Здесь мы в компонент Modal передаём стейт, который отвечает за показ модального окна.
// (Go to [/src/components/Modal.js])
// 182.7.2 Здесь нам потребуется ещё один стейт "showTrigger", потому, что в зависимости от него мы покажем или скроем эту кнопку.
function App() {
  const [showModal, setShowModal] = useState(false);
  const [showTrigger, setShowTrigger] = useState(true);

  return (
    <Container>
      {/*<Modal show={showModal} onClose={setShowModal} setShowTrigger={setShowTrigger}/>*/}
      <CssModal show={showModal} onClose={setShowModal} setShowTrigger={setShowTrigger}/>
      {/* 182.7.3 запишем условный рендеринг на основании значения стейта "showTrigger". */}
      {/* (Go to [/src/components/Modal.js]) */}
      {showTrigger &&
        <button type="button"
                className="btn btn-warning mt-5"
                onClick={() => setShowModal(true)}>
          Open Modal
        </button>
      }
    </Container>
  );
}

export default App;
