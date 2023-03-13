import {Component} from 'react'

import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import './index.css'

const apStatus = {
  initial: 'initial',
  loading: 'loading',
  success: 'success',
  fail: 'fail',
}

class CourseItem extends Component {
  state = {course: {}, ap: apStatus.initial}

  componentDidMount() {
    this.getItem()
  }

  getItem = async () => {
    this.setState({ap: apStatus.loading})

    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'Get',
    }
    const res = await fetch(url, options)
    if (res.ok === true) {
      const dat = await res.json()
      const updateCourse = {
        id: dat.course_details.id,
        name: dat.course_details.name,
        imageUrl: dat.course_details.image_url,
        description: dat.course_details.description,
      }
      this.setState({course: updateCourse, ap: apStatus.success})
    } else {
      this.setState({ap: apStatus.fail})
    }
  }

  successView = () => {
    const {course} = this.state
    return (
      <div className="cr">
        <div className="View">
          <img className="Vi" src={course.imageUrl} alt={course.name} />
          <div>
            <h1 className="Vh">{course.name}</h1>
            <p className="Vd">{course.description}</p>
          </div>
        </div>
      </div>
    )
  }

  loadingView = () => (
    <div data-testid="loader" className="loader-con">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  failView = () => (
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
        <button className="Fb" type="button" onClick={this.getItem}>
          Retry
        </button>
      </div>
    </div>
  )

  finalRender = () => {
    const {ap} = this.state
    switch (ap) {
      case apStatus.loading:
        return this.loadingView()
      case apStatus.success:
        return this.successView()
      case apStatus.fail:
        return this.failView()
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
        <div>{this.finalRender()}</div>
      </div>
    )
  }
}

export default CourseItem
