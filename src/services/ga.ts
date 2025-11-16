export function initGA() {
  const id = import.meta.env.VITE_GA_ID as string | undefined
  if (!id) return
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
  document.head.appendChild(script)
  ;(window as any).dataLayer = (window as any).dataLayer || []
  function gtag(...args: any[]) { (window as any).dataLayer.push(args) }
  ;(window as any).gtag = gtag
  gtag('js', new Date())
  gtag('config', id)
}