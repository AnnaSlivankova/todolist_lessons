import React, {Reducer, useReducer, useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {TasksType, TodoList} from "./ToDoList";
import AddItemForm from "./AddItemform";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import todolistsReducer, {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC
} from "./reducers/todolists-reducer";
import tasksReducer, {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./reducers/tasks-reducer";

export type FilterValueType = 'all' | 'active' | 'completed'
export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}
export type TasksStateType = {
    [todoListId: string]: Array<TasksType>
}


function AppWithReducer() {
    let todoListId_1 = v1()
    let todoListId_2 = v1()

    let [todoLists, dispatchToTodoLists] = useReducer(todolistsReducer, [
        {id: todoListId_1, title: "What to learn", filter: "all"},
        {id: todoListId_2, title: "What to buy", filter: "all"},
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
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

    function removeTask(id: string, todoListId: string) {
        dispatchToTasks(removeTaskAC(id, todoListId))
    }

    function addNewTask(title: string, todoListId: string) {
        dispatchToTasks(addTaskAC(title, todoListId))
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todoListId: string) {
        dispatchToTasks(changeTaskStatusAC(taskId, isDone, todoListId))
    }

    function changeTaskTitle(taskId: string, title: string, todoListId: string) {
        dispatchToTasks(changeTaskTitleAC(taskId, title, todoListId))
    }

    function changeTodoListFilter(value: FilterValueType, todoListId: string) {
        dispatchToTodoLists(ChangeTodoListFilterAC(todoListId, value))
    }

    function removeTodoList(todoListId: string) {
        dispatchToTodoLists(RemoveTodoListAC(todoListId))
        dispatchToTasks(RemoveTodoListAC(todoListId))
    }

    function changeTodoListTitle(todoListId: string, title: string) {
        dispatchToTodoLists(ChangeTodoListTitleAC(todoListId, title))
    }

    function addTodoList(title: string) {
        let action = (AddTodoListAC(title))
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit" variant={"outlined"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodoList} placeholder={"add TodoList"}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoLists.map(tl => {
                            let allTDLTasks = tasks[tl.id]
                            let tasksForTDL = allTDLTasks

                            if (tl.filter === "active") {
                                tasksForTDL = allTDLTasks.filter(t => !t.isDone)
                            }
                            if (tl.filter === "completed") {
                                tasksForTDL = allTDLTasks.filter(t => t.isDone)
                            }

                            return (
                                <Grid item key={tl.id}>
                                    <Paper style={{padding: '20px'}} elevation={8}>
                                        <TodoList
                                            key={tl.id}
                                            todoListId={tl.id}
                                            title={tl.title}
                                            tasks={tasksForTDL}
                                            removeTask={removeTask}
                                            changeTodoListFilter={changeTodoListFilter}
                                            addTask={addNewTask}
                                            changeTaskStatus={changeTaskStatus}
                                            filter={tl.filter}
                                            removeTodoList={removeTodoList}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodoListTitle={changeTodoListTitle}
                                        />
                                    </Paper>
                                </Grid>)
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}


export default AppWithReducer;
