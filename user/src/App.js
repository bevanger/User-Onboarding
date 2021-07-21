import React, {useEffect, useState} from 'react';
import './App.css';
import Form from './Components/Form';
import schema from '../src/Validation/formSchema';
import { reach } from 'yup';
import axios from 'axios';
//import { resetWarningCache } from 'prop-types';

const initialFormValues = {
  // Text Inputs
  name: '',
  email: '',
  password: '',
  //Checkboxes
  terms: false,
}

const initialFormErrors = {
  name: '',
  email: '',
  password:'',
}

const initialUser=[]
const initialDisabled = true

export default function App() {
  const [user, setUser] = useState(initialUser);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  const postNewUser = newUser => {
    axios.post('https://reqres.in/api/users', newUser)
      .then(res => {
        setUser([res.data, ...user])
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setFormValues(initialFormValues)
      })
  };
  const validate =(name, value) => {
    reach(schema, name)
      .validate(value)
      .then(() => setFormErrors({ ...formErrors, [name]: ''}))
      .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0]}))
  }
  const inputChange = (name, value) => {
    validate(name, value)
    setFormValues({
      ...formValues,
      [name]: value
    })
  }
  const formSubmit = () => {
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.name.trim(),
      password: formValues.name.trim(),
      terms: ['terms'].filter(term => formValues[term])
    }
    postNewUser(newUser)
  }

  useEffect(() => {
    schema.isValid(formValues).then(valid => setDisabled(!valid))
  }, [formValues])

  return (
    <div className="Container">
      <header><h1>Sign up!</h1></header>
    <Form
      values={formValues}
      change={inputChange}
      submit={formSubmit}
      disabled={disabled}
      errors={formErrors}
    />
    {
      user.map(userInfo => {
        return (
          <p>{userInfo.name}</p>
        )
      })
    }
    </div>
  );
}


