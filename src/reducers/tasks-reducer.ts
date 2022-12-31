import {FilterValueType, TasksStateType, TodoListType} from "../App";
import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT} from "./todolists-reducer";
//export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
export type RemoveTaskAT = {
    type: "REMOVE-TASK"
    taskId: string
    todolistId: string
}
export type AddTaskAT = {
    type: "ADD-TASK"
    title: string
    todolistId: string
}
export type changeTaskStatusAT = {
    type: "CHANGE-TASK-STATUS"
    taskId: string
    todolistId: string
    isDone: boolean
}
export type changeTaskTitleAT = {
    type: "CHANGE-TASK-TITLE"
    taskId: string
    todolistId: string
    title: string
}

type ActionType = RemoveTaskAT | AddTaskAT | changeTaskStatusAT | changeTaskTitleAT | AddTodoListAT | RemoveTodoListAT

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.taskId)
            }
        case "ADD-TASK":
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {
                    ...el, isDone: action.isDone
                } : el)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {
                    ...el, title: action.title
                } : el)
            }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.tdlId]: []
            }
        case "REMOVE-TODOLIST":
            let copyState = {...state}
            delete copyState[action.id]
            return copyState

        default:
            return state
    }
}

export default tasksReducer;

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskAT => {
    return {type: "REMOVE-TASK", taskId, todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskAT => {
    return {type: "ADD-TASK", title, todolistId} as const
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): changeTaskStatusAT => {
    return {type: "CHANGE-TASK-STATUS", taskId, isDone, todolistId} as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): changeTaskTitleAT => {
    return {type: "CHANGE-TASK-TITLE", taskId, title, todolistId} as const
}

// export const AddTodoListAC = (title: string): AddTodoListAT => ({type: "ADD-TODOLIST", title})
// export const ChangeTodoListFilterAC = (value: FilterValueType, id: string): ChangeTodoListFilterAT => ({type: "CHANGE-TODOLIST-FILTER", id, value})