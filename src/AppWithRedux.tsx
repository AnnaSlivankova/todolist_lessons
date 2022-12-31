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
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./reducers/store";
import TodolistWithRedux from "./TodolistWithRedux";

export type FilterValueType = 'all' | 'active' | 'completed'

export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}
export type TasksStateType = {
    [todoListId: string]: Array<TasksType>
}


function AppWithRedux() {

    let todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)

    // let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()

    function removeTask(id: string, todoListId: string) {
        dispatch(removeTaskAC(id, todoListId))
    }

    function addNewTask(title: string, todoListId: string) {
        dispatch(addTaskAC(title, todoListId))
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todoListId: string) {
        dispatch(changeTaskStatusAC(taskId, isDone, todoListId))
    }

    function changeTaskTitle(taskId: string, title: string, todoListId: string) {
        dispatch(changeTaskTitleAC(taskId, title, todoListId))
    }

    function changeTodoListFilter(value: FilterValueType, todoListId: string) {
        dispatch(ChangeTodoListFilterAC(todoListId, value))
    }

    function removeTodoList(todoListId: string) {
        dispatch(RemoveTodoListAC(todoListId))
    }

    function changeTodoListTitle(todoListId: string, title: string) {
        dispatch(ChangeTodoListTitleAC(todoListId, title))
    }

    function addTodoList(title: string) {
        dispatch(AddTodoListAC(title))
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
                            // let allTDLTasks = tasks[tl.id]
                            // let tasksForTDL = allTDLTasks
                            //
                            // if (tl.filter === "active") {
                            //     tasksForTDL = allTDLTasks.filter(t => !t.isDone)
                            // }
                            // if (tl.filter === "completed") {
                            //     tasksForTDL = allTDLTasks.filter(t => t.isDone)
                            // }

                            return (
                                <Grid item key={tl.id}>
                                    <Paper style={{padding: '20px'}} elevation={8}>
                                        {/*<TodoList*/}
                                        {/*    key={tl.id}*/}
                                        {/*    todoListId={tl.id}*/}
                                        {/*    title={tl.title}*/}
                                        {/*    tasks={tasksForTDL}*/}
                                        {/*    removeTask={removeTask}*/}
                                        {/*    changeTodoListFilter={changeTodoListFilter}*/}
                                        {/*    addTask={addNewTask}*/}
                                        {/*    changeTaskStatus={changeTaskStatus}*/}
                                        {/*    filter={tl.filter}*/}
                                        {/*    removeTodoList={removeTodoList}*/}
                                        {/*    changeTaskTitle={changeTaskTitle}*/}
                                        {/*    changeTodoListTitle={changeTodoListTitle}*/}
                                        {/*/>*/}
                                        <TodolistWithRedux todolist={tl}/>

                                    </Paper>
                                </Grid>)
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}


export default AppWithRedux;
