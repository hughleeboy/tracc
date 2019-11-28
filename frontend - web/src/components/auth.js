import React, { Component } from 'react'
import { Carousel, Col, Row } from 'antd'
import Login from './login'
import Register from './register'
import { connect } from 'react-redux' 

class Auth extends Component {
  constructor(props) {
    super(props)
    this.next = this.next.bind(this)
    this.carousel = React.createRef()
  }
  
  next() {
    this.carousel.next()
  }

  login = (user) => {
    console.log(user)
  }

  render() {
    const props = {
      dots: false,
      infinite: true,
      dotPosition: 'bottom',
    }
    return (
      <Row>
        <Col span={12}>
            <Carousel className='carousel-auth' ref={node => (this.carousel = node)} {...props}>
                <div className='carousel-forms'>
                    <Login next={()=>this.next()} loggedIn={(user)=>this.props.login(user)} />
                </div>
                <div className='carousel-forms'>
                    <Register next={()=>this.next()} loggedIn={(user)=>this.props.login(user)} />
                </div>
            </Carousel>
        </Col>
        <Col span={12}>
            Welcome to Tracc, a website designed to help keep track of you job applications
        </Col>
      </Row>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (user) => dispatch({type:'LOGIN',user})
  }
}

export default connect(null, mapDispatchToProps)(Auth)