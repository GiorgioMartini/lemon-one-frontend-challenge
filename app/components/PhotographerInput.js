import React from 'react'

export default class PhotographerInput extends React.Component  {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      email: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    const {username, email} = this.state
    const ownedCameras = this.props.cameras.filter(camera => camera.checked )
    this.props.onSubmit(username, email, ownedCameras)
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    })
  }

  render() {
    const { cameras } = this.props
    return (
    <form className="pa3 br2 bg-near-white" onSubmit={this.handleSubmit}>
      <label htmlFor="username">
        {this.props.label}
      </label>
      <div className="br1">
        <label className="pr3 b">Name</label>
        <input type="text" id="username" onChange={this.handleChange} />
        <label className="ph3 b">Email</label>
        <input type="text" id="email" onChange={this.handleChange} />
        <p className="b pt3">Owned cameras:</p>
        { cameras &&
          cameras.map((checkbox, i) => (
              <span key={i}  className="dib pr3">
                <input id={checkbox.id} name={checkbox.name} type="checkbox" onChange={this.props.onChange} checked={checkbox.checked}></input>
                <span className="ml2">{checkbox.name}</span>
              </span>
          ))
        }
        <button
        className="mt4 pa2 db"
          type="submit"
          disabled={!this.state.username}
        >
          Add photographer
        </button>        
      </div>
    </form>
    )
  }
}
