import React, { useState, createRef } from 'react';
import {
  Container,
  ListGroup,
  Button,
} from 'react-bootstrap';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import { v4 as uuidv4 } from 'uuid';
// import 'bootstrap/dist/css/bootstrap.min.css';

// 182.10.0 Ещё один специальный компонент в этой библиотеке "TransitionGroup", который также, как и "SwitchTransition" является обёрткой, но уже для группы базовых компонентов. ↓
const TransitionGroupPage = () => {
  const [items, setItems] = useState(() => [
    {
      id: uuidv4(),
      text: 'Buy eggs',
      nodeRef: createRef(null),
    },
    {
      id: uuidv4(),
      text: 'Pay bills',
      nodeRef: createRef(null),
    },
    {
      id: uuidv4(),
      text: 'Invite friends over',
      nodeRef: createRef(null),
    },
    {
      id: uuidv4(),
      text: 'Fix the TV',
      nodeRef: createRef(null),
    },
  ]);

  return (
    <Container style={{ marginTop: '2rem' }}>
      <ListGroup style={{ marginBottom: '1rem' }}>
        {/* 182.10.1 Итак, здесь у нас компонент "TransitionGroup" оборачивает цикл "map", который создаёт различные CSSTransition'ы со своими внутренними компонентами. И можно заметить, что ни у одного из компонентов нет пропа "in". Это потому, что здесь "TransitionGroup" берёт функции отслеживания появления/исчезновения всех его дочерних компонентов на себя и применяет анимацию. Но он просто распоряжается, когда запускать анимацию, но сам вид анимации определяет внутренний компонент "CSSTransition" через атрибут "classNames" и группу CSS-классов "item". Ещё раз, "TransitionGroup" следит за изменением списка компонентов у него внутри и распоряжается запускать анимацию появление/исчезновения (поэтому самим компонента атрибут "in" уже не требуется), когда элементы добавляются или удаляются. При этом сама анимация прописана в CSS-классах и атрибуте "classNames" компонента "CSSTransition". */}
        <TransitionGroup className="todo-list">
          {items.map(({ id, text, nodeRef }) => (
            <CSSTransition
              key={id}
              nodeRef={nodeRef}
              timeout={500}
              classNames="item"
            >
              <ListGroup.Item ref={nodeRef}>
                <Button
                  className="remove-btn"
                  variant="danger"
                  size="sm"
                  onClick={() =>
                    setItems((items) =>
                      items.filter((item) => item.id !== id)
                    )
                  }
                >
                  &times;
                </Button>
                {text}
              </ListGroup.Item>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
      <Button
        onClick={() => {
          const text = prompt('Enter some text');
          if (text) {
            setItems((items) => [
              ...items,
              {
                id: uuidv4(),
                text,
                nodeRef: createRef(null),
              },
            ]);
          }
        }}
      >
        Add Item
      </Button>
    </Container>
  );
}

export default TransitionGroupPage;