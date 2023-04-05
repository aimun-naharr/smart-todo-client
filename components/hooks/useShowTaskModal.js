import {create} from 'zustand';

const useShowTaskModal=create((set)=>({
   isOpen:false, //initial value of isOpen
   onOpen: ()=>set({isOpen: true}),
   onClose: ()=>set({isOpen: false})
}))

export default useShowTaskModal;