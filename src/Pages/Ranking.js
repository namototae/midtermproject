import React from 'react'
import * as FBase from '../services/firebase'
import moment from 'moment'
import 'bulma/css/bulma.css'

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
       <div>
        <section className="hero is-warning">
  <div className="hero-body">
    <div className="container is-size-1">
      <h1 className="title">
        ความเคลื่อนไหว
      </h1>
      <h2 className="subtitle">
        ติดตามความเคลื่อนไหวของเพื่อนๆได้ที่นี่
      </h2>
    </div>
  </div>
</section>
</div>
        <div className="ranking">
          { this.state.examLog && Object.keys(this.state.examLog).sort("correct").reverse().map((key, i) =>
              <div key={i}>
                <div className="card">

  <div className="card-content">
    <div className="media">
      <div className="media-left">
        <figure className="image is-48x48">
        { this.state.examLog[key].sender &&
                  <img
                    src={this.state.examLog[key].sender.photoURL}
                    style={{ 
                      width: 50, 
                      height: 50, 
                      borderRadius: '50%', 
                      marginRight: 5,
                      verticalAlign: 'sub'
                    }} 
                  />
                }
                { !this.state.examLog[key].sender &&
                  <span className="is-size-4">🤓</span>
                }
         
        </figure>
      </div>
      <div className="media-content">
        <p className="title is-4">{this.state.examLog[key].sender && this.state.examLog[key].sender.displayName}
        { !this.state.examLog[key].sender &&
                  <span className="is-size-4">Mr.Secret</span>
                }
        </p>
        <p className="subtitle is-6">The nerd pony</p>
      </div>
      <div className="media-content">
        <p className="title is-4">🐎122 ข้อ</p>
        <p className="subtitle is-6">Level 5</p>
      </div>
      <div className="media-content">
        <p className="title is-4"> ☘️1500</p>
        <p className="subtitle is-6"> แต้มบุญ</p>
      </div>
      <time datetime="2016-1-1 media right">{this.state.examLog[key].sentAt} </time>
    </div>

    <div className="title is-4 media-right">
    🔥ทำข้อสอบError 7 ข้อ  ได้ {this.state.examLog[key].correct} ข้อ
      </div>
      <div className="content">
      <span className="box">
        <a>✌🏻</a><a> 🙏🏻</a> <a>😬 </a>
        <a className="media-right">💬 commmemt</a>
        </span> 
    </div>
  </div>
</div>
                


              </div>
            )
          }
        </div>
        </div>
    )
  }
}

export default Ranking