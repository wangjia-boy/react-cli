import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { Button, message } from 'antd'
import { connect } from 'react-redux'
import Comp1 from './comp1'
import Comp2 from './comp2'

const App = (props) => {
  function btnClick() {
    // props.addItem()
    // message.info('primary button!')
    console.log('NODE_ENV: ', ENV)
  }
  return (
    <div className="App">
      <BrowserRouter>
        <ul>
          <li><Link to="/comp1">comp1</Link></li>
          <li><Link to="/comp2">comp2</Link></li>
          <li>
            <Button type="primary" onClick={btnClick}>Button</Button>
          </li>
          {
            props.list.map((v, i) => <li key={i}>{v}</li>)
          }
        </ul>
        <Route path="/comp1" component={Comp1}></Route>
        <Route path="/comp2" component={Comp2}></Route>
      </BrowserRouter>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    list: state.list
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addItem() {
      dispatch({type: 'addItem', value: 'react-redux insert.'})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
