import { useState, useEffect } from 'react'
import axios from 'axios'

const url = `${process.env.REACT_APP_DEV_URL}/user/userinfo`

const useAuth = () => {
  const token = localStorage.getItem('token')
  const [isLogin, setIsLogin] = useState({
    userState: false,
    userData: {}
  })

  const getUserData = async () => {
    const result = await axios.post(url, { token })
    const { member_id } = result?.data
    setIsLogin({
      userState: true,
      userData: member_id
    })
  }

  useEffect(() => {
    token && getUserData()
  }, [])


  return { isLogin, setIsLogin }
}

export default useAuth
