import React, {Component} from 'react'
import Heading from './Heading'
import Mission from './Mission'
import Testimonials from './Testimonials'

class Landing extends Component{

  render(){
    return(
      <div>
        <Heading/>
        <Mission/>
        <Testimonials/>
      </div>
    )
  }
}

export default Landing