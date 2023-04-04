
import {create} from 'zustand';

const useTasks=create((set)=>({
   tasksData:[], 
    setTasksData: (data)=>set({tasksData: [...data]}),
   addTaskData:(data)=>set({tasksData: [...data]})
}))

export default useTasks;