import React, { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client/react/hooks';


function Register() {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
  })

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const [addUser, { loading, error }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      console.log(result);
    },
    variables: values
  })

  const onSubmit = (e) => {
    e.preventDefault();
    addUser();
  }

  return (
    <div className='form-container'>
      <Form onSubmit={onSubmit} noValidate className={loading? 'loading': ''}>
        <h1>Register</h1>
        <Form.Input label='Username' placeholder='username' name='username' value={values.username} onChange={onChange} type='text' />

        <Form.Input label='Email' placeholder='email' name='email' value={values.email} onChange={onChange} type='text' />

        <Form.Input label='Password' placeholder='password' name='password' value={values.password} onChange={onChange} type='password' />
        <Button type='submit' primary>Register</Button>
      </Form>
    </div>
  )
}

const REGISTER_USER = gql`
mutation Register(
  $username: String!,
  $email: String!,
  $password: String!
) {
  register(registerInput: {
    username: $username,
    email: $email,
    password: $password
  }) {
    id
    username
    email
    token
    createdAt
  }
}
`

export default Register