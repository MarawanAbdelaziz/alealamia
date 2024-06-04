/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import BackButtoon from '../../../components/BackButtoon'
import { useLocation } from 'react-router-dom'

function CustomerDetails() {
  const [customers, setCustomers] = useState(JSON.parse(localStorage.getItem('customers')) || [])
  let { state } = useLocation()
  const customerId = customers.findIndex((customer) => customer.customer_id == state.customer_id)
  console.log(customers[customerId])

  function deleteCustomer(id) {
    const newCustomers = [...customers]
    const newData = newCustomers[customerId]?.installments?.filter(
      (installment) => installment.installment_id != id
    )
    newCustomers[customerId].installments = newData
    setCustomers(newCustomers)

    localStorage.setItem('customers', JSON.stringify(customers))
  }
  const [months, setMonths] = useState([])

  function Months(number) {
    const months = []
    for (let i = 1; i <= number; i++) {
      months.push({
        month: `شهر ${i}`
      })
    }
    setMonths(months)
  }

  useEffect(() => {
    if (customers[customerId].installments) {
      const maxNum = Math.max(
        // eslint-disable-next-line no-unsafe-optional-chaining
        ...customers[customerId]?.installments?.map(
          (installment) => installment?.installmentMonths?.length
        )
      )

      maxNum == 20
        ? Months(20)
        : maxNum == 15
          ? Months(15)
          : maxNum == 10
            ? Months(10)
            : maxNum == 5
              ? Months(5)
              : Months(0)
    }
  }, [customers])

  return (
    <div
      className={`${customers[customerId]?.installments && customers[customerId]?.installments?.length != 0 ? 'bg-custom' : 'h-screen'}  pt-16`}
    >
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
          {customers[customerId]?.installments && customers[customerId]?.installments.length > 0 ? (
            <h3 className=" text-lg mb-3">
              عدد الاقساط : {customers[customerId]?.installments?.length}
            </h3>
          ) : (
            <h3 className="text-lg mb-3">عدد الاقساط : لا يوجد </h3>
          )}
          {customers[customerId]?.wasalAmanah && customers[customerId]?.wasalAmanah.length > 0 ? (
            <h3 className="text-lg mb-3">
              عدد وصل الامانه : {customers[customerId]?.wasalAmanah?.length}
            </h3>
          ) : (
            <h3 className="text-lg mb-3">عدد وصل الامانه : لا يوجد </h3>
          )}
        </div>

        {customers[customerId]?.installments && customers[customerId]?.installments.length > 0 && (
          <div className="mt-10 القسط">
            {customers[customerId]?.installments?.length != 0 &&
              customers[customerId]?.installments && (
                <div>
                  <h3 className="mb-3 ms-6 text-lg font-medium">معلومات عن القسط : </h3>
                  <div className="mx-6 border px-2 flex font-semibold">
                    <h3 className="py-2 border-l pe-2 me-2 basis-[10%]">كود</h3>
                    <h3 className="py-2 border-l pe-2 me-2 basis-[10%]">اسم القسط</h3>
                    <h3 className="py-2 border-l pe-2 me-2 basis-[10%]">اسم السلعة</h3>
                    <h3 className="py-2 border-l pe-2 me-2 basis-[10%]">سعر السلعة</h3>
                    <h3 className="py-2 border-l pe-2 me-2 basis-[10%]">المقدم</h3>
                    <h3 className="py-2 border-l pe-2 me-2 basis-[10%]"> المبلغ الشهري </h3>
                    <h3 className="py-2 border-l pe-2 me-2 basis-[10%]"> الأجمالي </h3>
                    <h3 className="py-2 border-l pe-2 me-2 basis-[10%]"> يوم الدفع </h3>
                    <h3 className="py-2 border-l pe-2 me-2 basis-[10%]"> عدد الشهور</h3>
                    <h3 className="py-2  pe-2 me-2 basis-[10%]">تاريخ الشراء </h3>
                  </div>
                </div>
              )}

            {customers[customerId]?.installments &&
              customers[customerId]?.installments?.map((installment) => (
                <div key={installment.installment_id} className="mx-6 border px-2 flex">
                  <h3 className="py-2 border-l pe-2 me-2 basis-[10%]">
                    {installment.installment_id}
                  </h3>
                  <h3 className="py-2 border-l pe-2 me-2 basis-[10%]">
                    {installment.installmentName}
                  </h3>
                  <h3 className="py-2 border-l pe-2 me-2 basis-[10%]"> {installment.itemName}</h3>
                  <h3 className="py-2 border-l pe-2 me-2 basis-[10%]">{installment.itemPrice} </h3>
                  <h3 className="py-2 border-l pe-2 me-2 basis-[10%]">
                    {installment.downPayment ? installment.downPayment : 'لا يوجد'}
                  </h3>
                  <h3 className="py-2 border-l pe-2 me-2 basis-[10%]">
                    {installment.amountPerMonth}
                  </h3>
                  <h3 className="py-2 border-l pe-2 me-2 basis-[10%]"> {installment.total}</h3>
                  <h3 className="py-2 border-l pe-2 me-2 basis-[10%]"> {installment.payday} </h3>
                  <h3 className="py-2 border-l pe-2 me-2 basis-[10%]">
                    {installment.installmentPeriod}
                  </h3>
                  <h3 className="py-2  pe-2 me-2 basis-[10%]"> {installment.dateOfPurchase} </h3>
                </div>
              ))}

            <div>
              <h3 className="mb-3 ms-6 text-lg font-medium mt-10 "> الضامنين : </h3>
              <div className="mx-6 border w-[45%] px-2 flex font-semibold">
                <h3 className="py-2 border-l pe-2 me-2 basis-[20%]">كود</h3>
                <h3 className="py-2 border-l pe-2 me-2 basis-[20%]">الضامن الاول</h3>
                <h3 className="py-2 border-l pe-2 me-2 basis-[20%]">الضامن الثاني</h3>
                <h3 className="py-2 border-l pe-2 me-2 basis-[20%]">الضامن الثالث</h3>
                <h3 className="py-2  pe-2 me-2 basis-[20%]">الضامن الرابع</h3>
              </div>
              {customers[customerId]?.installments &&
                customers[customerId].installments?.map((installment) => (
                  <div key={installment.installment_id} className="mx-6 border w-[45%] px-2 flex">
                    <h3 className="py-2 border-l pe-2 me-2 basis-[20%]">
                      {installment.installment_id}
                    </h3>
                    <h3 className="py-2 border-l pe-2 me-2 basis-[20%]">
                      {installment.firstGuarantor ? installment.firstGuarantor : 'لا يوجد'}
                    </h3>
                    <h3 className="py-2 border-l pe-2 me-2 basis-[20%]">
                      {installment.secondGuarantor ? installment.secondGuarantor : 'لا يوجد'}
                    </h3>
                    <h3 className="py-2 border-l pe-2 me-2 basis-[20%]">
                      {installment.thirdGuarantor ? installment.thirdGuarantor : 'لا يوجد'}
                    </h3>
                    <h3 className="py-2  pe-2 me-2 basis-[20%]">
                      {installment.fourthGuarantor ? installment.fourthGuarantor : 'لا يوجد'}
                    </h3>
                  </div>
                ))}
            </div>

            {customers[customerId]?.installments?.length != 0 &&
              customers[customerId]?.installments && (
                <div>
                  <h3 className="mb-3 ms-6 text-lg font-medium mt-10 "> المتبقي من القسط : </h3>
                  <div className="mx-6 border w-[45%] px-2 flex font-semibold">
                    <h3 className="py-2 border-l pe-2 me-2 basis-[20%]">كود</h3>
                    <h3 className="py-2 border-l pe-2 me-2 basis-[20%]">الشهور المتبقية</h3>
                  </div>
                </div>
              )}
            {customers[customerId]?.installments &&
              customers[customerId]?.installments?.map((installment) => (
                <div key={installment.installment_id} className="mx-6 border w-[45%] px-2 flex">
                  <h3 className="py-2 border-l pe-2 me-2 basis-[20%]">
                    {installment.installment_id}
                  </h3>
                  <h3 className="py-2 border-l pe-2 me-2 basis-[20%]">
                    {installment.installmentPeriod - installment.countMonths}
                  </h3>
                  <button
                    onClick={() => {
                      deleteCustomer(installment.installment_id)
                    }}
                    className="border border-red-600 rounded-md my-2 ms-auto py-1 px-2"
                  >
                    امسح القسط
                  </button>
                </div>
              ))}

            {months != 0 && (
              <div>
                <h3 className="mb-3 ms-6 text-lg font-medium mt-10"> شهور القسط : </h3>
                <div className="mx-6 border ps-2 flex font-semibold  w-fit">
                  <h3 className="py-2 pe-2 border-l me-2 w-10 ">كود</h3>
                  {months?.map((months) => (
                    <h3 key={months.month} className="py-2 border-l px-2  w-20">
                      {months.month}
                    </h3>
                  ))}
                </div>
              </div>
            )}

            {customers[customerId]?.installments?.map((installment) => (
              <div
                key={installment.installment_id}
                className="mx-6 border ps-2 flex font-semibold w-fit"
              >
                <h3 className="py-2 pe-2 border-l  me-2 w-10">{installment.installment_id}</h3>

                {installment?.installmentMonths?.map((installmentMonths) => (
                  <h3 key={installmentMonths.id} className="py-2 border-l px-2 w-20">
                    {installmentMonths.payed ? (
                      <del>{installmentMonths.amountPerMonth}</del>
                    ) : (
                      installmentMonths.amountPerMonth
                    )}
                  </h3>
                ))}
              </div>
            ))}
          </div>
        )}

        <div className="mb-28 mt-20">
          {customers[customerId]?.wasalAmanah?.length != 0 &&
            customers[customerId]?.wasalAmanah && (
              <div>
                <h3 className="mb-3 ms-6 text-lg font-medium">معلومات عن وصل الامانه : </h3>
                <div className="mx-6 border px-2 flex font-semibold">
                  <h3 className="py-2 border-l pe-2 me-2 basis-[10%]">كود</h3>
                  <h3 className="py-2 border-l pe-2 me-2 basis-[10%]">اسم البلد</h3>
                  <h3 className="py-2 border-l pe-2 me-2 basis-[10%]">رقم الدفتر</h3>
                  <h3 className="py-2 border-l pe-2 me-2 basis-[10%]">تاريخ الشراء </h3>
                  <h3 className="py-2  pe-2 me-2 basis-[10%]">تفاصيل</h3>
                </div>
              </div>
            )}

          {customers[customerId]?.wasalAmanah &&
            customers[customerId]?.wasalAmanah?.map((wasalAmanah) => (
              <div key={wasalAmanah.wasalAmanah_id} className="mx-6 border px-2 flex">
                <h3 className="py-2 border-l pe-2 me-2 basis-[10%]">
                  {wasalAmanah.wasalAmanah_id}
                </h3>
                <h3 className="py-2 border-l pe-2 me-2 basis-[10%]">{wasalAmanah.countryName}</h3>
                <h3 className="py-2 border-l pe-2 me-2 basis-[10%]">
                  {wasalAmanah.notebookNumber}
                </h3>
                <h3 className="py-2 border-l pe-2 me-2 basis-[10%]">
                  {wasalAmanah.dateOfPurchase}
                </h3>
                <h3 className="py-2  pe-2 me-2 basis-[10%]">
                  {wasalAmanah.details ? wasalAmanah.details : 'لا يوجد'}
                </h3>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default CustomerDetails
