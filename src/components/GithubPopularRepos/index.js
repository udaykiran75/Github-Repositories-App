import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    activeTabId: languageFiltersData[0].id,
    tabItemList: [],
    apiStatus: 'INITIAL',
  }

  componentDidMount() {
    this.getallrepositories()
  }

  getallrepositories = async () => {
    this.setState({apiStatus: 'INPROGRESS'})
    const {activeTabId} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${activeTabId}`
    const response = await fetch(url)
    const data = await response.json()

    if (response.ok === true) {
      const formatedData = data.popular_repos.map(eachItem => ({
        name: eachItem.name,
        id: eachItem.id,
        issuesCount: eachItem.issues_count,
        forksCount: eachItem.forks_count,
        starsCount: eachItem.stars_count,
        avatarUrl: eachItem.avatar_url,
      }))
      this.setState({
        tabItemList: formatedData,
        apiStatus: 'SUCCESS',
      })
    } else {
      this.setState({apiStatus: 'FAILURE'})
    }
  }

  onChangeTabId = tabId => {
    this.setState({activeTabId: tabId}, this.getallrepositories)
  }

  failureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="error-message">Something Went Wrong</h1>
    </div>
  )

  loadingView = () => (
    <div data-testid="loader" className="loading-div">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  repositoriesView = () => {
    const {tabItemList} = this.state
    return (
      <ul className="items-list">
        {tabItemList.map(eachItem => (
          <RepositoryItem itemDetails={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  renderApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case 'INPROGRESS':
        return this.loadingView()
      case 'SUCCESS':
        return this.repositoriesView()
      case 'FAILURE':
        return this.failureView()
      default:
        return null
    }
  }

  render() {
    const {activeTabId} = this.state
    return (
      <div className="main-bg-container">
        <h1 className="heading">Popular</h1>
        <ul className="tabs-list">
          {languageFiltersData.map(tabItem => (
            <LanguageFilterItem
              tabDetails={tabItem}
              onChangeTabId={this.onChangeTabId}
              isActive={activeTabId === tabItem.id}
              key={tabItem.id}
            />
          ))}
        </ul>
        {this.renderApiStatus()}
      </div>
    )
  }
}
export default GithubPopularRepos
