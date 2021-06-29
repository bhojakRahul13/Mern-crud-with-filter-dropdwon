import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

console.log(React.version);

function Edit(props) {
  const { id } = useParams();
  console.log(id);
  let history = useHistory();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [data, setData] = useState("");
  const { register, handleSubmit, errors } = useForm();

  //update api
  const onSubmit = async (e) => {
    const res = await axios.put(`http://localhost:4000/edit/${id}`, {
      FirstName: firstName.toLowerCase(),
      LastName: lastName.toLowerCase(),
      email: email,
      role: role.toLowerCase(),
    });
    console.log("res", res.data.user);

    if (res.data.message === "User updated successfully!") {
      history.push("/dis");
    } else {
      setData(res.data.message);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []); //[] is for runiing only 1 time

  //get user detials by id

  const loadUsers = async () => {
    const result = await axios.get(`http://localhost:4000/edit/${id}`);
    console.log("result", result);
    setFirstName(result.data.users.FirstName);
    setLastName(result.data.users.LastName);
    setEmail(result.data.users.email);
    setRole(result.data.users.role);
  };

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Update User</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {errors.firstName && "First name is required"}
          <div className="form-group">
            <input
              type="text"
              name="firstName"
              className="form-control form-control-lg"
              placeholder="FirstName"
              value={firstName}
              ref={register({ required: true })}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          {errors.lastName && "Last name is required."}
          <div className="form-group">
            <input
              type="text"
              name="lastName"
              className="form-control form-control-lg"
              placeholder="Enter Your Lastname"
              value={lastName}
              ref={register({ required: true })}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          {errors.lastName && "Entered value does not match email format."}
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
            <input
              type="type"
              className="form-control form-control-lg"
              name="role"
              placeholder="Enter Your Role"
              value={role}
              ref={register({ required: true })}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Login
          </button>
        </form>
        <h1>{data}</h1>
      </div>
    </div>
  );
}

export default Edit;
