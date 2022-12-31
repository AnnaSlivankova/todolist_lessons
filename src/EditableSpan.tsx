import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changeTitle: (nextTitle:string) => void
}

const EditableSpan = (props: EditableSpanPropsType) => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState(props.title)
    const onEditMode = () => {
        setIsEditMode(true)
    }
    const offEditMode = () => {
        props.changeTitle(title)
        setIsEditMode(false)
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            offEditMode()
        }
    }

    return (
        isEditMode
            ? <TextField value={title}
                         onBlur={offEditMode}
                         onKeyDown={onKeyDownHandler}
                         autoFocus={true}
                         onChange={onChangeHandler}/>

            // <input
            //     value={title}
            //     onBlur={offEditMode}
            //     onKeyDown={onKeyDownHandler}
            //     autoFocus={true}
            // onChange={onChangeHandler}/>
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    );
};

export default EditableSpan;