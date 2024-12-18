import {Component} from 'react'
import './index.css'

class RepositoryItem extends Component {
  render() {
    const {details} = this.props
    const {name, issuesCount, forksCount, starsCount, avatarUrl} = details
    return (
      <li className="repo-items">
        <img className="repo-img" src={avatarUrl} alt={name} />
        <h1 className="repo-name">{name}</h1>
        <div className="repo-details">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png "
            alt="stars"
            className="icon"
          />
          <p className="details">{starsCount} stars</p>
        </div>
        <div className="repo-details">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="icon"
          />
          <p className="details">{forksCount} forks</p>
        </div>
        <div className="repo-details">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="icon"
          />
          <p className="details">{issuesCount} open issues</p>
        </div>
      </li>
    )
  }
}

export default RepositoryItem
