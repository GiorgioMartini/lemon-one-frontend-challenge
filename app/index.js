import React from 'react'
import ReactDOM from 'react-dom'
import Tachyons from 'tachyons/css/tachyons.min.css'
import './index.css'
import Header from './components/Header'
import PhotographerInput from './components/PhotographerInput'
import { List } from './components/List'
import { fectchPhotographers, removePhotographer, addPhotographer } from './utils/api'

const queryAllPhotographers = `
  query {
    allPhotographers {
      id
      name
      cameras
      email
    }
  }  
`

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      photographers: [],
      cameras: [
        { checked: false, id: "1", name: "Canon EOS Rebel SL2", resolution: "24.2" },
        { checked: false, id: "2", name: "Fujifilm X100F", resolution: "24.4" },
        { checked: false, id: "3", name: "Google Pixel 3", resolution: "8" },
        { checked: false, id: "4", name: "Leica CL", resolution: "24.2" },
        { checked: false, id: "5", name: "Leica M-A (Typ 27)", resolution: "" },
        { checked: false, id: "6", name: "Olympus PEN-F", resolution: "20.3" },
        { checked: false, id: "7", name: "Panasonic Lumix DC-G9", resolution: "20.3" },
        { checked: false, id: "8", name: "Ricoh GR II", resolution: "16.2" },
        { checked: false, id: "9", name: "Sony Cyber-Shot DSC-RX1R II", resolution: "42.4" }
      ]
    }
    this.removePhotographer = this.removePhotographer.bind(this)
    this.loadPhotographers = this.loadPhotographers.bind(this)
    this.addNewPhotographer = this.addNewPhotographer.bind(this)
    this.handleCheckboxesChange = this.handleCheckboxesChange.bind(this)
  }

  removePhotographer(id) {
    removePhotographer(id)
    this.loadPhotographers()
  }

  loadPhotographers() {
    fectchPhotographers(queryAllPhotographers)
      .then((photographers) => this.setState({photographers}))
  }

  addNewPhotographer(name, email, cameras) {
    const id = this.state.photographers.length + 1
    addPhotographer(name, id, email, cameras)
    this.loadPhotographers()
  }

  componentDidMount() {
    this.loadPhotographers()
  }

  handleCheckboxesChange(event) {
    const id = event.target.id
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    const name = event.target.name

    this.setState((prevState) => {
      const newState = prevState.cameras.map(x => x.id === id ? {checked: value, id, name} : x)
      return ({
        cameras: newState
      })
    })
  }    

  render() {
    const { photographers } = this.state
    return (
      <div className="mw8 center">
        <Header />
        <PhotographerInput cameras={this.state.cameras} onChange={this.handleCheckboxesChange} onSubmit={this.addNewPhotographer}/>
        { photographers &&
        <List removePhotographer={this.removePhotographer} cameras={this.state.cameras} photographers={photographers}/>        
        }
      </div>
      )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)