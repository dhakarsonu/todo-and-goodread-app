import reducer from '../reducer/todoReducer';
import * as actions from '../actions/todoAction';
import {generateRandomNumber} from '../utils/helper';

describe('Reducer', () => {
  it('should be the initial state', () => {
    let existingStore = {
        todo : []
    };
    expect(reducer(existingStore, {type:"Default"})).toEqual(existingStore)
  })

  it('should process CREATE_TODO action', () => {

    let existingStore = {
        todo : []
    };
    const id = generateRandomNumber();
    let payload = {
        id,
        name : "Break-Fast ?",
        completed : false
    };

    let expectedResult = {
        todo : [
            {
                id,
                name : "Break-Fast ?",
                completed : false
            }
        ]
    };

    expect( reducer(existingStore, actions.createTodo({todo : payload}))).toEqual(expectedResult)

    // Adding One more Todo
    payload.name = "Lunch ?";
    let newId = generateRandomNumber();
    payload.id = newId;

    existingStore = {
        todo : [
            {
                id,
                name : "Break-Fast ?",
                completed : false
            }
        ]
    };

    expectedResult = {
        todo : [
            {
                id,
                name : "Break-Fast ?",
                completed : false
            },
            {
                id : newId,
                name : "Lunch ?",
                completed : false
            }
        ]
    };

    expect( reducer(existingStore, actions.createTodo({todo : payload}))).toEqual(expectedResult)
  });

  it('should process COMPLETE_TODO action', () => {

    const id = generateRandomNumber();
    let existingStore = {
        todo : [
            {
                id,
                name : "Break-Fast ?",
                completed : false
            }
        ]
    };
    
    let payload = {
        id,
        completed : true
    };

    let expectedResult = {
        todo : [
            {
                id,
                name : "Break-Fast ?",
                completed : true
            }
        ]
    };

    expect( reducer(existingStore, actions.completeTodo({todo : payload}))).toEqual(expectedResult)

  })

  it('should process DELETE_TODO action', () => {

    const id = generateRandomNumber();
    let existingStore = {
        todo : [
            {
                id,
                name : "Break-Fast ?",
                completed : false
            }
        ]
    };
    
    let payload = {
        id
    };

    let expectedResult = {
        todo : []
    };

    expect( reducer(existingStore, actions.deleteTodo({todo : payload}))).toEqual(expectedResult)

  })

  it('should process SAVE_NAME_TODO action', () => {

    const id = generateRandomNumber();

    let existingStore = {
        todo : [
            {
                id,
                name : "Break-Fast ?",
                completed : false
            }
        ]
    };
    
    let payload = {
        id,
        name : "Lunch ?"
    };

    let expectedResult = {
        todo : [
            {
                id,
                name : "Lunch ?",
                completed : false
            }
        ]
    };

    expect( reducer(existingStore, actions.saveNameTodo({todo : payload}))).toEqual(expectedResult)

  })

  it('should process ENABLE_EDIT_TODO action', () => {

    const id = generateRandomNumber();
    let existingStore = {
        todo : [
            {
                id,
                name : "Break-Fast ?",
                completed : false,
                isEdit : false
            }
        ]
    };
    
    let payload = {
        id,
        isEdit : true
    };

    let expectedResult = {
        todo : [
            {
                id,
                name : "Break-Fast ?",
                completed : false,
                isEdit : true
            }
        ]
    };

    expect( reducer(existingStore, actions.enableEditTodo({todo : payload}))).toEqual(expectedResult)
  })
})