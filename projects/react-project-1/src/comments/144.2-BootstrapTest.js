import { Container, Row, Col } from 'react-bootstrap';

// ? [144.2]

// * 1.1.4 Здесь нам понадобятся, знакомые по обычному Bootstrap, Container Row & Col.
// ? 1.1.5 Напоминание как работает Bootstrap: Мы можем разделять наш контент сначала одним "Container", который ограничит ширину нашего контента, затем строка "Row" и внутри строки различные колонки "Col", которые будут разделяться на разной ширине экрана, в зависимости от указанных в брейкпоинтов.
// 1.1.6 Но прежде всего нам нужно эти сущности импортировать.
const BootstrapTest = () => {
  return (
    <Container>
      <Row>
        <Col>1 of 2</Col>
        <Col>2 of 2</Col>
      </Row>
      <Row>
        <Col>1 of 3</Col>
        <Col>2 of 3</Col>
        <Col>3 of 3</Col>
      </Row>
    </Container>
  )
}

export default BootstrapTest;
// ? 1.1.7 Не забудем также импортировать этот компонент в index.js