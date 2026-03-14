import {useState} from 'react';
import {Container} from 'react-bootstrap';
import {CSSTransition} from 'react-transition-group';

// ? 182.8.0 Но с такими инлайн-стилями не всегда бывает удобно работать. Тем более часто у нас уже есть готовые стили внутри классов, поэтому перейдём к рассмотрению другого компонента этой библиотеки CSSTransition. Для этого мы создадим второй компонента модального окна [/src/CssModalPage.js] и импортируем его сюда.
// ? 182.8.1 Делает он всё то же самое, что и предыдущий Transition, но только на основе CSS-классов. Он немного отличается синтаксисом и у него есть пара доп. пропсов. Это такая специфичная для веба версия. Скопируем сюда содержимое комп. ModalPage, но только удалив лишние стили и уберём атрибут "style" внешнего контейнера.
const CssModalComponent = (props) => {
  const duration = 250;

  return (
    // ? 182.8.2 Ещё одно отличие от ModalPage в том, что вёрстка здесь у нас больше не в стрелочной функции, а просто в div'е. И со стилями мы будем работать через классы. Вместо атрибута "style" (как было с Transition) мы будем работать с атрибутом "classNames". Далее, чтобы этот способ работал, нам нужно в файле CSS прописать необходимые CSS-классы состояния этого компонента: например, если класс элемента ".modal-window", то классы будут выглядеть так ".modal-window-enter", ".modal-window-enter-active", ".modal-window-exit" & ".modal-window-exit-active", которые здесь характеризуют стадии анимации перехода. С помощью них опишем в [/src/App.css] немного другую анимацию появления/скрытия модального окна.
    // (Go to [react-course-notes/8-182-react-transition-group.md])
    <CSSTransition in={props.show}
                   timeout={duration}
                   onEnter={() => props.setShowTrigger(false)}
                   onExited={() => props.setShowTrigger(true)}
                   unmountOnExit
                   classNames="modal-window">
      <div className="modal mt-5 d-block">
        <div className="modal-dialog mt-5">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Typical modal window</h5>
              <button onClick={() => props.onClose(false)} type="button"
                      className="btn-close"
                      aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>Modal body content</p>
            </div>
            <div className="modal-footer">
              <button onClick={() => props.onClose(false)}
                      type="button"
                      className="btn btn-secondary">
                Close
              </button>
              <button onClick={() => props.onClose(false)}
                      type="button"
                      className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

const CssModalPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showTrigger, setShowTrigger] = useState(true);

  return (
    <Container>
      <CssModalComponent show={showModal} onClose={setShowModal} setShowTrigger={setShowTrigger}/>
      {showTrigger &&
        <button type="button"
                className="btn btn-warning mt-5"
                onClick={() => setShowModal(true)}>
          Open Modal
        </button>
      }
    </Container>
  );
};

export default CssModalPage;