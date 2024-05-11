import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="h-screen flex justify-center items-center text-center">
      <div>
        <Link
          className="block mb-6 text-2xl xl:text-4xl   border py-2 px-4 xl:py-4 xl:px-8 rounded-lg "
          to={'/customers'}
        >
          العملاء
        </Link>

        <Link
          className="block mb-6 text-2xl xl:text-4xl border py-2 px-4 xl:py-4 xl:px-8 rounded-lg "
          to={'/installments'}
        >
          الأقساط
        </Link>
        <Link
          className="block mb-6 text-2xl xl:text-4xl border py-2 px-4 xl:py-4 xl:px-8 rounded-lg "
          to={'/installments'}
        >
          وصلات الامانة
        </Link>

        <Link
          className="block mb-6 text-2xl xl:text-4xl   border py-2 px-4 xl:py-4 xl:px-8 rounded-lg "
          to={'/reports'}
        >
          المتأخرين
        </Link>

        <Link
          className="block mb-6 text-2xl xl:text-4xl   border py-2 px-4 xl:py-4 xl:px-8 rounded-lg "
          to={'/changepassword'}
        >
          تغير الرمز السري
        </Link>
      </div>
    </div>
  )
}

export default Home
