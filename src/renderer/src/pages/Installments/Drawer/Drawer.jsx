/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react'
import BackButtoon from '../../../components/BackButtoon'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'

function Drawer() {
  const [customers, setCustomers] = useState([])
  const [customersWithInstallments, setCustomersWithInstallments] = useState([])
  const [customerId, setCustomerId] = useState()
  const [installmentId, setInstallmentId] = useState()
  const [search, setSearch] = useState('')

  useEffect(() => {
    const storedCustomers = JSON.parse(localStorage.getItem('customers')) || []
    setCustomers(storedCustomers)
    const filteredCustomers = storedCustomers.filter(
      (customer) => customer.installments && customer.installments.length > 0
    )
    setCustomersWithInstallments(filteredCustomers)
  }, [])

  function getCustomer(id) {
    const newId = customersWithInstallments.findIndex((customer) => customer.customer_id == id)
    setCustomerId(newId)
  }

  function getInstallment(id) {
    const newId = customersWithInstallments[customerId]?.installments?.findIndex(
      (installment) => installment.installment_id == id
    )
    setInstallmentId(newId)
  }

  const installments = customersWithInstallments[customerId]?.installments[installmentId]

  function payNowBtn() {
    const customer = customers[customerId]
    const installment = customer.installments[installmentId]
    if (installment.countMonths < installment.installmentPeriod) {
      customers[customerId].installments[installmentId].installmentMonths[
        installments.countMonths
      ].payed = true
      if (installments.installmentMonths[installments.countMonths].payed) {
        customers[customerId].installments[installmentId].countMonths += 1
      }
      localStorage.setItem('customers', JSON.stringify(customers))
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'تم دفع القسط بنجاح',
        showConfirmButton: false,
        timer: 2000
      })
    } else {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'القسط خلص خلاص',
        showConfirmButton: false,
        timer: 2000
      })
    }
  }

  const { watch, register, handleSubmit } = useForm({
    defaultValues: { amountPerMonth: '' }
  })
  const amountPerMonth =
    customers[customerId]?.installments[installmentId]?.installmentMonths[installments.countMonths]
      ?.amountPerMonth

  const onSubmit = (data) => {
    if (parseFloat(data.amountPerMonth) == parseFloat(amountPerMonth)) {
      payNowBtn()
    } else if (
      parseFloat(data.amountPerMonth) < parseFloat(amountPerMonth) ||
      parseFloat(data.amountPerMonth) > parseFloat(amountPerMonth)
    ) {
      if (
        customers[customerId].installments[installmentId].installmentPeriod !=
        customers[customerId].installments[installmentId].countMonths + 1
      ) {
        customers[customerId].installments[installmentId].installmentMonths[
          installments.countMonths + 1
        ].amountPerMonth =
          parseFloat(
            customers[customerId]?.installments[installmentId]?.installmentMonths[
              installments.countMonths + 1
            ]?.amountPerMonth
          ) +
          parseFloat(
            customers[customerId]?.installments[installmentId]?.installmentMonths[
              installments.countMonths
            ]?.amountPerMonth
          ) -
          parseFloat(data.amountPerMonth)

        customers[customerId].installments[installmentId].installmentMonths[
          installments.countMonths
        ].amountPerMonth = parseFloat(data.amountPerMonth)

        customers[customerId].installments[installmentId].installmentMonths[
          installments.countMonths
        ].payed = true

        if (installments.installmentMonths[installments.countMonths].payed) {
          customers[customerId].installments[installmentId].countMonths += 1
        }
        localStorage.setItem('customers', JSON.stringify(customers))
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'تم دفع القسط بنجاح',
          showConfirmButton: false,
          timer: 2000
        })
      } else {
        if (
          parseFloat(
            customers[customerId]?.installments[installmentId]?.installmentMonths[
              installments.countMonths
            ]?.amountPerMonth
          ) < parseFloat(data.amountPerMonth)
        ) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'المبلغ دا اكبر من القسط الاخير',
            showConfirmButton: false,
            timer: 4000
          })
        } else {
          customers[customerId].installments[installmentId].installmentMonths[
            installments.countMonths
          ].payed = true
          if (installments.installmentMonths[installments.countMonths].payed) {
            customers[customerId].installments[installmentId].countMonths += 1
          }
          localStorage.setItem('customers', JSON.stringify(customers))
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'تم دفع اخر قسط ',
            showConfirmButton: false,
            timer: 2000
          })
        }
      }
    }
  }

  return (
    <div className="bg-custom">
      <BackButtoon data={'/installments'} />

      <div className="pt-20  mx-5 text-center">
        <h2 htmlFor="names" className="mb-7 text-2xl">
          الدرج
        </h2>
        {/* <div
          className={`border w-fit mx-auto border-red-600 rounded-md py-2 px-4 mb-5 ${(customerId == null && errorCode) || errors?.installmentName || errors?.itemName || errors?.itemPrice || errors?.installmentPeriod || errors?.payday ? 'block' : 'hidden'} `}
        >
          <h4>{errors?.installmentName?.message}</h4>
          {customerId == null && errorCode && <h4>متنساش تختار عميل</h4>}
        </div> */}
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-5 w-[60%] mx-auto text-right">
            <div className="اختار العميل">
              <input
                className={`py-0.5 px-3 ma-auto w-fit block mb-1 text-right focus:outline-none bg-transparent border rounded-md placeholder:text-white`}
                placeholder="ابحث عن العميل"
                type="text"
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="flex mt-10">
                <select
                  className={` px-2 py-1 bg-transparent border {customerId == null && errorCode && 'border-red-600'} w-[40%] rounded-md focus:outline-none`}
                  onChange={(e) => {
                    getCustomer(e.target.value)
                  }}
                  name="names"
                  id="names"
                  defaultValue=""
                >
                  <option className="hidden" value="" disabled>
                    اختار عميلك
                  </option>
                  {customersWithInstallments
                    ?.filter((customer) =>
                      customer.name.toLowerCase().includes(search.toLocaleLowerCase())
                    )
                    .map((customer) => (
                      <option
                        className="bg-black "
                        key={customer.name}
                        value={customer.customer_id}
                      >
                        {customer.name}
                      </option>
                    ))}
                </select>
              </div>
              <h4 className="mt-5">
                كود العميل :
                {customersWithInstallments[customerId]?.customer_id
                  ? ` ${customersWithInstallments[customerId]?.customer_id}`
                  : ' 0'}
              </h4>
            </div>

            <div className="اختار القسط">
              <div className="flex ">
                <select
                  className={` px-2 py-1 bg-transparent border {customerId == null && errorCode && 'border-red-600'} w-[40%] rounded-md focus:outline-none`}
                  onChange={(e) => {
                    getInstallment(e.target.value)
                  }}
                  name="names"
                  id="names"
                  defaultValue=""
                >
                  <option className="hidden" value="" disabled>
                    اختار القسط
                  </option>
                  {customersWithInstallments[customerId]?.installments?.map((installment) => (
                    <option
                      className="bg-black "
                      key={installment.installment_id}
                      value={installment.installment_id}
                    >
                      {installment.installmentName}
                    </option>
                  ))}
                </select>
              </div>

              {customerId != null && installmentId != null && (
                <div className="mt-8">
                  <h4>
                    كود القسط :
                    {installments?.installment_id ? ` ${installments?.installment_id}` : ' 0'}
                  </h4>

                  <h4>
                    الشهر الحالي :
                    {installments?.installmentMonths[installments.countMonths]?.amountPerMonth}
                  </h4>

                  <div className="flex items-center mt-5">
                    <button
                      disabled={watch('amountPerMonth') == '' ? false : true}
                      onClick={payNowBtn}
                      className={` py-2 px-2 border ${watch('amountPerMonth') != '' && 'border-gray-600 text-gray-600'} rounded-md me-4`}
                    >
                      المبلغ كامل
                    </button>
                    <h5>او</h5>
                    <input
                      className={`py-2 px-3 ms-4 focus:outline-none bg-transparent border rounded-md placeholder:text-white`}
                      placeholder="مبلغ اخر"
                      type="text"
                      {...register('amountPerMonth')}
                    />
                  </div>
                </div>
              )}
            </div>

            <button
              disabled={watch('amountPerMonth') == '' ? true : false}
              className={`mb-20 mx-auto py-2 px-2 border ${watch('amountPerMonth') == '' && 'border-gray-600 text-gray-600'} rounded-md`}
              type="submit"
            >
              مش عارف
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Drawer
