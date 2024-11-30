import { useState } from 'react'
import ListTodos from './components/ListTodos'


function App() {
  const [user, setUser] = useState('Christian')
  
  return (
    <>
      <h1>Todo React App</h1>
      {user ? (
        <ListTodos user={user}/>
      ) : (
        <p>you must login to view the todo lists</p>
      )}
    </>
  )
}

export default App
