import React,{ Component } from 'react'
import todayQuiz from '../Quizes/todayQuiz'
import * as FBase from '../services/firebase'
import moment from 'moment'
import { Link } from 'react-router-dom'
import 'bulma/css/bulma.css'


class Challenge extends React.Component {
    
    state = {
        quizes: [],
        current: 0,
        isCurrentAnswered: false,
        score: 0,
        examLog: {},
        result: null,
        easy: 0,
        hard: 0
        
    }

    componentWillMount () {
        // how many quizes today?
        this.setState({ quizes: todayQuiz })
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

    // enter(event){
    //     if(event.keyCode == 13){
    //         this.setState({
    //             current: this.state.current + 1,
    //             isCurrentAnswered: false,
    //             result: null
    //         })
    //         this.refs.answerForm.reset() 
    //     }
    //     }
    

    render() {
        return (
            <div>
                <section className="hero is-warning">
  <div className="hero-body">
    <div className="container">
      <h1 className="title">
        ข้อสอบประจำวัน
      </h1>
      <h2 className="subtitle">
        ทำแข่งกับเพื่อนนะจ๊ะ
      </h2>
    </div>
  </div>
</section>
                <progress className="progress is-small is-light" value="15" max="100">15%</progress>
                <div className="media-content">
                <div>
                    วันนี้มี: {this.state.quizes.length} ข้อ
                <span className="media-right">
                คะแนน: {this.state.score}/{this.state.quizes.length}
                </span>
                </div>
                <div className= "box">
                <div className ="title is 4">
                    ข้อที่: {this.state.current + 1}
                </div>
                <center className ="title is 4">
                    {this.state.quizes[this.state.current].question}
                </center>
                    <form ref={'answerForm'}>
                        <div className="control">
                        { this.state.quizes[this.state.current].choices.map((choice, i) =>
                                <label className="button is-light is-focused container"  key={i}>
                                    <input type="radio" id="choice" value={i === this.state.quizes[this.state.current].correctChoice} name="answer" onClick={(answer) => {
                                        console.log(">>>>"+answer.target.value)
                                        if (answer.target.value === 'true') {    
                                             
                                            this.setState({
                                                score: this.state.score + 1,
                                                result: true
                                            })
                                        } else {
                                            this.setState({
                                                result: false

                                            })
                                        }
                                        this.setState({ 
                                            isCurrentAnswered: true
                                            
                                        })
                                        
                                    }} />
                                    {choice}
                                    
                                </label>
                                )
                            
                        }
                        
                        </div>
                    </form>
                    </div>
                </div>
                <center className="title is-1">
                    { this.state.result &&
                        '😀ถูกกกกกกกกกกกกกกกก'
                    }
                    { this.state.result === false &&
                        '😵ผิดดดดดดดดดดดดดดดด'
                    }
                    {/* <img className="Header-brandImg" src={require('../src/ดอกไม้.jpg')} /> */}
                </center>
                <div>
                    
                    Explanation:
                    { this.state.isCurrentAnswered &&
                        <div>
                            {this.state.quizes[this.state.current].explanation}
                        </div>
                    }
                </div>
                <div>
                    { this.state.isCurrentAnswered && this.state.current + 1 !== this.state.quizes.length &&  
                        <button className="button"  
                            onClick={() => {
                                this.setState({
                                    current: this.state.current + 1,
                                    isCurrentAnswered: false,
                                    result: null
                                })
                                this.refs.answerForm.reset()

                            }}>Next</button>
                    }
                    { this.state.isCurrentAnswered && this.state.current + 1 === this.state.quizes.length &&
                       <div>
                        <span>
                        +{this.state.easy}🐷
                        <Link to="/"><button className="button" 
                            onClick={() => {
                                this.setState({easy : this.setState.easy+1})
                                FBase.pushExam({
                                 sender: {
                                    displayName: this.props.user && this.props.user.displayName,
                                    photoURL: this.props.user && this.props.user.photoURL
                                    },
                                correct: this.state.score,
                                sentAt: new Date().getTime(),
                                easy: this.state.easy
                                }) 
                               
                            }}>
                            Easy
                            </button>
                            </Link>
                        </span>
                        <span>
                        +1🐍
                        <Link to="/"><button className="button" 
                            onClick={() => {
                                FBase.pushExam({
                                 sender: {
                                    displayName: this.props.user && this.props.user.displayName,
                                    photoURL: this.props.user && this.props.user.photoURL
                                    },
                                correct: this.state.score,
                                sentAt: new Date().getTime()
                                }) 
                            }}>Hard</button>
                            </Link>
                        </span>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default Challenge