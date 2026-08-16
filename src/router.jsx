import { useEffect, useState } from 'react'

// Minimal hash-based router — zero dependencies.
// Routes look like #/  #/about  #/shop  #/shop?cat=face

export function useRoute() {
  const [hash, setHash] = useState(window.location.hash || '#/')

  useEffect(() => {
    const onChange = () => {
      setHash(window.location.hash || '#/')
      window.scrollTo({ top: 0 })
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  const [pathPart, queryPart] = hash.replace(/^#/, '').split('?')
  const params = new URLSearchParams(queryPart || '')
  return { path: pathPart || '/', params }
}

export function navigate(to) {
  window.location.hash = to
}

export function Link({ to, children, ...rest }) {
  return (
    <a href={`#${to}`} {...rest}>
      {children}
    </a>
  )
}
