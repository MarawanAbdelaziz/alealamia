/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import BackButtoon from '../../../components/BackButtoon'
import { object, string } from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

function AddInstallments() {
  const [customers, setCustomers] = useState(JSON.parse(localStorage.getItem('customers')) || [])
  const [customerId, setCustomerId] = useState()
  const [installmentPeriodId, setInstallmentPeriodId] = useState()
  const [itemPrice, setItemPrice] = useState()
  const [total, setTotal] = useState()
  const [amountPerMonth, setAmountPerMonth] = useState()
  const [currentDate, setCurrentDate] = useState('')
  const [search, setSearch] = useState('')

  const Paydays = [1, 5, 10, 15, 20, 25]
  const installmentPeriods = [
    { period: 5, profit: '%10', profitRatio: 1.1 },
    { period: 10, profit: '%20', profitRatio: 1.2 },
    { period: 15, profit: '%30', profitRatio: 1.3 },
    { period: 20, profit: '%40', profitRatio: 1.4 }
  ]

  function getCustomer(id) {
    setCustomerId(customers.findIndex((customer) => customer.customer_id == id))
  }

  function getInstallmentPeriods() {
    const index = installmentPeriods.findIndex(
      (installmentPeriod) => installmentPeriod.period == getValues('installmentPeriod')
    )

    setInstallmentPeriodId(index)

    const totalCal = (getValues('itemPrice') * installmentPeriods[index].profitRatio).toFixed(2)
    setTotal(totalCal)

    const amountPerMonth = (totalCal / installmentPeriods[index].period).toFixed(2)
    setAmountPerMonth(amountPerMonth)

    setValue('total', totalCal)
    setValue('amountPerMonth', amountPerMonth)
    setValue('profitRatio', installmentPeriods[index].profit)
  }

  useEffect(() => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const formattedDate = `${year}-${month}-${day}`
    setCurrentDate(formattedDate)
  }, [])

  // const validationSchema = object().shape({
  //   name: string().required('متسبش الاسم فاضي'),
  //   phone: string()
  // })
  const {
    getValues,
    setValue,
    watch,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    // resolver: yupResolver(validationSchema),
    defaultValues: {
      installmentName: '',
      itemName: '',
      itemPrice: '',
      installmentPeriod: '',
      profitRatio: '',
      amountPerMonth: '',
      total: '',
      payday: '',
      dateOfPurchase: '',
      firstGuarantor: '',
      secondGuarantor: '',
      thirdGuarantor: '',
      fourthGuarantor: ''
    }
  })

  const onSubmit = (data) => {
    console.log('Form submitted')
    console.log(data)
  }

  useEffect(() => {
    if (watch('itemPrice') && watch('installmentPeriod')) {
      getInstallmentPeriods()
    }
  }, [watch('itemPrice'), watch('installmentPeriod')])

  useEffect(() => {
    if (watch('dateOfPurchase')) {
      setCurrentDate(watch('dateOfPurchase'))
    }
  }, [watch('dateOfPurchase')])

  return (
    <div className="bg-custom">
      <BackButtoon data={'/installments'} />
      <div className="">
        <div className="pt-20  mx-5 text-center ">
          <h2 htmlFor="names" className="mb-7 text-2xl">
            قسط جديد
          </h2>
          <p
            className={`border w-fit  mx-auto border-red-600 rounded-md py-2 px-4 mb-5 {errors?.name || errors?.phone ? 'block' : 'hidden'} `}
          >
            {/* {errors?.name?.message}
              {errors?.phone?.message} */}
          </p>
          <form className="" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-5 w-[60%] mx-auto text-right">
              <input
                className={`py-0.5 px-3 ma-auto w-fit block mb-1 text-right focus:outline-none bg-transparent border rounded-md placeholder:text-white`}
                placeholder="ابحث عن العميل"
                type="text"
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="flex ">
                <h3> اختار اسم العميل : </h3>
                <select
                  className="ms-4 px-2 py-1 bg-transparent border w-[40%] rounded-md focus:outline-none"
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
                  {customers
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
              <h4 className="">
                كود العميل :
                {customers[customerId]?.customer_id
                  ? ` ${customers[customerId]?.customer_id}`
                  : ' 0'}
              </h4>
              <input
                className={`py-2 px-3 w-[50%] me-auto focus:outline-none bg-transparent {errors.name && 'border-red-600'} border rounded-md placeholder:text-white`}
                placeholder="اسم القسط"
                type="text"
                {...register('installmentName')}
              />
              <input
                className={`py-2 px-3 w-[50%] me-auto focus:outline-none bg-transparent {errors.name && 'border-red-600'} border rounded-md placeholder:text-white`}
                placeholder="اسم السلعه"
                type="text"
                {...register('itemName')}
              />
              <input
                className={`py-2 px-3 w-[50%] me-auto focus:outline-none bg-transparent {errors.name && 'border-red-600'} border rounded-md placeholder:text-white`}
                placeholder="سعر السلعه"
                type="number"
                // onChange={(e) => setItemPrice(e.target.value)}
                {...register('itemPrice')}
              />

              <div className="flex">
                <h3>فترة القسط : </h3>
                <select
                  className="ms-4 px-2 py-1 bg-transparent border rounded-md focus:outline-none"
                  // onChange={(e) => getInstallmentPeriods(e.target.value)}
                  name="names"
                  id="names"
                  defaultValue=""
                  {...register('installmentPeriod')}
                >
                  <option className="hidden" value="" disabled>
                    اختار الفترة
                  </option>
                  {installmentPeriods?.map((installmentPeriod) => (
                    <option
                      className="bg-black "
                      key={installmentPeriod.period}
                      value={installmentPeriod.period}
                    >
                      {installmentPeriod.period} شهور
                    </option>
                  ))}
                </select>
              </div>

              <h4 className="">
                نسبه الربح :
                <span className="ms-1">
                  {installmentPeriodId != null
                    ? installmentPeriods[installmentPeriodId]?.profit
                    : '%0'}
                </span>
              </h4>
              <h4 className="">
                المبلغ في الشهر :
                <span className="ms-1">
                  {installmentPeriodId != null && !isNaN(amountPerMonth) ? amountPerMonth : '%0'}
                </span>
              </h4>
              <h4 className="">
                الاجمالي :
                <span className="ms-1">
                  {installmentPeriodId != null && !isNaN(total) ? total : '0'}
                </span>
              </h4>

              <div className="flex ">
                <h3> يوم الدفع : </h3>
                <select
                  className="ms-4 px-2 py-1 bg-transparent border rounded-md focus:outline-none"
                  name="names"
                  id="names"
                  defaultValue=""
                  {...register('payday')}
                >
                  <option className="hidden" value="" disabled>
                    اختار يوم
                  </option>
                  {Paydays?.map((Payday) => (
                    <option className="bg-black " key={Payday} value={Payday}>
                      {Payday}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex">
                <h3> تاريخ الشراء : </h3>
                <input
                  className="ms-4 bg-transparent border rounded-md py-0.5 px-2 focus:outline-none"
                  type="date"
                  value={currentDate}
                  {...register('dateOfPurchase')}
                />
              </div>
              <input
                className={`py-2 px-3  me-auto focus:outline-none bg-transparent  {errors.phone && 'border-red-600'} border rounded-md placeholder:text-white`}
                placeholder="اسم الضامن الاول"
                type="text"
                {...register('firstGuarantor')}
              />

              <input
                className={`py-2 px-3  me-auto focus:outline-none bg-transparent  {errors.phone && 'border-red-600'} border rounded-md placeholder:text-white`}
                placeholder="اسم الضامن الثاني"
                type="text"
                {...register('secondGuarantor')}
              />
              <input
                className={`py-2 px-3  me-auto focus:outline-none bg-transparent  {errors.phone && 'border-red-600'} border rounded-md placeholder:text-white`}
                placeholder="اسم الضامن الثالث"
                type="text"
                {...register('thirdGuarantor')}
              />
              <input
                className={`py-2 px-3  me-auto focus:outline-none bg-transparent  {errors.phone && 'border-red-600'} border rounded-md placeholder:text-white`}
                placeholder="اسم الضامن الرابع"
                type="text"
                {...register('fourthGuarantor')}
              />
              <button
                // disabled={errors.name ? true : false}
                className={`mb-20 {errors.name ? 'border-gray-500 text-gray-500' : ''} mx-auto py-2 px-2 border rounded-md`}
                type="submit"
              >
                ضيف قسط جديد
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddInstallments
