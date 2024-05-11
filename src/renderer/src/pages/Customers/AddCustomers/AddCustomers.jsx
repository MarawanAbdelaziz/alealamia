/* eslint-disable no-unused-vars */
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { object, string } from 'yup'
import { useStore } from '../../../store/useStore'

// const customers = [
//   {
//     customer_id: 1,
//     name: 'tarek',
//     phone: '01114996232'
//   }
// ]
// localStorage.setItem('customers', JSON.stringify(customers))

function AddCustomers() {
  let customers = JSON.parse(localStorage.getItem('customers'))
  const showOrAdd = useStore((state) => state.showOrAdd)

  const [errorMeassge, setErrorMeassge] = useState(false)
  const validationSchema = object().shape({
    name: string().required('متسبش الاسم فاضي'),
    phone: string()
    // .matches(/^01[0125][0-9]{8}$/, 'الرقم مكتوب غلط')
    // .notRequired()
  })
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: '',
      phone: ''
    }
  })

  const onSubmit = (data) => {
    const sameName = customers.filter((customer) => customer.name == data.name)
    if (sameName.length == 0) {
      customers = JSON.parse(localStorage.getItem('customers'))
      const newData = { customer_id: customers.length + 1, ...data }
      customers.push(newData)
      localStorage.setItem('customers', JSON.stringify(customers))
      console.log('Local :', JSON.parse(localStorage.getItem('customers')))
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'تم انشاء عميل جديد بنجاح',
        showConfirmButton: false,
        timer: 1500
      })
    } else if (sameName.length > 0) {
      setErrorMeassge(true)
    }
  }

  return (
    <div className="my-10 mx-5 text-center md:h-[64vh] lg:h-[77.6vh]">
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="mb-7 text-2xl">عميل جديد</h2>
        {errors.name || errors.phone || errorMeassge ? (
          <div className="border w-[300px] text-center mx-auto border-red-600 rounded-md py-2 px-4 mb-5">
            {errorMeassge && <p className="mb-2">الاسم الي بتحاول تدخله موجود قبل كدا </p>}
            {errors.name && <p className="mb-2">{errors.name.message}</p>}
            {errors.phone && <p className="mb-2">{errors.phone.message}</p>}
          </div>
        ) : (
          ''
        )}
        <div className="grid gap-5">
          <h4 className=""> كود العميل الجديد : {customers ? customers?.length + 1 : '1'}</h4>
          <input
            className={`py-2 px-3 w-[50%] mx-auto focus:outline-none bg-transparent ${errors.name && 'border-red-600'} border rounded-md placeholder:text-white`}
            placeholder="اسم العميل"
            type="text"
            {...register('name')}
          />
          <input
            className={`py-2 px-3 w-[50%] mx-auto focus:outline-none bg-transparent  ${errors.phone && 'border-red-600'} border rounded-md placeholder:text-white`}
            placeholder="رقم الموبيل"
            type="number"
            {...register('phone')}
          />

          <button
            disabled={errors.name ? true : false}
            className={` ${errors.name ? 'border-gray-500 text-gray-500' : ''} mx-auto py-2 px-2 border rounded-md`}
            type="submit"
          >
            ضيف عميل جديد
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddCustomers
