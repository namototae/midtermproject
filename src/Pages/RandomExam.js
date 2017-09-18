import React, { Component } from 'react'
import * as FBase from '../services/firebase'
import moment from 'moment'

class RandomExam extends Component {

  state = {
    answers: [], // [0, 3, 2, 0, 1, 3, 1, 2, 0, ...]
    userAnswers: [],
    message: null,
    yourChoice: null,
    chatLog: {}
    
  }

  _randomAnswers (num) {
    let answers = []
    for (let i = 0; i < num; i++) {
      // 0, 1, 2, 3
      let random = Math.floor(Math.random() * (4 - 0) + 0)
      answers.push(random)
    }
    this.setState({ answers: answers })
  }

 


  _select (choice) {
    // console.log(choice)
    let currentUserAnswers = this.state.userAnswers
    currentUserAnswers.push(choice)
    
     
    this.setState({
      userAnswers: currentUserAnswers
    })
    this.setState({yourChoice: choice})
    // console.log(this.state.userAnswers)
    this.setState({chatLog: choice})

  }

  

  componentDidMount() {
    this._randomAnswers(20)
    
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
        this.setState({
          message: 'Correct!'
        })
        corrects = corrects + 1 
      } else {
        // If incorrect
        this.setState({
          message: 'Wrong!'
        })
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
          <h4>Result: {this.state.message}</h4>
 
          <div> คำตอบนะจ๊ะ : {this.state.answers[done]}</div>
          <div>ดิ่งไปแล้ว: {done} ข้อ</div>
          <div>ถูก: {corrects} ข้อ</div>
          <div>ความโชคดี: {luckiness} %</div>
          <div>คำตอบของ {this.state.chatLog} คือ :{this.state.yourChoice} </div>
        </div>
      </div>
    )
  }
}

export default RandomExam