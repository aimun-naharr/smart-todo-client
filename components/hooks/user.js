
import {create} from 'zustand';

const useUserState=create((set)=>({
   user:{}, //initial value of user
    onLogin: (userData)=>set({user: { ...userData}}),
    onSignUp: (userData)=>set({user: {userData}})
}))

export default useUserState;