import './App.css'
import { Nav, Welcome, Footer, Services, Transactions, Loader } from './Components/index'
import logo from './images/logo.png'

const App = () =>  {
  
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
         <Nav />
         <Welcome />
      </div>

      <Services />
      <Transactions />
      <Footer /> 
    </div>
  )
}

export default App
