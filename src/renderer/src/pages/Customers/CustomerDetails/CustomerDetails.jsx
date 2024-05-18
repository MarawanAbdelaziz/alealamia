/* eslint-disable no-unused-vars */
import { useState } from 'react'
import BackButtoon from '../../../components/BackButtoon'
import { useLocation } from 'react-router-dom'

function CustomerDetails() {
  const [customers, setCustomers] = useState(JSON.parse(localStorage.getItem('customers')) || [])
  let { state } = useLocation()
  const customerId = customers.findIndex((customer) => customer.customer_id == state.customer_id)
  console.log(customers[customerId].installments)

  return (
    <div className={`${customers[customerId]?.installments ? 'bg-custom' : 'h-screen'}  pt-16`}>
      <BackButtoon data={'/customers'} />
      <div className="mt-16">
        <h2 className="text-center text-3xl">تفاصيل العميل</h2>
        <div className="mt-10 ms-28">
          <h3 className="text-lg mb-3">
            كود : <span className="ms-2">{customers[customerId]?.customer_id}</span>
          </h3>
          <h3 className="text-lg mb-3">الاسم : {customers[customerId]?.name}</h3>
          <h3 className="text-lg mb-3">
            رقم الموبيل :
            {customers[customerId]?.phone == null || customers[customerId]?.phone == ''
              ? ' لا يوجد رقم للعميل'
              : ` ${customers[customerId]?.phone}`}
          </h3>
          {customers[customerId]?.installments ? (
            <h3 className="text-lg mb-3">
              عدد الاقساط : {customers[customerId]?.installments?.length}
            </h3>
          ) : (
            <h3 className="text-lg mb-3">عدد الاقساط : لا يوجد قسط</h3>
          )}
        </div>
        {customers[customerId]?.installments &&
          customers[customerId].installments.map((installment) => (
            <div
              key={installment.installment_id}
              className="grid grid-cols-4 mt-8 border rounded-md py-2 px-2 ms-4 me-4 text-base"
            >
              <h3 className=" mb-3 me-5 ">كود القسط : {installment.installment_id}</h3>
              <h3 className=" mb-3 me-5 ">اسم القسط : {installment.installmentName}</h3>
              <h3 className=" mb-3 me-5 ">اسم السلعه : {installment.itemName}</h3>
              <h3 className=" mb-3 me-5 ">سعر السلعه : {installment.itemPrice}</h3>
              <h3 className=" mb-3 me-5 ">فترة القسط : {installment.installmentPeriod}</h3>
              <h3 className=" mb-3 me-5 ">نسبة الربح : {installment.profitRatio}</h3>
              <h3 className=" mb-3 me-5 ">المبلغ في الشهر : {installment.amountPerMonth}</h3>
              <h3 className=" mb-3 me-5 ">الأجمالي : {installment.total}</h3>
              <h3 className=" mb-3 me-5 "> يوم الدفع : {installment.payday}</h3>
              <h3 className=" mb-3 me-5 "> تاريخ الشراء : {installment.dateOfPurchase}</h3>
              {installment.firstGuarantor && (
                <h3 className=" mb-3 me-5 "> الضامن الاول : {installment.firstGuarantor}</h3>
              )}

              {installment.secondGuarantor && (
                <h3 className=" mb-3 me-5 "> الضامن الثاني : {installment.secondGuarantor}</h3>
              )}
              {installment.thirdGuarantor && (
                <h3 className=" mb-3 me-5 "> الضامن الثالث : {installment.thirdGuarantor}</h3>
              )}
              {installment.fourthGuarantor && (
                <h3 className=" mb-3 me-5 "> الضامن الرابع : {installment.fourthGuarantor}</h3>
              )}
            </div>
          ))}
      </div>
    </div>
  )
}

export default CustomerDetails
