import React, { Component } from 'react'
import * as FBase from '../services/firebase'
import moment from 'moment'

const numToCharacter = ['ก', 'ข', 'ค', 'ง']


class RandomExam extends Component {

  state = {
    answers: [], // [0, 3, 2, 0, 1, 3, 1, 2, 0, ...]
    userAnswers: [],
    message: null,
    answerLog: {},
    currentAnswer: 0,
    correct : 0,
    exam :0,
    Luckiness :0,
    character: null,
    result :null,
    status : null,
    baka: null,
  }

  
  _select (choice) {
    const random = Math.floor(Math.random() * 4)
    console.log(random, choice)

    if(choice === random){
      this.setState({
        correct: this.state.correct+1,
        exam: this.state.exam+1,
        currentAnswer: random,
        character: numToCharacter[random],
        Luckiness: (this.state.correct+1)/(this.state.exam+1)*100.0 || 0,
        result: "🍀",
        
        
      })
      
      // FBase.pushAnswer({
      //   sender: {
      //     displayName: this.props.user && this.props.user.displayName,
      //     photoURL: this.props.user && this.props.user.photoURL
      //   },
      //   answer: this.state.Luckiness,
      //   sentAt: new Date().getTime()
      // })
    }
    else{
      
      // FBase.pushAnswer({
      //   sender: {
      //     displayName: this.props.user && this.props.user.displayName,
      //     photoURL: this.props.user && this.props.user.photoURL
      //   },
      //   answer: this.state.Luckiness,
      //   sentAt: new Date().getTime()
      // })

      this.setState({ 
        currentAnswer: random,
        exam: this.state.exam+1,
        character: numToCharacter[random],
        Luckiness: (this.state.correct)/(this.state.exam+1)*100.0 || 0,
        result: " 🐦",
      
        
      })
    }
 
   
    this.check()
    
    
  }
 
  

  
  check(){
    if(this.state.exam===5){
      alert('หยุด!!!!!!!!!!!!!!!!!! 5 ข้อพอนะจ๊ะ');
     this.setState({
       Luckiness:0,
       exam:0,
       correct:0,
      character:"",
      result:"",
      
    })
      
      FBase.pushAnswer({
        sender: {
          displayName: this.props.user && this.props.user.displayName,
          photoURL: this.props.user && this.props.user.photoURL
        },
        luckiness: this.state.Luckiness,
        sentAt: new Date().getTime()
      })
    }
   
  }

 

  componentDidMount() {
    FBase.getAnswerLog()
    .on('value', (snapshot) => {
      console.log(snapshot.val())
      this.setState({
        answerLog: snapshot.val()
        
      })
    }
  )
    
  }

  render() {
    return (
      <div className="content">
        <h1 className="title">
          Random Exam
        </h1>
        <div>
          <h2>ลองดิ่งข้อสอบดูซิมี5ข้อ</h2>
          <p> ตอบไป  {this.state.exam} ข้อแล้ว</p>
          
          <button onClick={() => this._select(0)} className="button">ก.</button>
          <button onClick={() => this._select(1)} className="button">ข.</button>
          <button onClick={() => this._select(2)} className="button">ค.</button>
          <button onClick={() => this._select(3)} className="button">ง.</button>
          
          <h2>เฉลย : {this.state.character} </h2>
          <p> เดาถูก : {this.state.correct} </p>
          <h2>ความโชคดีของคุณ : {this.state.Luckiness} %</h2>
          <h4> {this.state.result} </h4>
        </div>
        <br/>
        <div>
        
 
        
          
        </div>
       
         
              
        <div className="answerFeed">
      





          { this.state.answerLog && Object.keys(this.state.answerLog).reverse().map((key, i) =>
              <div key={i}>
                { this.state.answerLog[key].sender &&
                  <img
                    src={this.state.answerLog[key].sender.photoURL}
                    style={{ 
                      width: 32, 
                      height: 32, 
                      borderRadius: '50%', 
                      marginRight: 5,
                      verticalAlign: 'sub'
                    }} 
                  />
                }
                { !this.state.answerLog[key].sender &&
                  <span className="is-size-4">👮</span>
                }
                <span className="is-size-4"> คุณมีดวงในการเดาข้อสอบ{this.state.answerLog[key].luckiness}% {this.state.status}</span>
                <span>&nbsp;&nbsp;&nbsp;</span>
                <span className="is-size-7 has-text-grey-lighter">
                  <i className="fa fa-send is-inline"></i>
                  &nbsp;
                  {moment(this.state.answerLog[key].sentAt).fromNow()}
                </span>
              </div>
            )
          }
    
                
                
            
        </div>
      </div>
    )
  }
}

export default RandomExam