import { useEffect } from 'react'

function Pop({ close, children }) {
  useEffect(() => {
    document.body.style.overflowY = 'hidden'

    return () => {
      document.body.style.overflowY = 'auto'
    }
  }, [])

  return (
    <aside className="pop">
      {children}
      <button
        className="btn-close"
        onClick={() => {
          close(false)
        }}
      >
        <span>close</span>
      </button>
    </aside>
  )
}

export default Pop
