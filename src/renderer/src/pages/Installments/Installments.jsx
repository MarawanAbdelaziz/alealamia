import { useState } from 'react'
import AddInstallments from './AddInstallments/AddInstallments'
import PaymentOfInstallments from './PaymentOfInstallments/PaymentOfInstallments'
import BackButtoon from '../../components/BackButtoon'
import Drawer from './Drawer/Drawer'

function Installments() {
  const [toggle, setToggle] = useState('AddInstallments')

  return (
    <div>
      <div className="bg-custom text-center mt-28">
        <BackButtoon data={'/'} />
        <div className="flex mb-10 ">
          <button
            onClick={() => setToggle('AddInstallments')}
            className="block ms-28 me-5 text-xl border py-1 px-4 xl:py-1 xl:px-8 rounded-lg"
          >
            اضافه قسط
          </button>
          <button
            onClick={() => setToggle('PaymentOfInstallments')}
            className="block me-5 text-xl border py-1 px-4 xl:py-1 xl:px-8 rounded-lg"
          >
            دفع الاقساط
          </button>
          <button
            onClick={() => setToggle('Drawer')}
            className="block text-xl border py-1 px-4 xl:py-1 xl:px-8 rounded-lg"
          >
            الدرج
          </button>
        </div>
        <div className="w-full bg-white h-1"></div>
        <div>
          {toggle == 'PaymentOfInstallments' && <PaymentOfInstallments />}
          {toggle == 'AddInstallments' && <AddInstallments />}
          {toggle == 'Drawer' && <Drawer />}
        </div>
      </div>
    </div>
  )
}

export default Installments
