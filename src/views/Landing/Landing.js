import React, {Component} from 'react'
import Heading from './Heading'
import Mission from './Mission'
import Testimonials from './Testimonials'
import About from './About'

class Landing extends Component{

  render(){
    return(
      <div>
        <Heading/>
        <About/>
        <Mission/>
        <Testimonials/>
      </div>
    )
  }
}

export default Landing