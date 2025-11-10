import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const RegisterPage = () => {

  const [name, Setname] = useState('')
  const [email, SetEmail] = useState('')
  const [password, SetPassword] = useState('')
  const navigator = useNavigate()
  const {register} = useContext(UserContext)

    const handleSubmit = async (e) => {
    e.preventDefault();
    await register({name, email, password });
  };

  return (
    <div className="mt-10 md:mt-24">
      <div className="w-full flex flex-row gap-10 items-center justify-center">
        <div>
          <form
            onSubmit={handleSubmit}
            className="fieldset bg-base-200 border-base-300 rounded-box w-md border py-16 px-10"
          >
            <p className="fieldset-legend text-2xl">Register</p>

            <label className="label">Name</label>
            <input
              type="name"
              className="input"
              placeholder="Name"
              value={name}
              onChange={(e) => Setname(e.target.value)}
              required
            />


            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              placeholder="Email"
              value={email}
              onChange={(e) => SetEmail(e.target.value)}
              required
            />

            <label className="label">Password</label>
            <input
              type="password"
              className="input"
              placeholder="Password"
              value={password}
              onChange={(e) => SetPassword(e.target.value)}
              required
            />

            <button type="submit" className="btn btn-neutral mt-4">
              Register
            </button>

            <p className="mt-3 px-1">
              I have an account?{" "}
              <span onClick={() => navigator('/login')} className="text-blue-300 cursor-pointer">Logon</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage