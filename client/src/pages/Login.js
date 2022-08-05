import React, { useContext, useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client/react/hooks';
import { AuthContext } from '../context/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const [values, setValues] = useState({
    username: '',
    password: '',
  })

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const [loginUser, { loading, error }] = useMutation(LOGIN_USER, {
    update(proxy, result) {
      const userData = result.data.login;
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
    loginUser();
  }

  return (
    <div className='form-container'>
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Login</h1>
        <Form.Input label='Username' placeholder='username' name='username' value={values.username} onChange={onChange} type='text' error={errors.username ? true : false} />

        <Form.Input label='Password' placeholder='password' name='password' value={values.password} onChange={onChange} type='password' error={errors.password ? true : false} />

        <Button type='submit' primary>Login</Button>
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

const LOGIN_USER = gql`
mutation Login(
  $username: String!,
  $password: String!
) {
  login(
    username: $username,
    password: $password
  ) {
    id
    username
    email
    token
    createdAt
  }
}
`

export default Login