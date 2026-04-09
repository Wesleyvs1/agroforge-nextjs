'use client'

export default function FontAwesomeLoader() {
  return (
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
      crossOrigin="anonymous"
      media="print"
      onLoad={(e) => {
        ;(e.target as HTMLLinkElement).media = 'all'
      }}
    />
  )
}