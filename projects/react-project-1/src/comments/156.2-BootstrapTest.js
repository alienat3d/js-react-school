import { Container, Row, Col } from 'react-bootstrap';

// ?[156.2] props children
// * 3.0.0 Представим ситуацию, когда у нас есть блок-обёртка и внутри него две колонки, которые разделяют этот блок пополам. Что будет в колонках мы заранее не знаем — контент динамический. Такую ситуацию мы смоделируем прямо здесь.
// 3.0.1 И дело в том, что react.children мы можем использовать лишь в одном месте. А здесь у нас аж два место, куда должен будет вставлен контент, и мы ещё не знаем какой именно. И вот здесь очень уместно будет использовать пропсы.
// todo Переходим в [projects\react-project-1\src\App.js]
const BootstrapTest = (props) => {
  return (
    <Container className='mt-5 mb-5'>
      <Row>
        <Col>
          {props.left}
        </Col>
        <Col>
          {props.right}
        </Col>
      </Row>
    </Container>
  )
}

export default BootstrapTest;