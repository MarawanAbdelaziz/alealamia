import { useState } from 'react'
import BackButton from '../../components/BackButtoon'

function ChangePassword() {
  const [OldPassword, setOldPassword] = useState('')
  const Password = localStorage.getItem('password')

  const [checkOldPassword, setCheckOldPassword] = useState('empty')

  const [newPassword, setNewPassword] = useState('')
  const [newMessage, setNewMessage] = useState('empty')

  function submitB() {
    if (newPassword == '') {
      setNewMessage(false)
    } else if (OldPassword == Password) {
      setCheckOldPassword(true)
      localStorage.setItem('password', newPassword)
      setNewMessage(true)
      console.log(localStorage.getItem('password'))
    } else {
      setCheckOldPassword(false)
      setNewMessage(false)
    }
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <BackButton data={'/'} />
      <div>
        {newMessage == 'empty' ? (
          ''
        ) : newMessage ? (
          <div className="w-[300px] lg:w-[400px] ">
            <h2 className="text-3xl text-center mb-10 lg:mb-16"> تم تغير رمز الدخول بنجاح</h2>
          </div>
        ) : (
          <div className="w-[300px] lg:w-[400px] ">
            <h2 className="text-xl text-center mb-10 lg:mb-16">
              {' '}
              متسبش رمز الدخول فاضي او الباسورد القديم غلط
            </h2>
          </div>
        )}
        <div className=" w-[300px] h-[480px] lg:w-[400px] lg:h-[500px] rounded-lg  shadow-[0_10px_35px_-10px_rgba(255,255,255,1)] text-center  ">
          <h2 className="my-10 text-3xl pt-16 lg:pt-20">قم بتسجيل دخولك</h2>
          <div className="grid grid-cols-1 gap-10">
            <input
              className={`py-2 px-3 bg-transparent mx-10 focus:outline-none rounded-md ${checkOldPassword == 'empty' ? 'shadow-[0_0px_15px_-3px_rgba(255,255,255,1)]' : checkOldPassword ? 'shadow-[0_0px_15px_-3px_rgba(178,222,39,1)]' : 'shadow-[0_0px_15px_-3px_rgba(255,0,0,1)]'} `}
              type="text"
              placeholder="رمز الدخول القديم"
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <input
              className="py-2 px-3 bg-transparent mx-10 focus:outline-none rounded-md shadow-[0_0px_15px_-3px_rgba(255,255,255,1)]"
              type="text"
              placeholder="رمز الدخول الجديد"
              onChange={(e) => {
                setNewPassword(e.target.value)
              }}
            />
          </div>

          <button
            className="block border border-white rounded-md py-2 px-4 mx-auto mt-10"
            type="submit"
            onClick={submitB}
          >
            اضغط
          </button>

          <p className="mt-10 w-5/6 mx-auto">
            ركز وانت بتغير الرمز السري لانك من غيره متقدرش تفتح تاني ابدا او الحل انك تكلم المبرمج
          </p>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword
