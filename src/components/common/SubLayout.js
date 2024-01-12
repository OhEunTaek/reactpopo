import Footer from './Footer'
import { useEffect, useRef } from 'react'
import { Route, Switch } from 'react-router-dom'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function SubLayout({ name, sub, children }) {
  let title = name
  const section = useRef(null)
  const subTitle = useRef(null)
  const inputSerch = useRef(null)
  const showFlickrSerch = () => {
    sub.show({ type: 'search', tag: inputSerch.current.value })
  }

  if (title === 'location') {
    title = `contact us`
  } else if (title === 'members') {
    title = 'join'
  }

  useEffect(() => {
    section.current.classList.add('on')
  }, [])

  return (
    <section className={`container ${name}`} ref={section}>
      <div className="title-box">
        <h1>{title}</h1>
        <div className="sub-title" ref={subTitle}>
          <h2>{sub.title}</h2>
          {sub.count && <span className="badge-num">{sub.count}</span>}
        </div>
        <p>{sub.p}</p>

        {name === 'gallery' && (
          <div className="btns-show">
            <div className="btn-show-search">
              <input
                type="text"
                defaultValue={sub.tag}
                ref={inputSerch}
                onKeyUp={(e) => {
                  if (e.key === 'Enter') showFlickrSerch()
                }}
              />
              <button type="button" onClick={showFlickrSerch}>
                <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
              </button>
            </div>

            <button className="btn-show" type="button">
              <span>Atlassian Blog</span>
            </button>

            <button
              className="btn-show"
              type="button"
              onClick={() => {
                sub.show({ type: 'interest' })
              }}
            >
              <span>Flickr interest</span>
              <strong className="badge-num">{sub.flickr}</strong>
            </button>
          </div>
        )}
      </div>

      <div className="content-wrap">
        <div className="content">{children}</div>

        <Switch>
          <Route path="/department">
            <Footer type={'fixed'} />
          </Route>

          <Route path="/">
            <Footer />
          </Route>
        </Switch>
      </div>
    </section>
  )
}

export default SubLayout
