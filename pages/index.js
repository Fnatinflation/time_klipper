import React from 'react'
import { Button, Row, Col, Container, Form } from 'react-bootstrap'
import { withRouter } from 'next/router'
import {auth} from '../firebase.js';
import Welcome from './welcome';
import {useAuthState} from 'react-firebase-hooks/auth';
import Login from '../components/login';

function App() {
  const [user] = useAuthState(auth);
  return (
    user ? <Welcome/> : <Login/>
  );
}
  
export default App;

// class LoginForm extends React.Component {

//   constructor(props) {
//     super(props)
//     this.state = { username: '', password: '' }

//   }

//   handleChange(event) {
//     const name = event.target.name
//     this.setState({ [name]: event.target.value })
//   }
//   handleSubmit = (event) => {
//     event.preventDefault()
//     this.props.router.push('/welcome')
//   }
//   render() {
//     return (
//       <div>
//         <Container>
//           <Col>
//             <Form onSubmit={this.handleSubmit}>

//               <Form.Group className="mb-3">
//                 <Form.Control value={this.state.username} onChange={event => this.handleChange(event)} name="username" type="text" placeholder="Username ..." />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <Form.Control value={this.state.password} onChange={event => this.handleChange(event)} name="password" type="password" placeholder="Password ..." />
//               </Form.Group>
//               <Button type="submit">Log in</Button>
//             </Form>
//           </Col>
//         </Container>
//       </div>
//     )
//   }

// } export default withRouter(LoginForm)
