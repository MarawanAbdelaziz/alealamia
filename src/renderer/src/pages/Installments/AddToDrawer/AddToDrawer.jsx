/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'

function AddToDrawer() {
  const [drawers, setDrawers] = useState(JSON.parse(localStorage.getItem('drawers')) || [])
  const [currentDay, setCurrentDay] = useState('')
  const [firstDay, setFirstDay] = useState(JSON.parse(localStorage.getItem('firstDay')) || '')
  const [newDay, setNewDay] = useState(JSON.parse(localStorage.getItem('newDay')) || '')
  const [randomNum, setRandomNum] = useState()
  const [currentDate, setCurrentDate] = useState('')

  useEffect(() => {
    const now = new Date()
    const day = String(now.getDate()).padStart(2, '0')
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const year = now.getFullYear()
    const formattedDate = `${year}-${month}-${day}`

    setCurrentDay(day)
    if (firstDay == '') {
      setFirstDay(day)
    }
    if (newDay == '') {
      localStorage.setItem('newDay', JSON.stringify(Number(day) + 1))
    }
    randomFun()
    setCurrentDate(formattedDate)
  }, [])

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      description: ''
    }
  })

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
  }

  function randomFun() {
    let uniqueRandomNum
    do {
      uniqueRandomNum = randomInt(1, drawers.length + 2)
    } while (drawers.some((drawer) => drawer.drawer_id === uniqueRandomNum))
    setRandomNum(uniqueRandomNum)
  }

  useEffect(() => {
    randomFun()
  }, [drawers])

  const drawer = []

  const onSubmit = (data) => {
    if (currentDay == firstDay) {
      if (drawers.length == 0) {
        drawer.push(data)
        const newData = { drawer }
        const newData1 = { day_id: randomNum, date: currentDate, ...newData }
        drawers.push(newData1)
      } else if (!drawers[drawers.length - 1]?.drawer) {
        drawer.push(data)
        drawers[drawers.length - 1].drawer = drawer
      } else {
        drawers[drawers.length - 1]?.drawer.push(data)
      }
      localStorage.setItem('firstDay', JSON.stringify(currentDay))
      localStorage.setItem('drawers', JSON.stringify(drawers))
    } else if (currentDay == newDay) {
      localStorage.setItem('newDay', JSON.stringify(Number(newDay) + 1))
      setNewDay(Number(newDay) + 1)
      drawer.push(data)
      const newData = { drawer }
      const newData1 = { day_id: randomNum, date: currentDate, ...newData }
      drawers.push(newData1)
    } else if (!drawers[drawers.length - 1]?.drawer) {
      drawer.push(data)
      drawers[drawers.length - 1].drawer = drawer
    } else {
      drawers[drawers.length - 1]?.drawer.push(data)
    }
    localStorage.setItem('drawers', JSON.stringify(drawers))
    console.log(drawers)

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'تم الاضافة ',
      showConfirmButton: false,
      timer: 2000
    })
  }

  return (
    <div>
      <h2 className="mt-10 text-2xl">اضف الي الدرج</h2>
      <div className="w-[60%] ms-32">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className={`block mt-16 me-auto py-2 px-3 focus:outline-none bg-transparent border rounded-md placeholder:text-white`}
            type="text"
            required
            placeholder="الاسم"
            {...register('name')}
          />

          <textarea
            className={`block w-[50%] mt-10 me-auto py-2 px-3  focus:outline-none bg-transparent border rounded-md placeholder:text-white`}
            required
            placeholder="الوصف"
            {...register('description')}
          ></textarea>

          <button
            className={`block mt-16 text-lg me-auto py-2 px-10 border rounded-md`}
            type="submit"
          >
            اضافة
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddToDrawer
