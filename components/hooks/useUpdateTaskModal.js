import {create} from 'zustand';

const useUpdateTaskModal=create((set)=>({
   isOpen:false, //initial value of isOpen
   updatedId: '',
   onOpen: (data)=>set({isOpen: true, updatedId: data}),
   onClose: ()=>set({isOpen: false})
}))

export default useUpdateTaskModal;