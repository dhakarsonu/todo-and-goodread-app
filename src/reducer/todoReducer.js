
import { CREATE_TODO,COMPLETE_TODO,DELETE_TODO,SAVE_NAME_TODO,ENABLE_EDIT_TODO} from '../actions/todoAction';

const initialState = {
  todo : []
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TODO :
      return {
        ...state,  
        todo : [
          ...state.todo,
          action.payload.todo
        ]};
    case COMPLETE_TODO :
        return {
            ...state,
            todo : state.todo.map((todo, index) => {
                if (todo.id === action.payload.todo.id) {
                    return Object.assign({}, todo, {completed : action.payload.todo.completed})
                }
                return todo
            })
        }

    case SAVE_NAME_TODO :
        return {
            ...state,
            todo : state.todo.map((todo, index) => {
                if (todo.id === action.payload.todo.id) {
                    return Object.assign({}, todo, {name : action.payload.todo.name,isEdit : action.payload.todo.isEdit})
                }
                return todo
            })
        }

    case ENABLE_EDIT_TODO :
        return {
            ...state,
            todo : state.todo.map((todo, index) => {
                if (todo.id === action.payload.todo.id) {
                    return Object.assign({}, todo, {isEdit : action.payload.todo.isEdit})
                }
                return todo
            })
        }
        
    case DELETE_TODO :
        var newTodo = state.todo.map((todo, index) => {
            if (todo.id != action.payload.id) {
                return todo;
            }
        });
        newTodo.splice(newTodo.indexOf(undefined),1);
        return {
            ...state,
            todo : newTodo
        }
    default:
    return state;

  }
};

export default todoReducer;
