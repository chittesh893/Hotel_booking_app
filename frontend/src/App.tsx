import { useState } from 'react'
import './App.css'

function App() {
  const [isSignIn, setIsSignIn] = useState(false)

  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  })

  const [signinData, setSigninData] = useState({
    email: '',
    password: ''
  })

  const handleSignupInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSignupData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSigninInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSigninData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Signup form submitted:', signupData)
    // Here you would typically send the data to your backend
    alert('Sign up successful!')
  }

  const handleSigninSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Signin form submitted:', signinData)
    // Here you would typically send the data to your backend
    alert('Sign in successful!')
  }

  return (
    <div className="app">
      <div className="form-container">
        <div className="form-header">
          <h1>{isSignIn ? 'Welcome Back' : 'Create Account'}</h1>
          <p>{isSignIn ? 'Sign in to your account' : 'Join us today and start your journey'}</p>
        </div>

        {!isSignIn ? (
          // Signup Form
          <form className="auth-form" onSubmit={handleSignupSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={signupData.firstName}
                  onChange={handleSignupInputChange}
                  required
                  placeholder="Enter your first name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={signupData.lastName}
                  onChange={handleSignupInputChange}
                  required
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="signupEmail">Email Address</label>
              <input
                type="email"
                id="signupEmail"
                name="email"
                value={signupData.email}
                onChange={handleSignupInputChange}
                required
                placeholder="Enter your email address"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={signupData.phone}
                onChange={handleSignupInputChange}
                required
                placeholder="Enter your phone number"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="signupPassword">Password</label>
                <input
                  type="password"
                  id="signupPassword"
                  name="password"
                  value={signupData.password}
                  onChange={handleSignupInputChange}
                  required
                  placeholder="Create a password"
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={signupData.confirmPassword}
                  onChange={handleSignupInputChange}                  placeholder="Confirm your password"
                />
              </div>
            </div>

            <button type="submit" className="auth-button">
              Create Account
            </button>
          </form>
        ) : (
          // Signin Form
          <form className="auth-form" onSubmit={handleSigninSubmit}>
            <div className="form-group">
              <label htmlFor="signinEmail">Email Address</label>
              <input
                type="email"
                id="signinEmail"
                name="email"
                value={signinData.email}
                onChange={handleSigninInputChange}
                required
                placeholder="Enter your email address"
              />
            </div>

            <div className="form-group">
              <label htmlFor="signinPassword">Password</label>
              <input
                type="password"
                id="signinPassword"
                name="password"
                value={signinData.password}
                onChange={handleSigninInputChange}
                required
                placeholder="Enter your password"
              />
            </div>

            <div className="form-group">
              <div className="forgot-password">
                <a href="#">Forgot your password?</a>
              </div>
            </div>

            <button type="submit" className="auth-button">
              Sign In
            </button>
          </form>
        )}

        <div className="auth-link">
          <p>
            {isSignIn ? "Don't have an account? " : "Already have an account? "}
            <a href="#" onClick={(e) => { e.preventDefault(); setIsSignIn(!isSignIn) }}>
              {isSignIn ? 'Sign up' : 'Sign in'}
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}












export default App

