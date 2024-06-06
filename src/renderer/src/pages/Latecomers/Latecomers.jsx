/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BackButtoon from '../../components/BackButtoon'

function Latecomers() {
  const [customers, setCustomers] = useState(JSON.parse(localStorage.getItem('customers')) || [])
  const [newCustomers, setNewCustomers] = useState([])
  const [latecomers, setLatecomers] = useState(JSON.parse(localStorage.getItem('latecomers')) || [])
  const [customerId, setCustomerId] = useState(JSON.parse(localStorage.getItem('customerId')) || [])

  const now = new Date()
  function formatDateCustomer(date, myDay) {
    if (myDay < 10) {
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const year = date.getFullYear()
      return `${year}-${month}-${'0' + myDay}`
    } else {
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const year = date.getFullYear()
      return `${year}-${month}-${myDay}`
    }
  }

  useEffect(() => {
    const cust = []
    let customerIdArray = []
    customerId.length != 0 && (customerIdArray = JSON.parse(localStorage.getItem('customerId')))

    let customerIdlength = ''
    if (cust.length == 0) {
      customers?.map((customer) => {
        cust.push({
          customer_id: customer.customer_id,
          name: customer.name,
          installments: customer?.installments?.map((installment) => {
            const payday = formatDateCustomer(now, installment.payday)
            return {
              installment_id: installment.installment_id,
              installmentName: installment.installmentName,
              itemName: installment.itemName,
              payday: payday
            }
          })
        })

        customerIdlength =
          customerId.filter((customerId) => customerId == customer.customer_id).length == 0

        console.log('customerIdlength', customerIdlength)
        if (customerId.length == 0 || customerIdlength) {
          customerIdArray.push(customer.customer_id)
          localStorage.setItem('customerId', JSON.stringify(customerIdArray))
          setCustomerId(customerIdArray)
          console.log('meroooooooooooooooooooooooooooooooooooooooo')
        }
      })
      setNewCustomers(cust)
    }

    const cust1 = []

    if (latecomers.length == 0 || customerIdlength) {
      cust?.map((customer) => {
        cust1.push({
          customer_id: customer.customer_id,
          name: customer.name,
          installments: customer?.installments?.map((installment) => {
            let payday = new Date(installment.payday)
            payday.setDate(payday.getDate() + 5)
            return {
              installment_id: installment.installment_id,
              installmentName: installment.installmentName,
              itemName: installment.itemName,
              payday: payday.toISOString().split('T')[0]
            }
          })
        })
      })
      localStorage.setItem('latecomers', JSON.stringify(cust1))
      setLatecomers(cust1)
    }
  }, [])

  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${year}-${month}-${day}`
  }

  const nextDay = new Date(now)
  nextDay.setDate(now.getDate() + 1)
  const formattedNewDate = formatDate(nextDay)

  // paydayDate.push(newCustomers)
  // console.log(paydayDate)

  // console.log(newCustomers)

  return (
    <div className="h-screen px-20 pt-20">
      <BackButtoon data={'/'} />
      <div dir="ltr" className=" overflow-y-scroll ">
        {newCustomers?.map((customer) => (
          <div dir="rtl" key={customer.customer_id} className="border my-5 mx-3 py-4 px-4">
            <div className="w-full flex mb-3">
              <h3 className=" me-11">كود العميل : {customer.customer_id}</h3>
              <h3 className=" me-auto">الاسم : {customer.name}</h3>
            </div>
            {customer?.installments?.map((installment) => (
              <div className="flex  w-full" key={installment.installment_id}>
                <h3 className="mb-1 basis-[12%]">كود القسط: {installment.installment_id}</h3>
                <h3 className="mb-1 basis-[25%]">اسم القسط: {installment.installmentName}</h3>
                <h3 className="mb-1 basis-[25%]">اسم السلعه : {installment.itemName}</h3>
                <h3 className="basis-[12%]">يوم الدفع : {installment.payday}</h3>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Latecomers
