import SubLayout from '../common/SubLayout'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faXmarkSquare } from '@fortawesome/free-solid-svg-icons'
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useRef, useEffect } from 'react'

function Community() {
  const subtitle = {
    title: 'Atlassian Community',
    p: 'Explore, discuss, and co-create the products and practices that will take you and your team to the next level with Atlassian Community.',
  }

  const date = new Date()
  const month = date.getMonth()
  const monthString = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const day = date.getDate()
  const nowClock = () => {
    const date = new Date()
    const hours = String(date.getHours()).padStart(2, '0')
    const mins = String(date.getMinutes()).padStart(2, '0')
    const secs = String(date.getSeconds()).padStart(2, '0')
    return `${hours}:${mins}:${secs}`
  }
  const [Time, setTime] = useState(nowClock)

  const inputTitle = useRef(null)
  const inputContent = useRef(null)
  const titleEdit = useRef(null)
  const contentEdit = useRef(null)
  const [Posts, setPosts] = useState([])
  const [Edit, setEdit] = useState(true)

  const resetForm = () => {
    inputTitle.current.value = ''
    inputContent.current.value = ''
  }

  const showForm = () => {
    if (
      !inputTitle.current.value.trim() ||
      !inputContent.current.value.trim()
    ) {
      return alert('내용을 입력하세요')
    }

    setPosts([
      { title: inputTitle.current.value, content: inputContent.current.value },
      ...Posts,
    ])

    resetForm()
  }

  const deletePost = (i) => {
    const newPosts = Posts.filter((_, index) => i !== index)
    setPosts(newPosts)
  }

  const editPost = (i) => {
    if (!Edit) return
    setEdit(false)

    setPosts(
      Posts.map((post, index) => {
        if (i === index) post.edit = true
        return post
      })
    )
  }

  const updatePost = (i) => {
    if (!titleEdit.current.value.trim() || !contentEdit.current.value.trim()) {
      resetForm()
      return alert('수정할 제목과 본문을 모두 입력하세요.')
    }

    Posts.map((post, index) => {
      if (i === index) {
        post.title = titleEdit.current.value
        post.content = contentEdit.current.value
        post.edit = false
      }
      return post
    })

    setEdit(true)
  }

  const cancelPost = (i) => {
    setEdit(true)

    setPosts(
      Posts.map((post, index) => {
        if (i === index) post.edit = false
        return post
      })
    )
  }

  useEffect(() => {
    setInterval(() => {
      setTime(nowClock)
    }, 1000)
  }, [])

  return (
    <SubLayout name="community" sub={subtitle}>
      <div className="board-input">
        <div className="board-input-top">
          <div className="title">
            <h1>
              Send <br />
              comments
            </h1>

            <div className="today">
              <span className="day">{day}</span>
              <span className="month">{monthString[month]}</span>
            </div>
          </div>

          <p className="time">
            <FontAwesomeIcon icon={faClock}></FontAwesomeIcon>
            <span>{nowClock()}</span>
          </p>
        </div>

        <div className="input-list">
          <div className="input-item">
            <input
              type="text"
              placeholder="title"
              name="Title"
              ref={inputTitle}
            />
            <textarea
              name="content"
              placeholder="Content"
              ref={inputContent}
            ></textarea>
          </div>
        </div>

        <div className="btns-community-input">
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
          <button type="button" onClick={showForm}>
            Registration
          </button>
        </div>
      </div>

      <div className="board-ouput">
        <ul className="board-list">
          {Posts.map((post, i) => {
            return (
              <li className="board-item" key={i}>
                {post.edit ? (
                  <div className="input-edit-list">
                    <input
                      type="text"
                      placeholder="title"
                      name="Title"
                      ref={titleEdit}
                      defaultValue={post.title}
                    />
                    <textarea
                      name="content"
                      placeholder="Content"
                      ref={contentEdit}
                      defaultValue={post.content}
                    ></textarea>

                    <div className="btns-edit">
                      <button
                        type="button"
                        onClick={() => {
                          cancelPost(i)
                        }}
                      >
                        <FontAwesomeIcon icon={faXmarkSquare}></FontAwesomeIcon>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          updatePost(i)
                        }}
                      >
                        <FontAwesomeIcon icon={faSquareCheck}></FontAwesomeIcon>
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>

                    <div className="btns-community-ouput">
                      <button
                        type="button"
                        onClick={() => {
                          editPost(i)
                        }}
                      >
                        <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          deletePost(i)
                        }}
                      >
                        <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
                      </button>
                    </div>
                  </>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </SubLayout>
  )
}

export default Community
