import {useState} from 'react';
import {Container} from 'react-bootstrap';
import {Transition} from 'react-transition-group';

// 182.4.0 Здесь мы в компонент ModalPage передаём стейт, который отвечает за показ модального окна.
// 182.7.2 Здесь нам потребуется ещё один стейт "showTrigger", потому, что в зависимости от него мы покажем или скроем эту кнопку.
const ModalComponent = (props) => {
  // 182.2.0 Здесь пропишем настройки для нашей библиотеки React Transition Group. В переменной duration у нас будет находиться длительность анимации в мс.
  const duration = 250;

  // 182.2.1 Далее изначальные CSS-стили (по умолчанию) для анимации, где как раз в длительность анимации подставляется duration.
  // 182.6.0 Теперь у нас вылез странный баг, что даже при скрытом модальном окне, поводив мышкой по экрану мы заметим, что в некоторых местах курсор меняется. Это происходит потому, что на самом деле модальное окно отображается на странице, просто оно прозрачно "opacity: 0", а чтобы оно стало действительно незаметным для пользователя нам нужно добавить "visibility: hidden". Мы взяли именно это свойство, а не "display" потому, что "display" невозможно плавно анимировать и оно либо резко убирает, либо добавляет элемент на страницу. Или мы могли бы также использовать другие CSS-свойства на выбор для какой-то другой анимации.
  const defaultStyle = {
    transition: `all ${duration}ms ease-in-out`,
    opacity: 0,
    visibility: 'hidden',
  };

  // 182.2.2 А здесь у нас будет описание стилей на переходных этапах.
  // 182.6.1 Также добавим и здесь это CSS-свойство в значении "hidden" для скрываемых модальное окно состояний "exiting" & "exited", а для показываемых наоборот — в "visible". И вот, таким образом у нас происходит красивая анимация плавного появления и исчезания модального окна. При этом баг со сменой курсора, при наведении на какие-то части скрытого модального окна, исчез. ↓
  const transitionStyle = {
    entering: {opacity: 1, visibility: 'visible'},
    entered: {opacity: 1, visibility: 'visible'},
    exiting: {opacity: 0, visibility: 'hidden'},
    exited: {opacity: 0, visibility: 'hidden'},
  };

  // 182.3 Здесь мы обернём всю вёрстку модального окна в специальный компонент библиотеки Transition. Точнее вёрстку будет возвращать функция, а принимать она будет стейт. Также, как мы уже говорили вначале, у Transition есть два базовых пропа "in" и "timeout". С пропом "timeout" у нас и так всё ясно, мы передаём туда в мс длительность анимации, то "in" у нас будет своего рода переключателем с булевым значением.
  // (Go to [/src/App.js])
  // 182.4.1 В аттрибуте "in" мы добавим этот стейт, который приходит из пропсов компонента ModalPage.
  // ? 182.7.0 Однако на этом функционал не ограничивается и есть множество доп. пропсов (см. документацию библиотеки в ссылках), например при помощи «unmountOnExit» мы можем убирать компонент из вёрстки, после его исчезновения. Также есть возможность что-то сделать на каждом из 6 этапов "onEnter", "onEntering" и т.д. (см. заметки из начала урока и схему в ссылках). При специфических задачах этом может быть очень полезно (классический пример это скрывать кнопку, которая вызвала этот переход, например открытие модального окна, но могут быть много других действий разного характера).
  // 182.7.1 Итак, реализуем как раз эту механику, чтобы кнопка скрывалась, при появлении модального окна и снова появилось, когда модальное окно исчезает. Для этого добавим ещё два пропа "onEnter" (чтобы скрывать кнопку ещё перед стартом анимации появления модального окна) & "onExited" (когда анимация исчезания модального окна успешно завершилась - вновь покажем кнопку вызова модального окна).
  // (Go to [/src/App.js])
  // 182.7.4 Теперь мы подставим функцию "setShowTrigger" в нужные места с нужным булевым значением, запуская её через стрелку.
  // (Go to [/src/components/CssModalPage.js])
  return (
    <Transition in={props.show}
                timeout={duration}
                onEnter={() => props.setShowTrigger(false)}
                onExited={() => props.setShowTrigger(true)}
                unmountOnExit>
      {state => (
        // 182.5 Также здесь ещё надо добавить инлайн-стили внешнему элементу модального окна. Для этого мы поместим объект и, с помощью spread-оператора, развернём содержимое "defaultStyle" и "transitionStyle", которые у нас отвечают за стилизацию промежуточных состояний и анимацию. Здесь надо отдельно обратить внимание, что state передаётся в "transitionStyle", который и определяет стадию работы анимации. Это встроенный в библиотеку функционал. И как мы видим их бывает 4 состояния. ↑
        <div className="modal mt-5 d-block" style={{
          ...defaultStyle,
          ...transitionStyle[state]
        }}>
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
      )}
    </Transition>
  );
};

const ModalPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showTrigger, setShowTrigger] = useState(true);

  return (
    <Container>
      <ModalComponent show={showModal} onClose={setShowModal} setShowTrigger={setShowTrigger}/>
      {/* 182.7.3 запишем условный рендеринг на основании значения стейта "showTrigger". */}
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

export default ModalPage;