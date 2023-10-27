import { useLocation } from "react-router-dom"
import { TypeOptions, toast } from "react-toastify"
import HomePage from "../home"

export default function AuthRedirect() {
    const { pathname, search } = useLocation()
    const queryParams = new URLSearchParams(search)
  
    const notify = (message: string, type: TypeOptions = 'error') => {
      toast(<div>Toast Message {message}</div>, {
        type: type,
      })
    }
  
    const render = () => {
      switch (pathname) {
        case '/register':
          return <div> register Page</div>
          // <SignupCard noti={notify} queryParams={queryParams} />
        case '/login':
          return <div> Login Page</div>
          //  <LoginCard noti={notify} queryParams={queryParams} />
        default:
          return <HomePage></HomePage>
      }
    }
  
    return <div>{render()}</div>
  }
  