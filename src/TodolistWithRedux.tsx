import React, {ChangeEvent} from 'react';
import {FilterValueType, TodoListType} from "./App";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete, DeleteForeverOutlined} from "@material-ui/icons";
import AddItemForm from "./AddItemform";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./reducers/store";
import {TasksType} from "./ToDoList";
import {ChangeTodoListFilterAC, ChangeTodoListTitleAC, RemoveTodoListAC} from "./reducers/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./reducers/tasks-reducer";


type TodolistWithReduxPropsType = {
    todolist: TodoListType
}

const TodolistWithRedux = ({todolist}: TodolistWithReduxPropsType) => {

    const {id, title, filter} = todolist

    let tasks = useSelector<AppRootStateType, Array<TasksType>>(state => state.tasks[id])

    if (filter === "active") {
        tasks = tasks.filter(t => !t.isDone)
    }
    if (filter === "completed") {
        tasks = tasks.filter(t => t.isDone)
    }


    const dispatch = useDispatch()

    function changeTodoListTitle(title: string) {
        dispatch(ChangeTodoListTitleAC(id, title))
    }

    function removeTodoList() {
        dispatch(RemoveTodoListAC(id))
    }

    function addTask(title: string) {
        dispatch(addTaskAC(title, id))
    }

    const onAllClickHandler = (filter: FilterValueType) => dispatch(ChangeTodoListFilterAC(id, filter))

    return <div>
        <h3><EditableSpan title={title} changeTitle={changeTodoListTitle}/>
            <IconButton onClick={removeTodoList}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask} placeholder={'Add new task'}/>
        <div>
            {
                tasks.map(t => {
                    const onClickHandler = () => dispatch(removeTaskAC(t.id, id))
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        dispatch(changeTaskStatusAC(t.id, newIsDoneValue, id))
                    }
                    const onTitleChangeHandler = (newValue: string) => {
                        dispatch(changeTaskTitleAC(t.id, newValue, id))
                    }


                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox
                            checked={t.isDone}
                            color="primary"
                            onChange={onChangeHandler}
                        />

                        <EditableSpan title={t.title} changeTitle={onTitleChangeHandler}/>
                        <IconButton onClick={onClickHandler}>
                            <Delete/>
                        </IconButton>
                    </div>
                })
            }
        </div>
        <div style={{paddingTop: "10px"}}>
            <Button variant={filter === 'all' ? 'outlined' : 'text'}
                    onClick={() => onAllClickHandler("all")}
                    color={'inherit'}
            >All
            </Button>
            <Button variant={filter === 'active' ? 'outlined' : 'text'}
                    onClick={() => onAllClickHandler("active")}
                    color={'primary'}>Active
            </Button>
            <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                    onClick={() => onAllClickHandler("completed")}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
};

export default TodolistWithRedux;