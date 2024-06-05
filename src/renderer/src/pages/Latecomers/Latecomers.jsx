/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BackButtoon from '../../components/BackButtoon'

function Latecomers() {
  const [customers, setCustomers] = useState(JSON.parse(localStorage.getItem('customers')) || [])
  const [newCustomers, setNewCustomers] = useState([])
  const cust = []
  useEffect(() => {
    customers.map((customer) => {
      cust.push({
        customer_id: customer.customer_id,
        name: customer.name,
        installments: customer.installments.map((installment) => {
          installment.payday
          return {
            installmentName: installment.installmentName,
            itemName: installment.itemName,
            payday: installment.payday
          }
        })
      })
    })
    setNewCustomers(cust)
    console.log(newCustomers)
  }, [])

  const now = new Date()
  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${year}-${month}-${day}`
  }
  const formattedDate = formatDate(now)

  // const nextDay = new Date(now)
  // nextDay.setDate(now.getDate() + 1)
  // const formattedNewDate = formatDate(nextDay)

  return (
    <div className="h-screen px-20 pt-20">
      <BackButtoon data={'/'} />
      <div dir="ltr" className=" overflow-y-scroll ">
        {newCustomers?.map((customer) => (
          <div dir="rtl" key={customer.customer_id} className="border my-5 mx-3 py-4 px-4">
            <div className="w-full flex mb-3">
              <h3 className=" me-11">كود : {customer.customer_id}</h3>
              <h3 className=" me-auto">اسم : {customer.name}</h3>
            </div>
            {customer.installments.map((installment) => (
              <div className="flex  w-full" key={customer.customer_id}>
                <h3 className=" me-11">اسم القسط:{installment.installmentName}</h3>
                <h3 className=" me-11">اسم السلعه :{installment.itemName}</h3>
                <h3 className=" me-auto">يوم الدفع : {installment.payday}</h3>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Latecomers
