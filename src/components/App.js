import React from 'react'
import Footer from './Footer'
import AddTodo from './../containers/AddTodo'
import VisibleTodoList from './../containers/VisibleTodoList'

// Params is available from the properties because router inject this property: params
const App = ({ params }) => (
  <div>
    <AddTodo />
    <VisibleTodoList filter={params.filter || 'all'}/>
    <Footer />
  </div>
)

export default App
