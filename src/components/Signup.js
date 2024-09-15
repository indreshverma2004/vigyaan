import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const response = await fetch('http://localhost:5000/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user, email, password }),
    });

    const json = await response.json();
    if (json.success) {
      navigate('/login');
    } else {
      console.error(json.err);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="w-50 text-center">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="user" className="form-label">Enter Your Name</label>
            <input type="text" className="form-control" id="user" onChange={(e) => setUser(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" onChange={(e) => setEmail(e.target.value)} />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword2" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="exampleInputPassword2" onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary w-100">Submit</button>
        </form>
        <div className="mt-3">
          <p>Already have an account?</p>
          <Link to='/login' className="btn btn-secondary w-100">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
