import React,{ Component } from 'react'
import todayQuiz from '../Quizes/todayQuiz'
import * as FBase from '../services/firebase'
import moment from 'moment'
import { Link } from 'react-router-dom'


class Challenge extends React.Component {

    state = {
        quizes: [],
        current: 0,
        isCurrentAnswered: false,
        score: 0,
        examLog: {},
        result: null
        
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

    render() {
        return (
            <div>
                <h1>Challenge</h1>
                <div>
                    Today mee: {this.state.quizes.length} kor
                </div>
                <div>Score: {this.state.score}/{this.state.quizes.length}</div>
                <div>
                    ข้อที่: {this.state.current + 1}
                </div>
                <div>
                    Question: 
                    {this.state.quizes[this.state.current].question}
                </div>
                <div>
                    Choice
                    <form ref={'answerForm'}>
                        <div className="control">
                        
                        
                        
                        
                        { this.state.quizes[this.state.current].choices.map((choice, i) =>
                                
                
                                <label className="radio"  key={i}>
                                    <input type="radio" id="choice" value={i === this.state.quizes[this.state.current].correctChoice} name="answer" onClick={(answer) => {
                                        var test =  this.state.quizes[this.state.current].choices
                                        for(var l=0;l<test.length;l++){
                                            console.log(test[l]);
                                        }
                                        if(this.state.isCurrentAnswered===true){
                                            document.getElementById("choice").disabled=true;
                                        }
                                        
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
                <div>
                    { this.state.result &&
                        'ถูกกกกกกกกกกกกกกกก'
                    }
                    { this.state.result === false &&
                        'ผิดดดดดดดดดดดดดด'
                    }
                </div>
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
                            }}>🐷Easy</button>
                            </Link>
                        </span>
                        <span>
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
                            }}>🐍Hard</button>
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