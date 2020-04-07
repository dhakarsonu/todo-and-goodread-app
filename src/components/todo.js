import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {completeTodo,createTodo,deleteTodo,saveNameTodo,enableEditTodo} from '../actions/todoAction'
import '../styles/todo.css';
import {generateRandomNumber} from '../utils/helper';

class Todo extends Component {

    constructor(props){
      super(props);
      this.state = {
          error : {
              addTodo : {
                  enabled : false,
                  msg     : "Empty name is not valid!"
              },
              editTodo : {
                enabled : false,
                msg     : "Empty name is not valid!"
            }
          }
      }
      console.log(props);
    }

    addItem = (event) =>{
        let target = event.target;
        var name = target.previousElementSibling.value;
        target.previousElementSibling.value = "";

        if(!name){
            var error  = this.state.error;
            error.addTodo.enabled = true;   
            this.setState({error});
            return;
        }

        var data = {
            id : generateRandomNumber(),
            name,
            completed : false
        };

        this.props.createTodo({todo:data});
    };

    editItem = (event) =>{
        let id = event.target.closest(".todo-list").getAttribute("todoid");
        this.props.enableEditTodo({todo : {id,isEdit : true}});
    };

    deleteItem = (event) =>{
        let id = event.target.closest(".todo-list").getAttribute("todoid");
        this.props.deleteTodo({id});
    };


    completeItem = (event) =>{
        let target = event.target;
        var completed = target.checked;
        let id = target.closest(".todo-list").getAttribute("todoid");
        this.props.completeTodo({todo : {id,completed}});
    };

    saveItem = (event) =>{
        let target = event.target;
        let id = target.closest(".todo-list").getAttribute("todoid");
        var name = target.parentElement.previousElementSibling.value;
        if(!name){
            var error  = this.state.error;
            error.editTodo.enabled = true;   
            this.setState({error});
            return;
        }
        this.props.saveNameTodo({todo : {id,name,isEdit:false}});
    };

    addTodoErrorMessage = () =>{
        
        if(this.state.error.addTodo.enabled){
            return <p>{this.state.error.addTodo.msg}</p>
        }
    };

    editTodoErrorMessage = () =>{
        
        if(this.state.error.editTodo.enabled){
            return <p>{this.state.error.editTodo.msg}</p>
        }
    };

    editTodoInputKeyUpHandler = (event) =>{
        
        var error  = this.state.error;
        if(!event.target.value){
            error.editTodo.enabled = true;
        }else{
            error.editTodo.enabled = false;
        }   
        this.setState({error})

        if(!error.editTodo.enabled && event.keyCode === 13){
            event.target.nextElementSibling.firstChild.click();
        }
    };

    addTodoInputKeyUpHandler = (event) =>{
        var error  = this.state.error;
        if(!event.target.value){
            error.addTodo.enabled = true;
        }else{
            error.addTodo.enabled = false;
        } 
        this.setState({error});

        if(!error.addTodo.enabled && event.keyCode === 13){
            event.target.nextElementSibling.click();
        }
    };



    todoList = (data,isTodo) =>{
        if((isTodo && !data.completed) || (!isTodo && data.completed)){
            if(data.isEdit){
                return (
                    <div className="todo-list" todoid={data.id} key={data.id}>
                        <input type="checkbox" defaultChecked={data.completed} onClick={this.completeItem}/>
                        <input className="edit-input" type="text" placeholder="Change item name" defaultValue={data.name} onKeyUp={this.editTodoInputKeyUpHandler}/>
                        <code className="action-item">
                            <a href="#" onClick={this.saveItem} className={this.state.error.editTodo.enabled ? "avoid-clicks" : ""}>Save</a>
                            <a href="#" onClick={this.deleteItem}>Delete</a>
                        </code>
                        {
                            this.editTodoErrorMessage()
                        }
                    </div>
                );
            }
            return (
                <div className="todo-list" todoid={data.id} key={data.id}>
                    <input type="checkbox" defaultChecked={data.completed} onClick={this.completeItem}/>
                    <label className={data.completed ? "complete" : "pending"}>{data.name}</label>
                    <code className="action-item">
                        <a href="#" onClick={this.editItem}>Edit</a>
                        <a href="#" onClick={this.deleteItem}>Delete</a>
                    </code>
                </div>
            );
        }else{
            return ""; //<span>No Item Found!</span>
        } 
    };
  
    render() {
      return (
        <div className="todo-wrapper">
          <header>
              <a href="/">TODO App</a>
          </header>
          <div className="section">
            <div className="header">
                <span>ADD ITEMS</span>
                <hr/>
            </div>
            <div className="main">
                <input type="text" placeholder="Type here..." onKeyUp={this.addTodoInputKeyUpHandler}/>
                <a href="#" onClick={this.addItem} className={this.state.error.addTodo.enabled ? "avoid-clicks" : ""}>Add</a>
                {
                    this.addTodoErrorMessage()
                }
            </div>
          </div>
          <div className="section todo">
            <div className="header">
                <span>TODO</span>
                <hr/>
            </div>
            <div className="main">
                {
                    this.props.todo.map((data)=>{
                        return this.todoList(data,true);
                    })
                }
            </div>
          </div>
          <div className="section completed">
            <div className="header">
                <span>COMPLETED</span>
                <hr/>
            </div>
            <div className="main">
                {
                    this.props.todo.map((data)=>{
                        return this.todoList(data,false);
                    })
                }
            </div>
          </div>
        </div>
      );
    }
  }
  
  Todo.propTypes = {
    todo : PropTypes.array.isRequired
  };
  
  export default connect(
    state => ({
      todo : state.todoReducer.todo
    }),
    dispatch => bindActionCreators({ createTodo, completeTodo, deleteTodo, saveNameTodo, enableEditTodo }, dispatch)
  )(Todo);