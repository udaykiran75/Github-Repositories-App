import './index.css'

const RepositoryItem = props => {
  const {itemDetails} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = itemDetails
  return (
    <li className="list-card">
      <div className="avatar-name">
        <img src={avatarUrl} className="avatar-image" alt={name} />
        <h1 className="name">{name}</h1>
      </div>
      <div className="list-div">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="icons"
        />
        <p className="num">{starsCount}</p>
      </div>
      <div className="list-div">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="icons"
        />
        <p className="num">{forksCount}</p>
      </div>
      <div className="list-div">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="icons"
        />
        <p className="num">{issuesCount}</p>
      </div>
    </li>
  )
}
export default RepositoryItem
