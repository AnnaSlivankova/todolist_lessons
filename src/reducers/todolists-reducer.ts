import {FilterValueType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    id: string
}
export type AddTodoListAT = {
    type: "ADD-TODOLIST"
    title: string
    tdlId: string
}
export type ChangeTodoListFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    value: FilterValueType
    id: string
}
export type ChangeTodoListTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    title: string
    id: string
}
const initialState: Array<TodoListType> = []

type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListFilterAT | ChangeTodoListTitleAT

const todolistsReducer = (state = initialState, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            const newTodoListId: string = action.tdlId
            const newTodoList: TodoListType = {
                id: newTodoListId,
                title: action.title,
                filter: 'all'
            }
            return [...state, newTodoList]
        case "CHANGE-TODOLIST-FILTER":
           return  state.map(tl => tl.id === action.id ? {...tl, filter: action.value} : tl)
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)

        default:
            return state
    }
}

export default todolistsReducer;

export const RemoveTodoListAC = (id: string): RemoveTodoListAT => ({type: "REMOVE-TODOLIST", id: id})
export const AddTodoListAC = (title: string): AddTodoListAT => ({type: "ADD-TODOLIST", title, tdlId: v1()})
export const ChangeTodoListFilterAC = (id: string, value: FilterValueType): ChangeTodoListFilterAT => ({type: "CHANGE-TODOLIST-FILTER", id, value})
export const ChangeTodoListTitleAC = (id: string, title: string): ChangeTodoListTitleAT => ({type: "CHANGE-TODOLIST-TITLE", id, title})