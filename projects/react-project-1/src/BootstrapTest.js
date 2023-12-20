import { Container, Row, Col, Carousel, Form, Button } from 'react-bootstrap';

/* function CatCarousel() {
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
} */

const BootstrapTest = (props) => {
  return (
    <Container className='mt-5 mb-5'>
      <Row>
        <Col>
          {props.left}
          {/* <SomeForm /> */}
        </Col>
        <Col>
          {props.right}
          {/* <CatCarousel /> */}
        </Col>
      </Row>
    </Container>
  )
}

export default BootstrapTest;