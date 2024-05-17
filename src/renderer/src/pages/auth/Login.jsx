/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { useStore } from '../../store/useStore'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  if (localStorage.getItem('password') == null || localStorage.getItem('password') == '') {
    localStorage.setItem('password', '12345')
  }

  const [password, setPassword] = useState('')
  const [errorMassage, seterrorMassage] = useState(false)
  const storedPassword = localStorage.getItem('password')
  const goToHome = useStore((state) => state.goToHome)
  const navigate = useNavigate()

  function checkPassword() {
    if (password == storedPassword) {
      goToHome(true)
      navigate('/')
    } else {
      seterrorMassage(true)
    }
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <div>
          {errorMassage ? (
            <div className="block">
              <h2 className="text-3xl text-center text-red-500 mb-16">تاكد من رمز الدخول</h2>
            </div>
          ) : (
            ''
          )}
          <div className="w-[300px] h-[400px]  lg:w-[400px] lg:h-[500px] rounded-lg  shadow-[0_10px_35px_-10px_rgba(255,255,255,1)] text-center  ">
            <h2 className="my-10 text-3xl pt-20 lg:pt-28">قم بتسجيل دخولك</h2>

            <input
              className="py-1 px-2 bg-transparent focus:outline-none rounded-md shadow-[0_0px_15px_-3px_rgba(255,255,255,1)]"
              type="password"
              placeholder="رمز الدخول"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={checkPassword}
              className="block border border-white rounded-md py-2 px-4 mx-auto mt-10"
              type="submit"
            >
              اضغط
            </button>
          </div>
        </div>
      </form>

      <Link
        to={'/loginadmin'}
        className="absolute bottom-0 right-[25%] w-[40px] h-[40px] bg-transparent cursor-default"
      ></Link>
    </div>
  )
}

export default Login
