import { useLocation } from 'react-router-dom'
import BackButtoon from '../../../components/BackButtoon'
import { useEffect, useState } from 'react'

function DrawerDetails() {
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

  console.log(state)
  //bg-custom
  return (
    <div className="h-screen">
      <BackButtoon data={'/installments'} />
      <div className="pt-28">
        <h2 className="text-2xl mb-10 text-center">تاريخ اليوم : {drawers[drawerId]?.date} </h2>
        <div>
          {drawers[drawerId]?.installment && (
            <div className="الاقساط">
              <h3 className="mb-3 ms-6 text-lg font-medium"> الأقساط : </h3>
              <div className="mx-6 border px-2 flex font-semibold ">
                <h3 className="py-2 border-l pe-2 me-2 basis-[10%]">كود</h3>
                <h3 className="py-2 border-l pe-2 me-2 basis-[10%]">اسم العميل</h3>
                <h3 className="py-2 border-l pe-2 me-2 basis-[10%]">اسم القسط</h3>
                <h3 className="py-2 border-l pe-2 me-2 basis-[10%]"> تاريخ الشراء </h3>
                <h3 className="py-2 border-l pe-2 me-2 basis-[10%]"> يوم الدفع </h3>
                <h3 className="py-2 border-l pe-2 me-2 basis-[10%]"> عدد الشهور</h3>
                <h3 className="py-2 border-l pe-2 me-2 basis-[10%]"> الشهور المتبقية</h3>
                <h3 className="py-2 border-l pe-2 me-2 basis-[10%]"> المبلغ الشهري </h3>
                <h3 className="py-2 ps-2 basis-[10%]"> المدفوغ </h3>
              </div>
            </div>
          )}

          {drawers[drawerId]?.drawer && (
            <div className="مصادر اخري">
              <h3 className="mb-3 ms-6 text-lg font-medium mt-20 "> مصادر اخري : </h3>
              <div className="mx-6 border px-2 flex font-semibold w-fit ">
                <h3 className="py-2 border-l pe-2 me-2 w-36 ">الاسم</h3>
                <h3 className="py-2 ps-2 w-96"> الوصف </h3>
              </div>
              {drawers[drawerId]?.drawer?.map((dr) => (
                <div
                  key={drawers[drawerId].day_id}
                  className="mx-6 border px-2 flex font-semibold w-fit "
                >
                  <h3 className="py-2 border-l pe-2 me-2 w-36 ">{dr.name}</h3>
                  <h3 className="py-2 ps-2 w-96"> {dr.description} </h3>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DrawerDetails
