import { Navigate } from 'react-router-dom'
import { useStore } from '../../store/useStore'

function ProtectedRoute(props) {
  const home = useStore((state) => state.home)

  if (home) {
    return props.children
  } else {
    return <Navigate to={'/login'} />
  }
}

export default ProtectedRoute
