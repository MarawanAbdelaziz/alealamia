/* eslint-disable no-unused-vars */
import { useState } from 'react'
import BackButtoon from '../../../components/BackButtoon'
import { useLocation } from 'react-router-dom'

function CustomerDetails() {
  const [customers, setCustomers] = useState(JSON.parse(localStorage.getItem('customers')) || [])
  let { state } = useLocation()
  console.log(customers)
  const customerId = customers.findIndex((customer) => customer.customer_id == state.customer_id)

  console.log(customerId)
  return (
    <div className="h-screen pt-16">
      <BackButtoon data={'/customers'} />
      <div className="mt-16">
        <h2 className="text-center text-3xl">تفاصيل العميل</h2>
        <div className="mt-10 ms-28">
          <h3 className="text-lg mb-3">
            كود : <spa className="ms-2">{customers[customerId]?.customer_id}</spa>
          </h3>
          <h3 className="text-lg mb-3">الاسم : {customers[customerId]?.name}</h3>
          <h3 className="text-lg mb-3">
            رقم الموبيل :
            {customers[customerId]?.phone == null || customers[customerId]?.phone == ''
              ? ' لا يوجد رقم للعميل'
              : ` ${customers[customerId]?.phone}`}
          </h3>
        </div>
      </div>
    </div>
  )
}

export default CustomerDetails
