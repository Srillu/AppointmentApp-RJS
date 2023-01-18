// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    titleInput: '',
    dateInput: '',
    btnClicked: false,
  }

  onClickStared = () => {
    this.setState(prevState => ({btnClicked: !prevState.btnClicked}))
  }

  isStarredFavorite = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachItem => {
        if (id === eachItem.id) {
          return {...eachItem, isStarred: !eachItem.isStarred}
        }
        return eachItem
      }),
    }))
  }

  titleInputValue = event => {
    this.setState({titleInput: event.target.value})
  }

  dateInputValue = event => {
    this.setState({dateInput: event.target.value})
  }

  onAddAppointmentBtn = () => {
    const {titleInput, dateInput} = this.state

    const newAppointment = {
      id: uuidv4(),
      title: titleInput,
      date: format(new Date(dateInput), 'dd MMMM yyyy, EEEE'),
      isStarred: false,
    }

    // if (titleInput === '' && dateInput === '') {
    //   newAppointment = {
    //     id: uuidv4(),
    //     titleInput,
    //     dateInput,
    //     isStarred: false,
    //   }
    // }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  onStarredAppointments = () => {
    const {appointmentsList, btnClicked} = this.state

    if (btnClicked) {
      return appointmentsList.filter(each => each.isStarred === true)
    }
    return appointmentsList
  }

  render() {
    const {titleInput, dateInput, btnClicked} = this.state
    const filteredAppointmentsList = this.onStarredAppointments()
    return (
      <div className="bg-container">
        <div className="container">
          <div className="appointment-container">
            <div>
              <h1 className="title-heading">Add Appointments</h1>

              <label htmlFor="text" className="title">
                TITLE
              </label>
              <br />
              <input
                className="input-box"
                onChange={this.titleInputValue}
                value={titleInput}
                id="text"
                type="text"
                placeholder="Title"
              />
              <br />

              <label htmlFor="date" className="title">
                DATE
              </label>
              <br />
              <input
                className="input-box"
                onChange={this.dateInputValue}
                value={dateInput}
                id="date"
                type="date"
              />
              <br />
              <button
                className="add-btn"
                type="button"
                onClick={this.onAddAppointmentBtn}
              >
                Add
              </button>
            </div>
            <div>
              <img
                className="image"
                alt="appointments"
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              />
            </div>
          </div>
          <hr className="horizontal-line" />
          <div className="starredBtn-Container">
            <h1 className="appointment-name">Appointments</h1>
            <button
              onClick={this.onClickStared}
              type="button"
              className={btnClicked ? 'starred-btn-clicked' : 'starred-btn'}
            >
              Starred
            </button>
          </div>
          <ul className="ul-container">
            {filteredAppointmentsList.map(eachAppointmentItem => (
              <AppointmentItem
                isStarredFavorite={this.isStarredFavorite}
                key={eachAppointmentItem.id}
                appointmentsListItems={eachAppointmentItem}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
