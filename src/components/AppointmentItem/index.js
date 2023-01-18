// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentsListItems, isStarredFavorite} = props
  const {id, title, date, isStarred} = appointmentsListItems

  const starImageUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStarBtn = () => {
    isStarredFavorite(id)
  }

  return (
    <li className="list-container">
      <div className="star-container">
        <h1 className="title-n">{title}</h1>
        <button
          data-testid="star"
          type="button"
          className="star-btn"
          onClick={onClickStarBtn}
        >
          <img className="star-icon" alt="star" src={starImageUrl} />
        </button>
      </div>
      <p className="date">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
