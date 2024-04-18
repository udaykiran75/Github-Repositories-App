import './index.css'

const LanguageFilterItem = props => {
  const {tabDetails, onChangeTabId, isActive} = props
  const {id, language} = tabDetails
  const className = isActive ? 'activeTabStyle' : ''
  const onClickTabButton = () => {
    onChangeTabId(id)
  }

  return (
    <li>
      <button type="button" onClick={onClickTabButton} className={className}>
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
