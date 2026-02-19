import { createSlice, configureStore } from "@reduxjs/toolkit";
import { act } from "react";

const cart = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addItem(state, action){
            const index = state.findIndex((findId) => findId.id === action.payload.id);
            if(index > -1){
                state[index].count++;
            }else{
                state.push({...action.payload, count: 1});
            }
        },
        deleteItem(state, action){
            const index = state.findIndex((findId) => findId.id === action.payload);
            state.splice(index, 1);
        },
        addCount(state, action){
            const index = state.findIndex((findId) => findId.id === action.payload);
            state[index].count++;
        },
        subCount(state, action){
            const index = state.findIndex((findId) => findId.id === action.payload);
            if(state[index].count > 1){
                state[index].count--;
            }
        },
        setOption(state, action){
            state.forEach(item => {
                if(item.category === '아이스크림' && !item.option){
                    item.option = action.payload;
                }
            })
        },
        updateFlavor(state, action){
            const { id, selectedFlavor } = action.payload;
            let item = state.find((a) => a.id === id);
            if(item){
                if(!item.selectedFlavors){
                    item.selectedFlavors = [];
                }
                if(item.selectedFlavors.length < item.flavor){
                    item.selectedFlavors.push(selectedFlavor);
                }
            }
        },
        removeFlavor(state, action){
            const{cartId, flavorIndex} = action.payload;
            const item = state.find(item => item.id === cartId);
            if(item && item.selectedFlavors){
                item.selectedFlavors.splice(flavorIndex, 1);
            }
        },
        resetFlavor(state){
            return state.map(item => item.category === '아이스크림' ? { ...item, selectedFlavors: [] } : item );
        },
        clearCart(){
            return [];
        },
    }
});

const point = createSlice({
    name: 'point',
    initialState: 0,
    reducers: {
        setPoint: (state, action) => action.payload,
        clearPoint: () => 0,
    }
});

export const {addItem, deleteItem, addCount, subCount, setOption, updateFlavor, removeFlavor, resetFlavor, clearCart} = cart.actions;
export const { setPoint, clearPoint } = point.actions;

export default configureStore({
    reducer: {
        cart: cart.reducer,
        point: point.reducer
    }
});