import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class Me extends React.Component {


  render() {
    return (
      <div className="content">
         
         <nav className="level is-mobile">
  <div className="level-item has-text-centered">
    <div>
      <p className="heading">Followers</p>
      <p className="title">3,456</p>
    </div>
  </div>
  <div className="level-item has-text-centered">
    <div>
      <p className="heading">Following</p>
      <p className="title">123</p>
    </div>
  </div>
  <div className="level-item has-text-centered">
    <div>
      <p className="heading">จำนวนข้อสอบ</p>
      <p className="title">100</p>
    </div>
  </div>
  <div className="level-item has-text-centered">
    <div>
      <p className="heading">แต้มบุญ</p>
      <p className="title">789</p>
    </div>
  </div>
</nav>

<input className="input" type="text" placeholder="+ Add Goal"/>

              </div>
        
    )
  }
}

export default Me