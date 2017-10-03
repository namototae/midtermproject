import React, { Component } from 'react';
import 'bulma/css/bulma.css'
import 'font-awesome/css/font-awesome.min.css'
import './App.css'
import { BrowserRouter, Route } from 'react-router-dom'
// Import page components
import Menu from './Components/Menu'
import Ranking from './Pages/Ranking'
import Challenge from './Pages/Challenge'
import Minigame from './Pages/Minigame'
import Me from './Pages/Me'
// End of page components
import * as FBase from './services/firebase'
import { Helmet } from 'react-helmet'

class App extends Component {

  state = { // Data model of THIS component
    user: null
  }

  componentDidMount () { // Behavior
    FBase.autoLogin((x) => {
      console.log(x)
      this.setState({
        user: x
      })
    })
  }

  async _signIn () {
    const result = await FBase.login()
    console.log(result.user)
    this.setState({
      user: result.user
    })
  }

  async _signOut () {
    const result = await FBase.logout()
    this.setState({
      user: null
    })
  }  

  render() { // Presentational
    return (
      <div>
        <Helmet>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Helmet>
        <BrowserRouter>
          <div className="section" style={{ paddingTop: 20 }}>
            <Menu 
              onSignIn={this._signIn.bind(this)}
              onSignOut={this._signOut.bind(this)}
              user={this.state.user}
            />
            <div style={{ height: 20 }}></div>
            <Route
              render={(props) => <Ranking user={this.state.user} />}
              path="/" 
              exact
              />
            <Route
              render={() => 
                <Challenge user={this.state.user} />
              }
              path="/challenge" 
              />
              <Route
              render={() => 
                <Me/>
              }
              path="/me" 
              />
            <Route
              render={(props) => <Minigame user={this.state.user}{...props} />}
              path="/minigame" />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;