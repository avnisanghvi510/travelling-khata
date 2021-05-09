import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
class Logout extends Component {
 componentDidMount () {
  this.props.logout();
 }

 render() {
  return (
   <div>
       <br/><br/><br/>
    Logout Successfull......!
   </div>
  )
 }
}

const mapDispatchToProps = dispatch => {
 return {
     logout: () => dispatch(actions.logout()) 
 }
}

export default connect(null, mapDispatchToProps)(Logout);