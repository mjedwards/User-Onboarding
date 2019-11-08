import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const OnBoardForm = ({ values, touched, errors, props, status }) => {
  const [users, setUsers] = useState([]);
  console.log("this is touched", touched);
  useEffect(() => {
    if (status) {
      setUsers([...users, status]);
    }
  }, [status]);
  return (
    <div>
      <Form>
        <Field
          type='text'
          name='name'
          placeholder='John Doe'
          value={values.name}
        />
        {touched.name && errors.name && <p>{errors.name}</p>}

        <Field
          type='email'
          name='email'
          placeholder='johndoe@exmaple.com'
          value={values.email}
        />
        {touched.email && errors.email && <p>{errors.email}</p>}

        <Field
          type='password'
          name='password'
          placeholder='password'
          value={values.password}
        />
        {touched.password && errors.password && <p>{errors.password}</p>}

        <label>
          <p>
            Terms of Service:
            <br></br>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
            dignissimos beatae facilis hic sunt, aliquid excepturi asperiores
            voluptatibus. Accusamus, provident!
          </p>
          <Field
            type='checkbox'
            name='agree'
            placeholder='Agree?'
            value={values.agree}
          />
        </label>
        <button type='submit'>Submit</button>
      </Form>

      {users.map(user => (
        <ul key={user.id}>
          <li>Name: {user.name}</li>
          <li>Email: {user.email}</li>
        </ul>
      ))}
    </div>
  );
};

const FormikOnBoardForm = withFormik({
  mapPropsToValues({ name, email, password, agree }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      agree: agree || ""
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required("What is your name?"),
    email: Yup.string().required("What is your email?"),
    password: Yup.string().required("What is your password?"),
    agree: Yup.boolean()
  }),

  handleSubmit(values, { setStatus }) {
    axios
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        setStatus(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
})(OnBoardForm);

console.log(FormikOnBoardForm);

export default FormikOnBoardForm;
