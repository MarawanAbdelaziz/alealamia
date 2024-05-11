/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'

function BackButtoon({ data }) {
  return (
    <div className="absolute top-4 right-4">
      <Link to={`${data}`}>ارجع لي ورا</Link>
    </div>
  )
}

export default BackButtoon
