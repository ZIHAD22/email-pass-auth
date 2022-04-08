import './App.css'
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import app from './firebase.init'
import { Button, Container, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
const auth = getAuth(app)

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [registered, setRegistered] = useState('')

  const handleEmailBlur = (e) => {
    setEmail(e.target.value)
  }
  const handlePasswordBlur = (e) => {
    setPassword(e.target.value)
  }

  const handleNameBlur = (e) => {
    setName(e.target.value)
  }

  const handleRegistered = (e) => {
    setRegistered(e.target.checked)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(email, password)
    if (registered) {
      signInWithEmailAndPassword(auth, email, password).then((res) => {
        const user = res.user
        console.log(user)
      })
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
          console.log(res.user)
          updateProfile(auth.currentUser, {
            displayName: name,
          })
          sendEmailVerification(auth.currentUser).then((res) =>
            console.log('Email was send'),
          )
        })
        .catch((e) => {
          console.error(e)
        })
    }
  }
  return (
    <Container>
      <Form onSubmit={handleSubmit} className="w-50 mx-auto mt-5">
        <h1 className="text-primary text-center ">
          Please {registered ? 'Login' : 'Register'}
        </h1>
        {!registered && (
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              onBlur={handleNameBlur}
              type="text"
              placeholder="Enter Name"
              required
            />
          </Form.Group>
        )}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onBlur={handleEmailBlur}
            type="email"
            placeholder="Enter email"
            required
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onBlur={handlePasswordBlur}
            type="password"
            placeholder="Password"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            onClick={handleRegistered}
            type="checkbox"
            label="Already Registered?"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {registered ? 'Login' : 'Register'}
        </Button>
      </Form>
    </Container>
  )
}

export default App
