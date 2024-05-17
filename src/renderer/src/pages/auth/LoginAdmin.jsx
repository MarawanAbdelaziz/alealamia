/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { useStore } from '../../store/useStore'
import { useNavigate } from 'react-router-dom'

function LoginAdmin() {
  const [password, setPassword] = useState('')
  const [errorMassage, seterrorMassage] = useState(false)
  const goToHome = useStore((state) => state.goToHome)
  const navigate = useNavigate()

  function checkPassword() {
    if (password == '01009625110') {
      goToHome(true)
      localStorage.setItem('password', '12345')
      navigate('/')
    } else {
      seterrorMassage(true)
    }
  }

  return (
    <div className="h-screen flex justify-center items-center">
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
          <form
            onSubmit={(e) => {
              e.preventDefault()
            }}
          >
            <input
              className="py-1 px-2 bg-transparent focus:outline-none rounded-md shadow-[0_0px_15px_-3px_rgba(255,255,255,1)]"
              type="password"
              placeholder="رمز الدخول"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={checkPassword}
              className="block border border-gray-600 rounded-md py-2 px-4 mx-auto mt-10"
              type="submit"
            >
              اضغط
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginAdmin
