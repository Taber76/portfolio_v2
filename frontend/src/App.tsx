import { Home } from './views'
import { NavBar, Footer } from './components'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {


  return (
    <div className="App bg-gray-900">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App
