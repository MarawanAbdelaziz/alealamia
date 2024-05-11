/* eslint-disable no-unused-vars */
import { useState } from 'react'

function ShowCustomers() {
  let customers = JSON.parse(localStorage.getItem('customers'))
  const [seed, setSeed] = useState(1)
  function deleteCustomer(id) {
    const customerid = customers.findIndex((customer) => customer.customer_id == id)
    customers.splice(customerid, 1)
    localStorage.setItem('customers', JSON.stringify(customers))
    customers = JSON.parse(localStorage.getItem('customers'))
    setSeed(Math.random())
    // console.log(JSON.parse(localStorage.getItem('customers')))
  }

  const [customerSearch, setCustomerSearch] = useState('')
  const searchCustomerResult = customers.filter((customer) => {
    return customer.name.toLowerCase().includes(customerSearch.toLowerCase())
  })

  return (
    <div className={`my-10 mx-5 ${customers.length == 0 && 'md:h-[64vh] lg:h-[77.6vh]'}  `}>
      <input
        className={`py-2 px-3 mx-auto block mb-10 w-[50%] text-center focus:outline-none bg-transparent border rounded-md placeholder:text-white`}
        placeholder="ابحث عن العميل"
        type="text"
        onChange={(e) => setCustomerSearch(e.target.value)}
      />
      <div className="border">
        {searchCustomerResult
          ? searchCustomerResult?.map((customer) => (
              <div key={customer.customer_id} className="border my-5 mx-3 flex py-4 px-4">
                <h3 className=" me-11">كود العميل: {customer.customer_id}</h3>
                <h3 className=" me-auto">اسم العميل: {customer.name}</h3>
                <button className="border border-green-500 me-5 rounded-md py-1 px-2">
                  تفاصيل العميل
                </button>

                <button
                  onClick={() => {
                    deleteCustomer(customer.customer_id)
                  }}
                  className="border border-red-600 rounded-md py-1 px-2"
                >
                  امسح العميل
                </button>
              </div>
            ))
          : customers?.map((customer) => (
              <div key={customer.customer_id} className="border my-5 mx-3 flex py-4 px-4">
                <h3 className=" me-11">كود العميل: {customer.customer_id}</h3>
                <h3 className=" me-auto">اسم العميل: {customer.name}</h3>
                <button className="border border-green-500 me-5 rounded-md py-1 px-2">
                  تفاصيل العميل
                </button>

                <button
                  onClick={() => {
                    deleteCustomer(customer.customer_id)
                  }}
                  className="border border-red-600 rounded-md py-1 px-2"
                >
                  امسح العميل
                </button>
              </div>
            ))}
      </div>
    </div>
  )
}

export default ShowCustomers
