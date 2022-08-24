import React from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";

function App() {
    return (
        <div className="App">
            <TodoList title="What to learn" tasks={task_1}/>
            <TodoList title="What to buy" tasks={task_2}/>
        </div>
    );
}

let task_1: Array<TaskType> = [
    {id: 1, title: "JS", isDone: true},
    {id: 2, title: "React", isDone: true},
    {id: 3, title: "Redux", isDone: false},
]

let task_2: Array<TaskType> = [
    {id: 1, title: "Book", isDone: true},
    {id: 2, title: "Apple", isDone: false},
    {id: 3, title: "Orange", isDone: true},
]


export default App;
