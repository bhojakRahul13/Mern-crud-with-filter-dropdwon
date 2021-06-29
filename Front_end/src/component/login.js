import React from "react";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
//import "react-dropdown/style.css";
import { useForm } from "react-hook-form";

const Login = () => {
  let history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [data, setData] = useState("");
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (e) => {
    //e.preventDefault();
    const res = await axios.post("http://localhost:4000/add", {
      FirstName: firstName.toLowerCase(),
      LastName: lastName.toLowerCase(),
      email: email,
      role: role.toLowerCase(),
    });
    console.log("res", res);
    if (res.data.message === "User added!") {
      history.push("/dis");
    } else {
      setData(res.data.message);
    }
  };

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4"> Register </h2>{" "}
        <form onSubmit={handleSubmit(onSubmit)}>
          {errors.firstName && "First name is required"}
          <div className="form-group">
            <input
              type="text"
              name="firstName"
              className="form-control form-control-lg"
              placeholder="firstName"
              value={firstName}
              ref={register({ required: true })}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>{" "}
          {errors.lastName && "Last name is required."}
          <div className="form-group">
            {" "}
            <input
              type="text"
              name="lastName"
              className="form-control form-control-lg"
              placeholder="lastName"
              value={lastName}
              ref={register({ required: true })}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          {errors.lastName && "Entered value does not match email format"}
          <div className="form-group">
            <input
              type="email"
              name="email"
              className="form-control form-control-lg"
              placeholder="Enter Your E-mail Address"
              value={email}
              ref={register({ required: true, pattern: /^\S+@\S+$/i })}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {errors.role && "role is required."}
          <div className="form-group">
            {" "}
            <input
              type="type"
              name="role"
              className="form-control form-control-lg"
              placeholder="Enter Your Role "
              value={role}
              ref={register({ required: true })}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Login{" "}
          </button>{" "}
        </form>{" "}
        <h1> {data} </h1>{" "}
      </div>{" "}
    </div>
  );
};

export default Login;
