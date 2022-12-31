import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {AddBox, DeleteForeverOutlined} from "@material-ui/icons";
import {IconButton, TextField} from "@material-ui/core";

type AddItemFormType = {
    addItem: (title: string) => void
    placeholder: string
}

const AddItemForm = (props: AddItemFormType) => {
    const [title, setTitle] = useState("")
    const [error, setError] = useState<boolean>(false)
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        error && setError(false)
    }
    const addItem = () => {
        const trimmedTitle = title.trim()
        trimmedTitle !== ""
            ? props.addItem(trimmedTitle)
            : setError(true)
        setTitle("")
    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addItem()
        }
    }

    return (
        <div>
            <div>
                {/*<input className={error ? 'error' : ''}*/}
                {/*       value={title}*/}
                {/*       onChange={onChangeHandler}*/}
                {/*       onKeyDown={onKeyDownHandler}*/}
                {/*       placeholder={props.placeholder}/>*/}

                <TextField variant={'outlined'}
                           size={'small'}
                           label={props.placeholder}
                           error={error}
                           helperText={error && 'Title is required!' }
                           value={title}
                           onChange={onChangeHandler}
                           onKeyDown={onKeyDownHandler}/>
                {/*<button onClick={addItem}>+</button>*/}
                <IconButton onClick={addItem} size={'small'}><AddBox/></IconButton>
                {/*{error && <div style={{fontWeight: "bold", color: 'red'}}> Title is required</div>}*/}

            </div>
        </div>
    );
};

export default AddItemForm;