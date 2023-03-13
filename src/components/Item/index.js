import {Link} from 'react-router-dom'
import './index.css'

const Item = props => {
  const {itemDetails} = props
  const {id, name, logoUrl} = itemDetails
  return (
    <li className="list-container">
      <Link to={`/courses/${id}`} className="link-el">
        <img className="course-img" src={logoUrl} alt={name} />
        <p className="course-name">{name}</p>
      </Link>
    </li>
  )
}

export default Item
