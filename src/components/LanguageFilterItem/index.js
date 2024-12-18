import {Component} from 'react'
import './index.css'

class LanguageFilterItem extends Component {
  onChangeFilter = () => {
    const {changingFilter, details} = this.props
    const {id} = details
    changingFilter(id)
  }

  render() {
    const {details, current} = this.props
    const {language, id} = details
    const style = id === current ? 'active-btn' : ''

    return (
      <li className="li-filter-items">
        <button
          onClick={this.onChangeFilter}
          className={`btn-item ${style}`}
          type="button"
        >
          {language}
        </button>
      </li>
    )
  }
}

export default LanguageFilterItem
