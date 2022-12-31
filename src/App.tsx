import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {TasksType, TodoList} from "./ToDoList";
import AddItemForm from "./AddItemform";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type FilterValueType = 'all' | 'active' | 'completed'

export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}
export type TasksStateType = {
    [todoListId: string]: Array<TasksType>
}
const todoListId_1 = v1()
const todoListId_2 = v1()

function App() {
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId_1, title: "What to learn", filter: "all"},
        {id: todoListId_2, title: "What to buy", filter: "all"},
    ])
    
    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListId_1]: [
            {id: v1(), title: "HTML & CSS", isDone: true},
            {id: v1(), title: "JS & ES6", isDone: true},
            {id: v1(), title: "REACT & TS", isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: "COLA", isDone: true},
            {id: v1(), title: "MILK", isDone: true},
            {id: v1(), title: "WATER", isDone: false},
        ]
    })

    // let [tasks, setTasks] = useState([
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "React", isDone: false},
    //     {id: v1(), title: "Rest API", isDone: true},
    //     {id: v1(), title: "GraphQL", isDone: false},
    // ])

    function removeTask(id: string, todoListId: string) {
        const tasksForUpdate: Array<TasksType> = tasks[todoListId]
        const resultOfUpdate: Array<TasksType> = tasksForUpdate.filter(t => t.id !== id)
        const copyTasks = {...tasks}
        copyTasks[todoListId] = resultOfUpdate
        setTasks({...copyTasks})

        //короткая версия кода выше
        // setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== id)})

        //было раньше
        // let filteredTasks = tasks.filter(t => t.id !== id)
        // setTasks(filteredTasks)
    }

    function addNewTask(title: string, todoListId: string) {
        const tasksForUpdate: Array<TasksType> = tasks[todoListId]
        const newTask = {id: v1(), title: title, isDone: false}
        const resultOfUpdate: Array<TasksType> = [...tasksForUpdate, newTask]
        const copyTasks = {...tasks}
        copyTasks[todoListId] = resultOfUpdate
        setTasks(copyTasks)

        //короткая версия кода выше
        // setTasks({...tasks, [todoListId]: [...tasks[todoListId], newTask]})

        //было раньше
        // const newTask = {id: v1(), title: title, isDone: false}
        // setTasks([...tasks, newTask])
    }

    // function addNewTask() {
    //     const newTask = {id: v1(), title: "new task", isDone: false}
    //     let newTasksArr = [...tasks, newTask]
    //     setTasks(newTasksArr)
    //     console.log(newTasksArr)
    // }

    const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        const tasksForUpdate: Array<TasksType> = tasks[todoListId]
        const resultOfUpdate: Array<TasksType> = tasksForUpdate.map(t => t.id === taskId ? {...t, isDone: isDone} : t)
        const copyTasks = {...tasks}

        copyTasks[todoListId] = resultOfUpdate
        setTasks(copyTasks)

        //короткая версия кода выше
        // setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {
        // ...t, isDone} : t) })

        //было раньше
        // setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: isDone} : t))
    }
    const changeTaskTitle = (taskId: string, title: string, todoListId: string) => {
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {
                ...t,
                title
            } : t)
        })
    }

    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
    }
    const addTodoList = (title: string) => {
        const newTodoListId: string = v1()
        const newTodoList: TodoListType = {
            id: newTodoListId,
            title: title,
            filter: 'all'
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListId]: []})
    }
    function changeTodoListFilter(value: FilterValueType, todoListId: string) {

        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: value} : tl))
    }
    function changeTodoListTitle(title: string, todoListId: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListId
            ? {...tl, title: title} : tl))
    }


    const getFilteredTasks = (tasks: Array<TasksType>, filterValue: FilterValueType) => {
        let filteredTasks = tasks
        if (filterValue === "active") {
            filteredTasks = tasks.filter(t => !t.isDone)
        }
        if (filterValue === "completed") {
            filteredTasks = tasks.filter(t => t.isDone)
        }
        return filteredTasks
    }
    // let tasksForTodolist = tasks
    // if (filter === 'active') {
    //     tasksForTodolist = tasks.filter(t => !t.isDone)
    // }
    // if (filter === 'completed') {
    //     tasksForTodolist = tasks.filter(t => t.isDone)
    // }

    let [filter, setFilter] = useState<FilterValueType>('all')


    const todolistsComponents = todoLists.map(tl => {
        const filteredTasks = getFilteredTasks(tasks[tl.id], tl.filter)
        return (
            <Grid item key={tl.id}>
            <Paper style={{padding: '20px'}} elevation={8}>
                <TodoList title={tl.title}
                          tasks={filteredTasks}
                          filter={tl.filter}
                          todoListId={tl.id}
                          changeTodoListFilter={changeTodoListFilter}
                          removeTodoList={removeTodoList}
                          removeTask={removeTask}
                          addTask={addNewTask}
                          changeTaskStatus={changeTaskStatus}
                          changeTaskTitle={changeTaskTitle}
                          changeTodoListTitle={changeTodoListTitle}


                />
            </Paper>
            </Grid>)
    })


    return (
        <div className="App">
            <AppBar position="static">

                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button color="inherit" variant={"outlined"}>Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed style={{paddingTop: "20px"}}>
                <Grid container>
                    <AddItemForm addItem={addTodoList} placeholder={"add TodoList"}/>
                </Grid>
                <Grid style={{paddingTop: "10px"}} container spacing={4}>
                    {todolistsComponents}
                </Grid>
                {/*<TodoList title='What to learn'*/}
                {/*          tasks={tasksForTodolist}*/}
                {/*          changeFilter={changeFilter}*/}
                {/*          removeTask={removeTask}*/}
                {/*          addTask={addNewTask}*/}
                {/*          changeTaskStatus={changeTaskStatus}*/}
                {/*          filter={filter}*/}
                {/*/>*/}
            </Container>
        </div>
    );
}


export default App;
