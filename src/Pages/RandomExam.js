import React, { Component } from 'react'
import * as FBase from '../services/firebase'
import moment from 'moment'

class RandomExam extends Component {

  state = {
    answers: [], // [0, 3, 2, 0, 1, 3, 1, 2, 0, ...]
    userAnswers: [],
    message: null,
    answerLog: {},
    currentAnswer: 0
    
  }

  // _randomAnswers (num) {
  //   let answers = this.state.answers
  //   for (let i = 0; i < num; i++) {
  //     // 0, 1, 2, 3
  //     let random = Math.floor(Math.random() * (4 - 0) + 0)
  //     answers.push(random)
  //   }
  //   this.setState({ answers: answers })
  // }

 


  _select (choice) {
    // console.log(choice)
    let random = Math.floor(Math.random() * 4)
    this.setState({ currentAnswer: random })

    if(choice === this.state.currentAnswer){
      FBase.pushAnswer({
        sender: {
          displayName: this.props.user && this.props.user.displayName,
          photoURL: this.props.user && this.props.user.photoURL
        },
        answer: '🍀🍀🍀🍀🍀🍀ว้าวเดาถูกนะจ๊ะ ให้+20แต้มบุญ👌🍀🍀🍀🍀🍀🍀',
        sentAt: new Date().getTime()
      })
    }
    else{
      FBase.pushAnswer({
        sender: {
          displayName: this.props.user && this.props.user.displayName,
          photoURL: this.props.user && this.props.user.photoURL
        },
        answer: '🐦🐦🐦🐦🐦🐦นกนะจ๊ะ ให้+5แต้มบุญ👌🐦🐦🐦🐦🐦🐦',
        sentAt: new Date().getTime()
      })

    }

     



    // let currentUserAnswers = this.state.userAnswers
    // currentUserAnswers.push(choice)
  
 
    // this.setState({
    //   userAnswers: currentUserAnswers
    // })
    // this.setState({yourChoice: choice})
    // console.log(this.state.userAnswers)
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

    // Calculate correct choices
    let done = this.state.userAnswers.length
    let corrects = 0
   

    // เทียบคำตอบที User ตอบ กับเฉลยที่ gen ไว้ตอนแรก
    this.state.userAnswers.forEach((x, index) => {
      console.log(`เทียบคำตอบ ข้อที่: ${index} user ตอบ ${x} / เฉลย: ${this.state.answers[index]}`)

      if (x === this.state.answers[index]) {
        // If correct
        // this.setState({
        //   message: 'Correct!'
        // })
        
        corrects = corrects + 1 
      } else {
        // If incorrect
        // this.setState({
        //   message: 'Wrong!'
        // })
      }
    })
    // คำนวน % ความโชคดี
    let luckiness = (corrects/this.state.answers.length) * 100
    

    return (
      <div className="content">
        <h1 className="title">
          Random Exam
        </h1>
        <div>
          <h2>ข้อที่: {this.state.userAnswers.length + 1}</h2>
          <button onClick={() => this._select(0)} className="button">ก.</button>
          <button onClick={() => this._select(1)} className="button">ข.</button>
          <button onClick={() => this._select(2)} className="button">ค.</button>
          <button onClick={() => this._select(3)} className="button">ง.</button>
        </div>
        <br/>
        <div>
        
 
          {/* <div> คำตอบนะจ๊ะ : {this.state.answers[done]}</div>
          <div>ดิ่งไปแล้ว: {done} ข้อ</div>
          <div>ถูก: {corrects} ข้อ</div>
          <div>ความโชคดี: {luckiness} %</div>
          <div> คุณตอบ :{this.state.yourChoice} </div> */}
          
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
                <span className="is-size-4"> {this.state.answerLog[key].answer}</span>
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