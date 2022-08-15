import React, { useContext, useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client/react/hooks';
import { AuthContext } from '../context/auth.js';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';


function Register() {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

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
      const userData = result.data.register;
      context.login(userData)
      navigate('/');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values
  })

  const onSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    addUser();
  }

  if (context.user) {
    return <Navigate to={'/'} />
  } else
    return (
      <div className='form-container'>
        <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
          <h1>Register</h1>
          <Form.Input label='Username' placeholder='username' name='username' value={values.username} onChange={onChange} type='text' error={errors.username ? true : false} />

          <Form.Input label='Email' placeholder='email' name='email' value={values.email} onChange={onChange} type='text' error={errors.email ? true : false} />

          <Form.Input label='Password' placeholder='password' name='password' value={values.password} onChange={onChange} type='password' error={errors.password ? true : false} />

          <Button type='submit' primary>Register</Button>
        </Form>
        {
          Object.keys(errors).length > 0 &&
          (
            <div className='ui error message'>
              <ul className="list">
                {
                  Object.keys(errors).map(function (key, index) {
                    return (<li key={index}>{errors[key]}</li>)
                  })
                }
              </ul>
            </div>
          )
        }
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