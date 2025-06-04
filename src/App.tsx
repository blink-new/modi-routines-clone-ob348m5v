import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navigation from './components/Navigation'
import Dashboard from './pages/Dashboard'
import Routines from './pages/Routines'
import Habits from './pages/Habits'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'
import { useLocalStorage } from './hooks/useLocalStorage'


function App() {
  const [theme, setTheme] = useLocalStorage('theme', 'light')

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          <Navigation />
          <main className="pb-20 pt-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/routines" element={<Routines />} />
              <Route path="/habits" element={<Habits />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings toggleTheme={toggleTheme} theme={theme} />} />
            </Routes>
          </main>
          <Toaster 
            position="top-center"
            toastOptions={{
              duration: 3000,
              className: 'font-medium',
            }}
          />
        </div>
      </Router>
  )
}

export default App