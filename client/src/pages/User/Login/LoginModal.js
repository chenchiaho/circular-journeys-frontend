import React, { useState, useEffect } from 'react'
import './LoginModal.scss'
import 'animate.css'
import SignupModal from '../Signup/SignupModal'
import Forgot from './Forgot'
import { IoCloseSharp } from 'react-icons/io5'
import { FcGoogle } from 'react-icons/fc'
import { BiShow, BiHide, BiArrowBack } from 'react-icons/bi'
import { useAlert } from 'hooks/useAlert'
import axios from 'axios'
import md5 from 'md5'

const LoginModal = ({ handleToggleLoginModal, loginModal }) => {

  const [signupModal, setSignupModal] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [userForgot, setUserForgot] = useState(false)
  const { alert, setAlert } = useAlert()
  const [inputChange, setInputChange] = useState({})

  // animation


  const handelInputChange = (event) => {
    setInputChange({
      ...inputChange,
      [event.target.name]: event.target.value
    })
  }

  // Login
  const handleLogin = async (event) => {
    event.preventDefault()
    const { userEmail, userPassword } = inputChange
    const encryption = md5(userPassword)
    if (userEmail === '' || userPassword === '') return
    const response = await axios.post('http://localhost:3001/user/login',
      {
        userEmail,
        userPassword: encryption
      }
    )
    if (response.data.state) {
      setTimeout(() => {
        handleToggleLoginModal()
        // save token to localStorage
        localStorage.setItem('token', response.data.token)
        window.location = '/'
      }, 300)
    } else {
      setAlert({ state: true, message: response.data.message })
    }
  }

  const handleCloseLoginModal = (event) => {
    if (event.target === event.currentTarget) {
      handleToggleLoginModal()
    }
  }
  const handleShowPasswordButton = () => {
    setShowPassword(!showPassword)
  }

  // Signup modal
  const handleToggleSignupModal = () => {
    if (userForgot) {
      setUserForgot(!userForgot)
    } else {
      setSignupModal(!signupModal)
    }
  }
  // Forgot page
  const handleToggleForgotPage = () => {
    setUserForgot(!userForgot)
  }

  return (
    <>
      <div
        className="login-modal-background"
        onClick={handleCloseLoginModal}
      >
        <div
          className='login-modal-content animate__animated animate__faster animate__bounceIn'
        >
          <div className="login-modal-content-background">
            <div className="close-login-button">
              {
                signupModal || userForgot
                  ? (
                    <div
                      onClick={handleToggleSignupModal}>
                      <BiArrowBack size={30} />
                    </div>
                  )
                  : (

                    <div
                      onClick={handleToggleLoginModal}>
                      <IoCloseSharp size={30} />
                    </div>
                  )
              }
            </div>
            {
              signupModal
                ? (
                  <SignupModal
                    setSignupModal={setSignupModal}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    handleShowPasswordButton={handleShowPasswordButton}
                    handleToggleSignupModal={handleToggleSignupModal}
                    setUserForgot={setUserForgot}
                    userForgot={userForgot}
                  />
                )
                : (
                  userForgot
                    ? (
                      <Forgot
                        showPassword={showPassword}
                        handleShowPasswordButton={handleShowPasswordButton}
                      />
                    )
                    : (
                      <div className="login-place">
                        <h1>登入</h1>
                        <form className='form-place' onSubmit={handleLogin}>
                          <input
                            className='input-box'
                            type="email"
                            name="userEmail"
                            id="userEmail"
                            placeholder='Email'
                            onChange={handelInputChange}
                          />
                          <div className='input-password'>
                            <input
                              className='input-box'
                              type={showPassword ? 'text' : 'password'}
                              name="userPassword"
                              id="userPassword"
                              placeholder='Password'
                              onChange={handelInputChange}
                            />
                            {
                              showPassword
                                ? (
                                  <BiHide
                                    className='show-password-icon'
                                    size={25}
                                    onClick={handleShowPasswordButton}
                                  />
                                )
                                : (
                                  <BiShow
                                    className='show-password-icon'
                                    size={25}
                                    onClick={handleShowPasswordButton}
                                  />
                                )
                            }
                          </div>
                          <div className="login-option">
                            <div className='alert-place'>
                              {alert.state && alert.message}
                            </div>
                            <div>
                              <a
                                className='text-style'
                                onClick={handleToggleForgotPage}
                              >
                                忘記密碼？
                              </a>
                            </div>
                          </div>
                          <div className="submit-place">
                            <input
                              className='input-submit'
                              type="submit"
                              value="登入"
                            />
                            <a
                              className='text-style'
                              onClick={handleToggleSignupModal}
                            >
                              還未加入會員嗎？立即註冊！
                            </a>
                            <p className='other-login-text'>其他登入方式</p>
                            <div className='other-login-place'>
                              <button
                                className='other-login-btn btn-google'
                                type="button"
                              >
                                <FcGoogle size={25} />
                              </button>
                              {/* <button
                              className='other-login-btn btn-facebook'
                              type="button"
                            >
                              <FaFacebookSquare color='#fff' size={25} />
                            </button>
                            <button
                              className='other-login-btn btn-apple'
                              type="button"
                            >
                              <AiFillApple color='#fff' size={25} />
                            </button> */}
                            </div>
                          </div>
                        </form>
                      </div>
                    )
                )
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginModal
