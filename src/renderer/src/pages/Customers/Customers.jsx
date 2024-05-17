/* eslint-disable no-unused-vars */
import BackButtoon from '../../components/BackButtoon'
import ShowCustomers from './ShowCustomers/ShowCustomers'
import AddCustomers from './AddCustomers/AddCustomers'
import { useStore } from '../../store/useStore'
import { useState } from 'react'

function Customers() {
  // const [showOrAdd, setShowOrAdd] = useState(true)
  const [showOrAdd, setShowOrAdd] = useState(true)

  return (
    <div className="h-screen">
      <BackButtoon data={'/'} />

      <div className="w-[80%] mx-auto mb-5">
        <button
          onClick={() => setShowOrAdd(!showOrAdd)}
          className="mt-28 border py-1 px-3 rounded-md "
        >
          {showOrAdd ? 'اضف عميل' : 'بيانات  العملاء'}
        </button>
      </div>
      <div className="w-[80%] mx-auto ">{showOrAdd ? <ShowCustomers /> : <AddCustomers />}</div>
    </div>
  )
}
export default Customers
