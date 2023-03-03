import React, { useState } from "react";
import { TextField, Checkbox, Button, Radio } from "@mui/material";
import { useForm } from "react-hook-form";

export default function Form() {
  const [instruments, setInstruments] = React.useState([]);
  const baseURL = "https://sea-turtle-app-zggz6.ondigitalocean.app";
  const instrumentApi = `${baseURL}/api/instruments`;
  const postApi = `${baseURL}/api/users`;
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    city: "",
    state: "",
    instrument: "",
    bio: "",
    password: "",
  });

  const { register, handleSubmit } = useForm();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="border-4 rounded p-5 mb-4">
      <h2 className="text-lg text-center mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="First Name"
          name="firstName"
          value={state.firstName}
          onChange={handleChange}
          {...register("firstName", { required: true })}
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={state.lastName}
          onChange={handleChange}
          {...register("lastName", { required: true })}
        />
        <TextField
          label="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
          {...register("email", {
            required: true,
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          })}
        />
        <TextField
          label="User Name"
          name="userName"
          value={state.userName}
          onChange={handleChange}
          {...register("userName", { required: true })}
        />
        <TextField
          label="City"
          name="city"
          value={state.city}
          onChange={handleChange}
        />
        <TextField
          label="State"
          name="state"
          value={state.state}
          onChange={handleChange}
        />
        <Radio
          label="Instrument"
          name="instrument"
          value={state.instrument}
          onChange={handleChange}
        />
        <Checkbox
          label="Bio"
          name="bio"
          value={state.bio}
          onChange={handleChange}
        />
        <TextField
          type="password"
          label="Password"
          name="password"
          value={state.password}
          onChange={handleChange}
          {...register("password", {
            required: true,
            minLength: 8,
          })}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
