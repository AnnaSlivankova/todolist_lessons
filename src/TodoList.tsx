import React, {useState, ChangeEvent, KeyboardEvent, MouseEvent} from 'react';
import {FilterValueType} from "./App";
import AddItemForm from "./AddItemform";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton, List, ListItem} from "@material-ui/core";
import {DeleteForeverOutlined, HighlightOff} from "@material-ui/icons";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type ToDoListType = {
    todoListId: string
    title: string
    tasks: Array<TasksType>
    removeTodoList: (todoListId: string) => void
    removeTask: (taskId: string, todoListId: string) => void
    changeTodoListFilter: (value: FilterValueType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
    filter: FilterValueType
}


export function TodoList(props: ToDoListType) {
    const tasksJSXItemsList = props.tasks.length
        ? <List>
            {props.tasks.map((t) => {
                    const onClickHandler = () => {
                        props.removeTask(t.id, props.todoListId)
                    }

                    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListId)
                    const changeTaskTitle = (nextTitle: string) => props.changeTaskTitle(t.id, nextTitle, props.todoListId)

                    return (
                        <ListItem key={t.id} className={t.isDone ? "isDone" : ""} style={{padding: '0'}}>
                            {/*<input*/}
                            {/*    type="checkbox"*/}
                            {/*    checked={t.isDone}*/}
                            {/*    onChange={changeTaskStatus}/>*/}
<Checkbox color={'primary'} checked={t.isDone} onChange={changeTaskStatus}/>
                            <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                            {/*<span>{t.title}</span>*/}

                            {/*<button onClick={onClickHandler}>✖️</button>*/}
                            <IconButton onClick={onClickHandler} ><HighlightOff/></IconButton>
                        </ListItem>
                    )
                }
            )}
        </List>
        : <span>Your list is empty</span>

    //добавление таски с проверкой на пустую строку
    // const addTask = () => {
    //     const trimmedTitle = title.trim()
    //     if (trimmedTitle) {
    //         props.addTask(trimmedTitle)
    //     }
    //     setTitle("")
    // }

    //добавление таски с проверкой на пустую строку и алертом через if/else
    // const addTask = () => {
    //     const trimmedTitle = title.trim()
    //     if (trimmedTitle) {
    //         props.addTask(trimmedTitle)
    //     } else {alert("Type your task here")}
    //     setTitle("")
    // }

//добавление таски с проверкой на пустую строку и алертом через тернарный оператор

    const onClickButtonHandler = (filter: FilterValueType) => (event: MouseEvent) => {
        props.changeTodoListFilter(filter, props.todoListId)
    }
    const removeTodolist = () => props.removeTodoList(props.todoListId)
    const addTask = (title: string) => props.addTask(title, props.todoListId)
const changeTitle = (nextTitle: string) => props.changeTodoListTitle(nextTitle, props.todoListId)

    return (
        <div>
            <h3>
                {/*{props.title}*/}
                <EditableSpan title={props.title} changeTitle={changeTitle}/>
                {/*<button onClick={removeTodolist}>delete</button>*/}
                <IconButton onClick={removeTodolist} size={'small'}><DeleteForeverOutlined/></IconButton>
            </h3>
            <AddItemForm addItem={addTask} placeholder={'Add new task'}/>
            {tasksJSXItemsList}

            {/*<ul>*/}
            {/*    {props.tasks.map((t) => {*/}
            {/*            const onClickHandler = () => {*/}
            {/*                props.removeTask(t.id, props.todoListId)*/}
            {/*            }*/}

            {/*            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListId)*/}

            {/*            return (*/}
            {/*                <li key={t.id} className={t.isDone ? "isDone" : ""}>*/}
            {/*                    <input*/}
            {/*                        type="checkbox"*/}
            {/*                        checked={t.isDone}*/}
            {/*                        onChange={changeTaskStatus}/>*/}
            {/*                    <span>{t.title}</span>*/}
            {/*                    <button onClick={onClickHandler}>✖️*/}
            {/*                    </button>*/}
            {/*                </li>*/}
            {/*            )*/}
            {/*        }*/}
            {/*    )}*/}
            {/*</ul>*/}
            <div>
                <Button
                    style={{marginLeft: '2px'}}
                    variant={'contained'}
                    color={props.filter === "all" ? 'secondary' : 'primary'}
                    size={'small'}
                    disableElevation
                        onClick={onClickButtonHandler('all')}>All
                </Button>
                <Button
                    style={{marginLeft: '2px'}}
                    variant={'contained'}
                    color={props.filter === "active" ?  'secondary' : 'primary'}
                    size={'small'}
                    disableElevation
                        onClick={onClickButtonHandler('active')}>Active
                </Button>
                <Button
                    style={{marginLeft: '2px'}}
                    variant={'contained'}
                    color={props.filter === "completed" ?  'secondary' : 'primary'}
                    size={'small'}
                    disableElevation
                        onClick={onClickButtonHandler('completed')}>Completed
                </Button>
            </div>

        </div>
    );
}