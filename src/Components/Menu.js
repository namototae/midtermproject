import React from 'react'
import { Link } from 'react-router-dom'

class Menu extends React.Component {

  componentDidMount () {
  }

  render () {
    return (
      <div>
      <nav className="level">
     
      <div className="level-left">
        <div className="level-item">
        <p className="title is-1">
        QUIZUUM🙊
      </p>
        </div>
        <div className="level-item">
          <div className="field has-addons">
            <p className="control">
              <input className="input" type="text" placeholder="วันนี้ซุ่มทำข้อสอบอะไรดีนะ"/>
            </p>
            <p className="control">
              <button className="button">
                Explore
              </button>
            </p>
          </div>
        </div>
      </div>
    
      
      <div className="level-right">
     
            <p className="level-item"><Link to="/">👧 Ranking</Link></p>
            <p className="level-item"><Link to="/me">🍑 Me</Link></p> 
           <p className="level-item"><Link to="/challenge">🐙 Challenge</Link></p>
           <p className="level-item"><Link to="/minigame">🌈 Minigame</Link></p>
           <p className="level-item">
              { !this.props.user &&
                <button className="button" onClick={() => this.props.onSignIn()}>Sign-in</button>
              }
              { this.props.user &&
                <span>
                  <img
                    src={this.props.user.photoURL}
                    style={{ 
                      width: 32, 
                      height: 32, 
                      borderRadius: '50%', 
                      marginRight: 5 
                    }} 
                  />
                </span>
              }
              <span>
                {this.props.user && this.props.user.displayName}&nbsp;
              </span>
              { this.props.user &&
                <span>
                  (
                  <a onClick={this.props.onSignOut.bind(this)} className="is-size-8">
                    Log out
                  </a>
                  )
                </span>
              }
            </p>
      </div>
    </nav>
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      </div>  
    )
  }
}

export default Menu