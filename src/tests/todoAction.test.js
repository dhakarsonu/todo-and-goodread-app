import * as actions from '../actions/todoAction';
import {generateRandomNumber} from '../utils/helper';

describe('actions', () => {
  it('should create a CREATE_TODO action', () => {
    const payload = {
      id : generateRandomNumber(),
      name : "Break-Fast ?",
      completed : false
  };
    const expectedAction = {
      type: actions.CREATE_TODO,
      payload
    }
    expect(actions.createTodo(payload)).toEqual(expectedAction);
  });

  it('should create a COMPLETE_TODO action', () => {
    const payload = {
      todo : {
        id : generateRandomNumber(),
        completed : true
      }
    };
    const expectedAction = {
      type: actions.COMPLETE_TODO,
      payload
    }
    expect(actions.completeTodo(payload)).toEqual(expectedAction);
  })

  it('should create a DELETE_TODO action', () => {
    const payload = {
      id : generateRandomNumber()
    };
    const expectedAction = {
      type: actions.DELETE_TODO,
      payload
    };
    expect(actions.deleteTodo(payload)).toEqual(expectedAction);
  })

  it('should create a SAVE_NAME_TODO action', () => {
    const payload = {
      id : generateRandomNumber(),
      name : "Lunch ?",
      isEdit : false
  };
    const expectedAction = {
      type: actions.SAVE_NAME_TODO,
      payload
    }
    expect(actions.saveNameTodo(payload)).toEqual(expectedAction);
  })

  it('should create a ENABLE_EDIT_TODO action', () => {
    const payload = {
      id : generateRandomNumber(),
      isEdit : false
  };
    const expectedAction = {
      type: actions.ENABLE_EDIT_TODO,
      payload
    }
    expect(actions.enableEditTodo(payload)).toEqual(expectedAction);
  })
})