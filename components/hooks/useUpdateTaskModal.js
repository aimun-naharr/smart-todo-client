import {create} from 'zustand';

const useUpdateTaskModal=create((set)=>({
   isOpen:false, //initial value of isOpen
   updatedId: '',
   currentTask: {},
   setCurrentTask: (data)=>set({currentTask: data}),
   onOpen: (data)=>set({isOpen: true, updatedId: data}),
   setId:(data)=>set({updatedId: data}),
   onClose: ()=>set({isOpen: false, updatedId: ''})
}))

export default useUpdateTaskModal;