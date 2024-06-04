import { useLocation } from 'react-router-dom'
import BackButtoon from '../../../components/BackButtoon'
import { useEffect, useState, useRef } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

function DrawerDetails() {
  const componentRef = useRef()

  const applyTemporaryStyles = (element) => {
    element.style.padding = '20px'
  }

  const revertTemporaryStyles = (element) => {
    element.style.padding = ''
  }

  const handleSavePdf = async () => {
    const element = componentRef.current

    applyTemporaryStyles(element)

    const width = element.offsetWidth
    const height = element.offsetHeight

    const canvas = await html2canvas(element, { width, height, scale: 2 })
    const imgData = canvas.toDataURL('image/png')

    revertTemporaryStyles(element)

    const pdf = new jsPDF('p', 'mm', 'a4')
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()

    const imgWidth = canvas.width
    const imgHeight = canvas.height

    const widthRatio = pdfWidth / imgWidth
    const heightRatio = pdfHeight / imgHeight

    const ratio = Math.min(widthRatio, heightRatio)

    const newWidth = imgWidth * ratio
    const newHeight = imgHeight * ratio
    console.log(newWidth)
    console.log(newHeight)
    const imgX = 0
    const imgY = 0

    pdf.addImage(imgData, 'PNG', imgX, imgY, newWidth, newHeight)
    pdf.save(`درج بتاريخ ${drawers[drawerId]?.date}.pdf`)
  }

  // eslint-disable-next-line no-unused-vars
  const [drawers, setDrawers] = useState(JSON.parse(localStorage.getItem('drawers')) || [])
  console.log(drawers)
  let { state } = useLocation()
  const [drawerId, setDrawerId] = useState()

  function getDrawer(id) {
    const newId = drawers.findIndex((drawer) => drawer.day_id == id)
    setDrawerId(newId)
  }
  useEffect(() => {
    getDrawer(state.day_id)
  }, [])

  return (
    <div className="bg-white text-black">
      <BackButtoon data={'/installments'} />
      <div className="pt-28 py-10 ">
        <div ref={componentRef} className="h-fit">
          <h2 className="text-2xl mb-10 text-center">تاريخ اليوم : {drawers[drawerId]?.date} </h2>
          <div className="mb-5">
            {drawers[drawerId]?.installment && (
              <div className="الاقساط">
                <h3 className="mb-3 ms-6 text-lg font-medium"> الأقساط : </h3>
                <div className={`mx-6 border border-black px-2 flex font-semibold `}>
                  <h3 className="py-2 border-l border-black pe-2 me-2 basis-[10%]">كود العميل</h3>
                  <h3 className="py-2 border-l border-black pe-2 me-2 basis-[10%]">اسم العميل</h3>
                  <h3 className="py-2 border-l border-black pe-2 me-2 basis-[10%]">اسم القسط</h3>
                  <h3 className="py-2 border-l border-black pe-2 me-2 basis-[10%]">تاريخ الشراء</h3>
                  <h3 className="py-2 border-l border-black pe-2 me-2 basis-[10%]"> يوم الدفع </h3>
                  <h3 className="py-2 border-l border-black pe-2 me-2 basis-[10%]"> عدد الشهور</h3>
                  <h3 className="py-2 border-l border-black pe-2 me-2 basis-[10%]">
                    الشهور المتبقية
                  </h3>
                  <h3 className="py-2 border-l border-black pe-2 me-2 basis-[10%]">
                    المبلغ الشهري
                  </h3>
                  <h3 className="py-2 ps-2 basis-[10%]"> المدفوغ </h3>
                </div>
                {drawers[drawerId]?.installment?.map((installment) => (
                  <div
                    key={installment.customer_id}
                    className="mx-6 border border-black px-2 flex font-semibold "
                  >
                    <h3 className="py-2 border-l border-black pe-2 me-2 basis-[10%]">
                      {installment.customer_id}
                    </h3>
                    <h3 className="py-2 border-l border-black pe-2 me-2 basis-[10%]">
                      {installment.name}
                    </h3>
                    <h3 className="py-2 border-l border-black pe-2 me-2 basis-[10%]">
                      {installment.installmentName}
                    </h3>
                    <h3 className="py-2 border-l border-black pe-2 me-2 basis-[10%]">
                      {installment.dateOfPurchase}
                    </h3>
                    <h3 className="py-2 border-l border-black pe-2 me-2 basis-[10%]">
                      {installment.payday}
                    </h3>
                    <h3 className="py-2 border-l border-black pe-2 me-2 basis-[10%]">
                      {installment.installmentPeriod}
                    </h3>
                    <h3 className="py-2 border-l border-black pe-2 me-2 basis-[10%]">
                      {installment.remainingMonths}
                    </h3>
                    <h3 className="py-2 border-l border-black pe-2 me-2 basis-[10%]">
                      {installment.amountPerMonth}
                    </h3>
                    <h3 className="py-2 ps-2 basis-[10%]">{installment.currentMonth}</h3>
                  </div>
                ))}
              </div>
            )}

            {drawers[drawerId]?.downPayment && (
              <div className="المقدم mt-20">
                <h3 className="mb-3 ms-6 text-lg font-medium"> المقدم : </h3>
                <div className="mx-6 border border-black px-2 flex font-semibold ">
                  <h3 className="py-2 border-l border-black pe-2 me-2 basis-[10%]">كود العميل</h3>
                  <h3 className="py-2 border-l border-black pe-2 me-2 basis-[10%]">اسم العميل</h3>
                  <h3 className="py-2 border-l border-black pe-2 me-2 basis-[10%]">اسم القسط</h3>
                  <h3 className="py-2 border-l border-black pe-2 me-2 basis-[10%]">مقدم</h3>
                  <h3 className="py-2 border-l border-black pe-2 me-2 basis-[10%]">
                    المبلغ الشهري
                  </h3>
                  <h3 className="py-2 border-l border-black pe-2 me-2 basis-[10%]"> عدد الشهور</h3>
                  <h3 className="py-2 border-l border-black pe-2 me-2 basis-[10%]"> يوم الدفع </h3>
                  <h3 className="py-2 ps-2 basis-[10%]"> تاريخ الشراء </h3>
                </div>
                {drawers[drawerId]?.downPayment.map((downPayment) => (
                  <div
                    key={downPayment?.customer_id}
                    className="mx-6 border border-black px-2 flex font-semibold "
                  >
                    <h3 className="py-2 border-l border-black pe-2 me-2 basis-[10%]">
                      {downPayment?.customer_id}
                    </h3>
                    <h3 className="py-2 border-l border-black pe-2 me-2 basis-[10%]">
                      {downPayment?.name}
                    </h3>
                    <h3 className="py-2 border-l border-black pe-2 me-2 basis-[10%]">
                      {downPayment?.installmentName}
                    </h3>
                    <h3 className="py-2 border-l border-black pe-2 me-2 basis-[10%]">
                      {downPayment?.downPayment}
                    </h3>
                    <h3 className="py-2 border-l border-black pe-2 me-2 basis-[10%]">
                      {downPayment?.amountPerMonth}
                    </h3>
                    <h3 className="py-2 border-l border-black pe-2 me-2 basis-[10%]">
                      {downPayment?.installmentPeriod}
                    </h3>
                    <h3 className="py-2 border-l border-black pe-2 me-2 basis-[10%]">
                      {downPayment?.payday}
                    </h3>

                    <h3 className="py-2 ps-2 basis-[10%]">{downPayment?.dateOfPurchase}</h3>
                  </div>
                ))}
              </div>
            )}

            {drawers[drawerId]?.drawer && (
              <div className="مصادر اخري">
                <h3 className="mb-3 ms-6 text-lg font-medium mt-20 "> مصادر اخري : </h3>
                <div className="mx-6 border border-black px-2 flex font-semibold w-fit ">
                  <h3 className="py-2 border-l border-black pe-2 me-2 w-36 ">الاسم</h3>
                  <h3 className="py-2 ps-2 w-96"> الوصف </h3>
                </div>
                {drawers[drawerId]?.drawer?.map((dr) => (
                  <div
                    key={drawers[drawerId].day_id}
                    className="mx-6 border border-black px-2 flex font-semibold w-fit "
                  >
                    <h3 className="py-2 border-l border-black pe-2 me-2 w-36 ">{dr.name}</h3>
                    <h3 className="py-2 ps-2 w-96"> {dr.description} </h3>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <button
          className={`block text-lg mt-10 mx-auto  py-2 px-10 border border-black rounded-md`}
          onClick={handleSavePdf}
        >
          احفظ في ملف PDF
        </button>
      </div>
    </div>
  )
}

export default DrawerDetails
