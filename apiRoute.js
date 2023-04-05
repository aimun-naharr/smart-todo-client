const baseUrl='https://smart-todo-server-app.onrender.com/api/v1';
export const loginUser=`${baseUrl}/auth/loginUser`;
export const signUpUser=`${baseUrl}/auth/createNewUser`;
export const addNewTask=`${baseUrl}/tasks/createNew`
export const updateTaskById=`${baseUrl}/tasks/updateTask`
export const deleteTask=`${baseUrl}/tasks/deleteTask`
export const getAllTasks=`${baseUrl}/tasks/getAll`