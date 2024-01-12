import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function Footer({ type }) {
  return (
    <footer className={type}>
      <ul>
        <li>Privacy Policy</li>
        <li>Terms</li>
        <li>Cookie Settings</li>
        <li>Copyright &copy; 2022 Atlassian</li>
      </ul>

      <form className="footer-form">
        <FontAwesomeIcon icon={faGlobe} className="icon-globe" />
        <select name="language" id="">
          <option value="eng">Eng</option>
          <option value="kor">Kor</option>
        </select>
      </form>
    </footer>
  )
}

export default Footer
