import { Link } from 'react-router-dom'
import BackButtoon from '../../components/BackButtoon'

function Installments() {
  return (
    <div>
      <BackButtoon data={'/'} />
      <div className="h-screen flex justify-center items-center text-center">
        <div>
          <Link
            className="block mb-6 text-2xl xl:text-4xl   border py-2 px-4 xl:py-4 xl:px-8 rounded-lg "
            to={'/drawer'}
          >
            الدرج
          </Link>

          <Link
            className="block mb-6 text-2xl xl:text-4xl border py-2 px-4 xl:py-4 xl:px-8 rounded-lg "
            to={'/addinstallments'}
          >
            اضافه قسط
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Installments
