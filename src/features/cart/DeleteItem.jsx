import React from 'react'
import Button from '../../UI/Button'
import { useDispatch } from 'react-redux'
import { deleteItem } from './CartSlice';


export const DeleteItem = ({pizzaId}) => {
    const dispatch = useDispatch();
    return (
        <Button type="small" onClick={() => dispatch(deleteItem(pizzaId))}>Delete</Button>  
    )
}
