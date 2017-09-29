import React from 'react'
import * as FBase from '../services/firebase'
import moment from 'moment'

class Ranking extends React.Component {

  state = {
    examLog: {},

  // var sorted = examLog.slice().sort(function(a,b){return b-a}),
  // var ranks = examLog.slice().map(function(v){ return sorted.indexOf(v)+1 })
  }

  componentDidMount() {
    FBase.getExamLog()
    .on('value', (snapshot) => {
      console.log(snapshot.val())
      this.setState({
        examLog: snapshot.val()
      })
    }
  )

  }

  render () {
    // Build display logic
    return (
      <div className="rankingContainer">
        <h1>Ranking</h1>
        <div className="ranking">
          { this.state.examLog && Object.keys(this.state.examLog).sort("correct").reverse().map((key, i) =>
              <div key={i}>
                { this.state.examLog[key].sender &&
                  <img
                    src={this.state.examLog[key].sender.photoURL}
                    style={{ 
                      width: 32, 
                      height: 32, 
                      borderRadius: '50%', 
                      marginRight: 5,
                      verticalAlign: 'sub'
                    }} 
                  />
                }
                { !this.state.examLog[key].sender &&
                  <span className="is-size-4">🤓</span>
                }
                <span> 👍ได้ {this.state.examLog[key].correct}🙏🏻+5 แต้มบุญ </span>


              </div>
            )
          }
        </div>
        </div>
    )
  }
}

export default Ranking