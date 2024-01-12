import SubLayout from '../common/SubLayout'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

function Members() {
  const subtitle = {
    title: 'Get Trello for free',
    p: "By signing up, you confirm that you've read and accepted our Terms of Service and Privacy Policy.",
  }

  const memberShip = {
    userID: '',
    password: '',
    password2: '',
    userEmail: '',
  }

  const [Info, setInfo] = useState(memberShip)
  const [ErrMsg, setErrMsg] = useState({})
  const [Submit, setSubmit] = useState(false)
  const history = useHistory()

  const check = (input, e) => {
    const err = {}
    const eng = /[a-zA-Z]/
    const num = /[0-9]/
    const spc = /[~!@#$%^&*()_+`\[\]{}]/

    if (input.userID.length < 5) {
      err.userID = 'Please enter at least 5 characters'
      e.target.userID.style.borderColor = 'red'
    } else {
      e.target.userID.style.borderColor = '#03afff'
    }

    if (
      input.password.length < 6 ||
      !eng.test(input.password) ||
      !num.test(input.password) ||
      !spc.test(input.password)
    ) {
      err.password =
        'Include at least 6 characters in English, numbers, and special characters'
      e.target.password.style.borderColor = 'red'
    } else {
      e.target.password.style.borderColor = '#03afff'
    }

    if (input.password !== input.password2 || !input.password2) {
      err.password2 = 'Passwords do not match. Please enter it again'
      e.target.password2.style.borderColor = 'red'
    } else {
      e.target.password2.style.borderColor = '#03afff'
    }

    if (input.userEmail.length < 8 || !/@/.test(input.userEmail)) {
      err.userEmail = 'Include at least 8 characters of @'
      e.target.userEmail.style.borderColor = 'red'
    } else {
      e.target.userEmail.style.borderColor = '#03afff'
    }

    return err
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setInfo({ ...Info, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrMsg(check(Info, e))
  }

  useEffect(() => {
    const length = Object.keys(ErrMsg).length
    if (length === 0 && Submit) {
      alert('회원가입이 완료되었습니다. 메인 페이지로 이동합니다')
      history.push('/')
    }
  }, [ErrMsg])

  return (
    <SubLayout name="members" sub={subtitle}>
      <div className="sub-top"></div>
      <form onSubmit={handleSubmit} className="member-form">
        <fieldset className="required-box">
          <legend>Membership registration required</legend>
          <div className="input-list">
            <div className="input-item">
              <label htmlFor="userID">ID</label>
              <input
                type="text"
                id="userID"
                name="userID"
                placeholder="Please enter your ID"
                onChange={handleChange}
              />
              <span className="err-msg">{ErrMsg.userID}</span>
            </div>

            <div className="input-item">
              <label htmlFor="password">password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="6+ characters"
                onChange={handleChange}
              />
              <span className="err-msg">{ErrMsg.password}</span>
            </div>

            <div className="input-item">
              <label htmlFor="password2">Confirm Password</label>
              <input
                type="password"
                id="password2"
                name="password2"
                placeholder="Please confirm your password"
                onChange={handleChange}
              />
              <span className="err-msg">{ErrMsg.password2}</span>
            </div>

            <div className="input-item">
              <label htmlFor="userEmail">email</label>
              <input
                type="mail"
                id="userEmail"
                name="userEmail"
                placeholder="Please enter your email"
                onChange={handleChange}
              />
              <span className="err-msg">{ErrMsg.userEmail}</span>
            </div>
          </div>
        </fieldset>

        <fieldset className="option-box">
          <legend>
            Membership <br />
            options
          </legend>
          <div className="input-list">
            <div className="input-item">
              <label htmlFor="funnel">funnel</label>
              <select name="funnel" id="funnel">
                <option value="">choice</option>
                <option value="">blog</option>
                <option value="">insta</option>
                <option value="">facebook</option>
                <option value="">youtube</option>
              </select>
            </div>

            <div className="input-item ">
              <span className="label">reception</span>

              <div className="checkbox-group">
                <div className="checkbox">
                  <input type="checkbox" id="agree-email" name="reception" />
                  <label htmlFor="agree-email">I agree to receive emails</label>
                </div>

                <div className="checkbox">
                  <input type="checkbox" id="agree-sms" name="reception" />
                  <label htmlFor="agree-sms">I agree to receive SMS/MMS</label>
                </div>
              </div>
            </div>
          </div>
        </fieldset>

        <button
          type="submit"
          onClick={() => {
            setSubmit(true)
          }}
        >
          Create account
        </button>
      </form>
    </SubLayout>
  )
}

export default Members
