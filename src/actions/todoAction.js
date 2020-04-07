export const CREATE_TODO = "CREATE_TODO";
export const COMPLETE_TODO = "COMPLETE_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const SAVE_NAME_TODO = "SAVE_NAME_TODO";
export const ENABLE_EDIT_TODO = "ENABLE_EDIT_TODO";

export const createTodo = (payload) =>{
    return {
        type : CREATE_TODO,
        payload : payload
    };
};

export const completeTodo = (payload) =>{
    return {
        type : COMPLETE_TODO,
        payload : payload
    };
};

export const saveNameTodo = (payload) =>{
    return {
        type : SAVE_NAME_TODO,
        payload : payload
    };
};

export const deleteTodo = (payload) =>{
    return {
        type : DELETE_TODO,
        payload : payload
    };
};

export const enableEditTodo = (payload) =>{
    return {
        type : ENABLE_EDIT_TODO,
        payload : payload
    };
};