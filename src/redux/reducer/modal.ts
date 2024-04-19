import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ModalState {
    isOpen:boolean
    modalInfo?:any|null
}

const initialState: ModalState = {
    isOpen:false,
    modalInfo:null
}

export const modalSlice = createSlice({
    name:'modal',
    initialState,
    reducers:{
        openModal: (state,action:PayloadAction)=>{
            state.isOpen=true;
            state.modalInfo=action.payload
        },
        closeModal: (state)=>{
            state.isOpen=false;
            state.modalInfo=null
        }
    }
})
export const {openModal,closeModal} =modalSlice.actions
export default modalSlice.reducer