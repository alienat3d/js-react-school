import { Container, Row, Col, Carousel, Form, Button } from 'react-bootstrap';

// ? [144.2]

// * 1.1.4 Здесь нам понадобятся, знакомые по обычному Bootstrap, Container Row & Col.
// ? 1.1.5 Напоминание как работает Bootstrap: Мы можем разделять наш контент сначала одним "Container", который ограничит ширину нашего контента, затем строка "Row" и внутри строки различные колонки "Col", которые будут разделяться на разной ширине экрана, в зависимости от указанных в брейкпоинтов.
// 1.1.6 Но прежде всего нам нужно эти сущности импортировать.
function CatCarousel() {
  return (
    <Carousel>
      <Carousel.Item>
        <img src="http://placekitten.com/1150/500" alt="a kitten" />
      </Carousel.Item>
      <Carousel.Item>
        <img src="http://placekitten.com/1100/500" alt="a kitten" />
      </Carousel.Item>
      <Carousel.Item>
        <img src="http://placekitten.com/1200/500" alt="a kitten" />
      </Carousel.Item>
    </Carousel>
  );
}
function SomeForm() {
  return (
    <Form className='mb-3 text-center'>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

const BootstrapTest = () => {
  return (
    <Container className='mt-5 mb-5'>
      <Row>
        <Col>
          <SomeForm/>
        </Col>
        <Col>
          <CatCarousel/>
        </Col>
      </Row>
    </Container>
  )
}

export default BootstrapTest;
// ? 1.1.7 Не забудем также импортировать этот компонент в index.js