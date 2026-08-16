import { StoreProvider, useStore } from './context/StoreContext.jsx'
import { useRoute } from './router.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Shop from './pages/Shop.jsx'

function Toast() {
  const { toast } = useStore()
  if (!toast) return null
  return <div className="toast" role="status">{toast}</div>
}

function Page() {
  const { path, params } = useRoute()
  if (path === '/about') return <About />
  if (path === '/shop') return <Shop params={params} />
  return <Home />
}

export default function App() {
  return (
    <StoreProvider>
      <Header />
      <main>
        <Page />
      </main>
      <Footer />
      <CartDrawer />
      <Toast />
    </StoreProvider>
  )
}
