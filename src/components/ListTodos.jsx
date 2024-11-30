import { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import {db} from '../firebase.js'
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc} from 'firebase/firestore';

const ListTodos = ({ user }) => {
    const [loading, setLoading] = useState(true)
    const [newTodo, setNewTodo] = useState('')
    const [newDescription, setNewDescription] = useState('')
    const [todos, setTodos] = useState([])

    const fetchTodos = async () => {
        try {
            const collectionRef = collection(db, 'todos')
            const querySnapshot = await getDocs(collectionRef)
            const todos = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            setTodos(todos)
            setLoading(false)
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        fetchTodos()
    }, [])

    const handleToggleTodo = async (id, completed) => {
        const todoRef = doc(db, 'todos', id)
        await updateDoc(todoRef, {
            completed: !completed
        })

        setTodos(todos.map(todo => (
        todo.id === id ? {...todo, completed: !completed } : todo
        )))
    }

    const handleDeleteTodo = async (id) => {
        const todoRef = doc(db, 'todos', id)
        await deleteDoc(todoRef)
        setTodos(todos.filter(todo => todo.id !== id))
    }

    const handleNewTodo = async () => {
        if (!newTodo.trim()) return
        const collectionRef = collection(db, 'todos')
        const docRef = await addDoc(collectionRef, {
            title: newTodo,
            description: newDescription,
            completed: false,
        })
        setTodos([...todos, {id: docRef.id, title: newTodo, description: newDescription, completed: false}])
        setNewTodo('')
        setNewDescription('')
    }

    if (loading) return <>Loading ....</>

    return (
        <>
            <div className='inner'>
            <h3>Welcome, {user}</h3>
            <input type="text" value={newTodo} placeholder='Add New Task' onChange={(e) => setNewTodo(e.target.value)} />
            <input type="text" value={newDescription} placeholder='Add a short description...' onChange={(e) => setNewDescription(e.target.value)} />
            <button onClick={handleNewTodo}><IoIosAddCircle /> Add</button>
            <ul>
                {todos.map(todo => (
                <li key={todo.id}>
                    <div className='taskItem'>
                        <strong>{todo.completed ? <s>{todo.title}</s> : todo.title}</strong>
                        <p>{todo.description}</p>
                        <span 
                        style={{ 
                            color: todo.completed ? '#28a745' : '#fd7e14', 
                            textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)'  
                        }}>
                        Status: {todo.completed ? 'Completed' : 'Pending'}</span><br />
                        <button className='toggle' onClick={() => handleToggleTodo(todo.id, todo.completed)}>{todo.completed ? "Mark as Pending" : "Mark as Completed"}</button>
                    </div>
                    <button onClick={() => handleDeleteTodo(todo.id)}><MdDelete /> delete</button>
                </li>
                ))}
            </ul>
            </div>
        </>
    )
}

export default ListTodos
