import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const statusConstants = {
  loading: 'LOADING',
  error: 'ERROR',
  display: 'DISPLAY',
}

class GithubPopularRepos extends Component {
  state = {
    currentFilter: languageFiltersData[0].id,
    gitRepoData: [],
    status: statusConstants.loading,
  }

  componentDidMount() {
    this.getGitHubRepos()
  }

  getGitHubRepos = async () => {
    this.setState({status: statusConstants.loading})
    const {currentFilter} = this.state
    const githubReposApiUrl = `https://apis.ccbp.in/popular-repos?language=${currentFilter}`

    const response = await fetch(githubReposApiUrl)
    if (response.ok === true) {
      const data = await response.json()
      const updatedGitData = data.popular_repos.map(eachData => ({
        name: eachData.name,
        id: eachData.id,
        issuesCount: eachData.issues_count,
        forksCount: eachData.forks_count,
        starsCount: eachData.stars_count,
        avatarUrl: eachData.avatar_url,
      }))
      this.setState({
        gitRepoData: updatedGitData,
        status: statusConstants.display,
      })
    } else {
      this.setState({status: statusConstants.error})
    }
  }

  onChangingFilter = id => {
    this.setState({currentFilter: id}, this.getGitHubRepos)
  }

  render() {
    const {currentFilter, gitRepoData, status} = this.state

    let content
    switch (status) {
      case statusConstants.loading:
        content = (
          <div data-testid="loader" className="loader-container">
            <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
          </div>
        )
        break
      case statusConstants.display:
        content = (
          <ul className="git-repo-container">
            {gitRepoData.map(eachData => (
              <RepositoryItem details={eachData} key={eachData.id} />
            ))}
          </ul>
        )
        break
      case statusConstants.error:
        content = (
          <div className="error-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
              alt=" failure view"
              className="error-img"
            />
            <p className="error-msg">Something Went Wrong</p>
          </div>
        )
        break
      default:
        content = null
    }

    return (
      <div className="repo-container-main">
        <h1 className="title">Popular</h1>
        <ul className="ul-filter">
          {languageFiltersData.map(eachItem => (
            <LanguageFilterItem
              current={currentFilter}
              changingFilter={this.onChangingFilter}
              details={eachItem}
              key={eachItem.id}
            />
          ))}
        </ul>
        {content}
      </div>
    )
  }
}

export default GithubPopularRepos
