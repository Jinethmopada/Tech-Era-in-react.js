import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Item from '../Item'
import './index.css'

const apiStatusConstants = {
  initial: 'initial',
  success: 'success',
  failure: 'failure',
  loading: 'loading',
}

class Home extends Component {
  state = {apiStatus: apiStatusConstants.initial, coursesList: []}

  componentDidMount() {
    this.getCoursesList()
  }

  getCoursesList = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const url = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.courses.map(eachCourse => ({
        id: eachCourse.id,
        name: eachCourse.name,
        logoUrl: eachCourse.logo_url,
      }))
      this.setState({
        coursesList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {coursesList} = this.state
    return (
      <div className="course-container">
        <h1 className="course-head">Courses</h1>
        <ul className="list">
          {coursesList.map(each => (
            <Item key={each.id} itemDetails={each} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <div>
      <Link to="/" className="link-el">
        <nav className="failure-container">
          <img
            className="w-logo"
            src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
            alt="website logo"
          />
        </nav>
      </Link>
      <div className="FailCon">
        <img
          className="FailIm"
          src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
          alt="failure view"
        />
        <h1 className="Fh">Oops! Something Went wRONG</h1>
        <p className="Fp">
          We cannot seem to find the page you are looking for
        </p>
        <button className="Fb" type="button" onClick={this.getCoursesList}>
          Retry
        </button>
      </div>
    </div>
  )

  renderFinalView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.loading:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Link to="/" className="link-el">
          <div className="Nel">
            <img
              className="Logo"
              src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
              alt="website logo"
            />
          </div>
        </Link>
        {this.renderFinalView()}
      </div>
    )
  }
}

export default Home
