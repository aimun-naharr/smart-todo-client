const baseUrl='http://localhost:8000/api/v1';
export const loginUser=`${baseUrl}/auth/loginUser`;
export const signUpUser=`${baseUrl}/auth/createNewUser`;
export const addNewTask=`${baseUrl}/tasks/createNew`
export const updateTaskById=`${baseUrl}/tasks/updateTask`
export const deleteTask=`${baseUrl}/tasks/deleteTask`
export const getAllTasks=`${baseUrl}/tasks/getAll`