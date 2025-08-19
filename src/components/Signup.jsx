import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth'
import { login } from '../store/authSlice'
import { useForm } from 'react-hook-form'
import Logo from './Logo'
import Button from './Button'


function Signup() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const { register, handleSubmit } = useForm()

  const create = async (data) => {
    setError('')
    try {
      const account = await authService.createAccount(data)
      if (account) {
        const user = await authService.getCurrentUser()
        if (user) {
          dispatch(login(user))
          navigate('/')
        }
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Logo in top-left */}
      <div className="p-6">
        <Logo className="w-16" />
      </div>

      {/* Signup box */}
      <div className="mx-auto w-full max-w-lg bg-white rounded-xl p-10 border border-gray-200 shadow-md">
        <h2 className="text-center text-3xl font-bold mb-6">Sign up</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block font-medium">Email</label>
            <input
              type="email"
              id="email"
              {...register("email", { required: true })}
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block font-medium">Password</label>
            <input
              type="password"
              id="password"
              {...register("password", { required: true })}
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <Button type="submit" className="w-full">Sign up</Button>

          <div className="flex items-center gap-2 my-4">
            <hr className="flex-1 border-gray-300" />
            <span className="text-gray-500 text-sm">or</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          <Button type="button" onClick={() => authService.GoogleLogin()} className="w-full">
            Continue with Google
          </Button>

          <Button type="button" onClick={() => authService.GithubLogin()} className="w-full">
            Continue with GitHub
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">Log in</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
