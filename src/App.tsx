import Navbar from './components/Navigation/Navbar'
import CustomCursor from './components/Common/CustomCursor'
import Home from './pages/Home'
import './App.css'

function App() {
  return (
    <div className="app">
      <CustomCursor />
      <Navbar />
      <main>
        <Home />
      </main>
    </div>
  )
}

export default App