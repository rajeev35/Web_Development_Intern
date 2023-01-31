//Todo List Practice program
//Matthew Thiess
//July 7, 2017

/*
The purpose of this application is to display a simple todo list with the
option to add, change, or remove todo items, among a few other features.
This application is an exercise in practicing JavaScript.
*/

//object: todoList
//create an object to define the properties and methods of the todo list
var todoList = {
    //property: todos
    //empty array to store 'todo' objects
    todos: [],
  
    //method: addTodos
    //adds the item 'todo' to the array 'todos'
    addTodos: function(todoText) {
      this.todos.push({
        todoText: todoText,
        completed: false
      });
    },
  
    //method: changeTodos
    //changes 'todo.todoText' to the value specified in 'newText'
    changeTodo: function(index, newText) {
      if (newText === "") {
        //do nothing
      } else {
        this.todos[index].todoText = newText;
      }
    },
  
    //method: deleteTodos
    //deletes the 'todo' object in the specified index of 'todos'
    deleteTodo: function(index) {
      this.todos.splice(index, 1);
    },
  
    //method: toggleCompleted
    //toggles the boolean 'todo.completed' for the selected 'todo' object
    toggleCompleted: function(index, checkBox) {
      var todo = this.todos[index]; //var to reference current index
      todo.completed = !todo.completed;
      if (todo.completed) {
        checkBox.checked = true;
      }
    },
  
    //method: toggleAll
    //marks 'todo.completed' true for all items, toggles all to false if all are true
    toggleAll: function() {
      var totalTodos = this.todos.length;
      var completedTodos = 0;
  
      //get number of completed todos
      this.todos.forEach(function(todo) {
        if (todo.completed) {
          completedTodos++;
        }
      });
  
      this.todos.forEach(function(todo) {
        //mark all false if all todos are completed
        if (completedTodos === totalTodos) {
          todo.completed = false;
        } else {
          //else mark all tasks as complete
          todo.completed = true;
        }
      });
    },
  
    //method: clearCompleted
    //clear all 'todo' objects with the value 'completed=true'
    clearCompleted: function() {
      var tempTodos = [];
      this.todos.forEach(function(todo, position) {
        if (todo.completed === false) {
          tempTodos.push(this.todos[position]); //push incomplete todos to list
        }
      }, this);
      this.todos = tempTodos;
    }
  };
  
  //object: handlers
  //create a handler object to connect events from the page to the todoList functions
  //the methods in this object correspond to the methods in the 'todoList' object
  var handlers = {
    //method: addTodo
    //connect "Add" button to todoList.addTodos method, grab text from correct input
    addTodo: function() {
      var addTodoTextInput = document.getElementById("addTodoTextInput");
      if(addTodoTextInput.value===""){
        //do nothing
      } else {
        todoList.addTodos(addTodoTextInput.value);
        addTodoTextInput.value = "";
        view.refreshTodos(true);
      }
    },
  
    //method: changeTodo
    //connect input boxes to the 'todoList.changeTodo' function
    changeTodo: function(position, text) {
      todoList.changeTodo(position, text);
      //view.displayTodos();
    },
  
    //method: deleteTodo
    //connect "Delete" button to 'todoList.deleteTodo' method, grab number value
    deleteTodo: function(position) {
      todoList.deleteTodo(position);
      view.refreshTodos();
    },
  
    //method: toggleCompleted
    //connect "Toggle Completed" button to 'todoList.toggleCompleted' method
    toggleCompleted: function(position, checkBox) {
      todoList.toggleCompleted(position, checkBox);
      view.refreshTodos();
    },
  
    //method: toggleAll
    //connect "Toggle All" button to 'todoList.toggleAll' method
    toggleAll: function() {
      todoList.toggleAll();
      view.refreshTodos();
    },
  
    //method: clearCompleted
    //connect "Clear Completed" button to 'todoList.clearCompleted' method
    clearCompleted: function() {
      todoList.clearCompleted();
      view.refreshTodos();
    }
  };
  
  //object: view
  //create an object to handle the tasks related to displaying content
  var view = {
    //method: displayTodos
    //insert todos as li elements into a ul element in the DOM to display
    //REPLACED IN FAVOR OF refreshTodos()
    displayTodos: function(elementDeleted) {
      var todosUl = document.querySelector("ul"); //ul element for todo list
      var checkBoxes = document.getElementsByClassName("toggleCompletedCheckBox"); //collection to store checkboxes
      // if (todoList.todos.length === 0) {
      //   todosUl.innerHTML =
      //     '<li> <text style="color:black">Add Todo: </text> <input class="w3-input w3-animate-input" id="addTodoTextInput" type="text" onkeyup="handlers.addTodo(event)"> <h1>Todo List</h1></li><li></li>';
      // } else {
      //   todosUl.innerHTML =
      //     '<li > <text style="color:black">Add Todo: </text> <input class="w3-input w3-animate-input" id="addTodoTextInput" type="text" onkeyup="handlers.addTodo(event)"> <h1>Todo List</h1></li>';
      // }
  
      //var defaultElements =
  
      todosUl.innerHTML = "";
      this.generateListHeader(); //place header above todo list
  
      todoList.todos.forEach(function(todo, position) {
        var todoLi = document.createElement("li");
  
        todoLi.id = position;
        todoLi.className =
          "todoItem w3-display-container w3-padding-small w3-khaki w3-animate-left";
        todoLi.appendChild(this.createToggleCompletedCheckBox());
        todoLi.appendChild(this.createTodoInput(todo.todoText));
        todoLi.appendChild(this.createDeleteButton());
        todosUl.appendChild(todoLi);
  
        //set the checkBoxes to the proper values
        if (todoList.todos[position].completed) {
          checkBoxes[position].checked = true;
        } else {
          checkBoxes[position].checked = false;
        }
      }, this);
    },
  
    //method: refreshTodos
    //refresh the necessary elements in the ul containing the todos
    refreshTodos: function(elementAdded) {
      //var todoItems = document.getElementsByClassName('todoItem'); //ul element for todo list
      var todosUl = document.querySelector("ul"); //ul element for todo list
      var checkBoxes = document.getElementsByClassName("toggleCompletedCheckBox"); //array to store checkboxes
  
      todosUl.innerHTML = ""; //reset the inner HTML of the ul
      var iconLine = document.getElementById("iconLine");
      if (todoList.todos.length === 0) {
        iconLine.style.display = "none";
      } else {
        iconLine.style.display = "block";
      }
      //this.generateListHeader(); //place header above todo list
  
      //iterate over todo items
      todoList.todos.forEach(function(todo, position) {
        var todoLi = document.createElement("li");
  
        //define the attributes for the individual list items
        todoLi.id = position;
        todoLi.className =
          "todoItem w3-display-container w3-padding-small w3-khaki w3-cell-row";
        if (position === todoList.todos.length - 1 && elementAdded === true) {
          todoLi.className += " w3-animate-left"; //add an animation to only the last element
        }
        todoLi.appendChild(this.createToggleCompletedCheckBox());
        todoLi.appendChild(this.createTodoInput(todo.todoText));
        todoLi.appendChild(this.createDeleteButton());
        todosUl.appendChild(todoLi);
  
        //set the checkBoxes to the proper values
        if (todoList.todos[position].completed) {
          checkBoxes[position].checked = true;
        } else {
          checkBoxes[position].checked = false;
        }
      }, this);
    },
  
    //method: createDeleteButton
    //create a delete button to accompany the text in the todo list
    createDeleteButton: function() {
      var deleteButton = document.createElement("button");
      deleteButton.className = "deleteButton";
      deleteButton.className +=
        " fa fa-times w3-button w3-transparent w3-xlarge w3-right w3-hover-red w3-cell";
      return deleteButton;
    },
  
    //method: createToggleCompletedButton
    //create a button to toggle the status of an item
    createToggleCompletedCheckBox: function() {
      var toggleCompletedCheckBox = document.createElement("input");
      toggleCompletedCheckBox.setAttribute("type", "checkbox");
      toggleCompletedCheckBox.className = "toggleCompletedCheckBox";
      toggleCompletedCheckBox.className += " w3-check w3-left w3-cell";
      return toggleCompletedCheckBox;
    },
  
    //method: createTodoInput
    //create a text input box for each individual item in the list
    createTodoInput: function(todoText) {
      var todoInput = document.createElement("input");
      var todoWrapper = document.createElement("div");
      todoInput.value = todoText;
      //todoInput.setAttribute("style", "width:90%");
      todoInput.className = "todoInput";
      todoInput.className += " w3-input w3-transparent w3-cell w3-rest w3-left";
      todoWrapper.className = "w3-container w3-cell w3-rest";
      todoWrapper.appendChild(todoInput);
      return todoWrapper;
    },
  
    //method: createListHeader
    //create a header for the list that will be created on load and refresh
    createListHeader: function() {
      var headerContainer = document.createElement("div"); //list item containing desired elements
      var headerLine = document.createElement("div"); //div for header text
      var headerText = document.createElement("H1"); //header element
      var inputLine = document.createElement("div"); //div for input line
      var inputBox = document.createElement("input"); //input element
      var iconHolderTemplate = document.createElement("div");
      var inputIcon = document.createElement("i"); //icon for input
      var listIcon = document.createElement("i"); //icon for list
      var iconLine = document.createElement("div");
      var checkAllButton = document.createElement("button");
      var clearAllButton = document.createElement("button");
  
      //set properties for header text
      headerText.innerHTML = "Todo List";
  
      //set class names and attributes
      headerContainer.className = "w3-container w3-display-container w3-large";
      headerLine.className = "w3-cell-row w3-section";
      headerText.className = "w3-cell w3-rest";
      inputLine.className = "w3-cell-row w3-section";
      iconHolderTemplate.className = "w3-cell";
      inputIcon.className = "fa fa-pencil w3-xlarge";
      listIcon.className = "fa fa-list w3-xlarge w3-col";
      iconLine.className = "w3-cell-row w3-section";
      checkAllButton.className =
        "fa fa-chevron-down w3-button w3-cell w3-left w3-transparent";
      clearAllButton.className =
        "fa fa-trash-o w3-button w3-cell w3-right w3-transparent";
  
      inputBox.id = "addTodoTextInput";
      inputBox.className = "w3-input w3-transparent w3-animate-input w3-rest";
      inputBox.setAttribute("onkeyup", "handlers.addTodo(event)");
      inputBox.setAttribute("placeholder", "Type to add an item");
      inputBox.setAttribute("style", "width:45%");
      iconHolderTemplate.setAttribute("style", "width:50px");
      checkAllButton.setAttribute("onclick", "handlers.toggleAll()");
      clearAllButton.setAttribute("onclick", "handlers.clearCompleted()");
  
      var inputIconHolder = iconHolderTemplate.cloneNode();
      inputIconHolder.appendChild(inputIcon);
      var listIconHolder1 = iconHolderTemplate.cloneNode();
      listIconHolder1.appendChild(listIcon);
      var listIconHolder2 = listIconHolder1.cloneNode(true);
  
      //append elements to respective lines
      //headerLine.appendChild(listIconHolder1);
      headerLine.appendChild(headerText);
      //headerLine.appendChild(listIconHolder2);
      //inputLine.appendChild(inputIconHolder);
      inputLine.appendChild(inputBox);
      iconLine.appendChild(checkAllButton);
      iconLine.appendChild(clearAllButton);
  
      //append the div elements to the list item
      headerContainer.appendChild(headerLine);
      headerContainer.appendChild(inputLine);
      headerContainer.appendChild(iconLine);
  
      return headerContainer;
    },
  
    generateListHeader: function() {
      var todosContainer = document.getElementById("todoList"); //ul element for todo list
      var todosUl = document.querySelector("ul");
      todosContainer.insertBefore(this.createListHeader(), todosUl);
    },
  
    //method: setupEventListeners
    //set up event listeners for list items
    setUpEventListeners: function() {
      var todosUl = document.querySelector("ul");
      var todoInput = document.getElementById("addTodoTextInput");
      var self = this;
  
      //detect clicked buttons
      todosUl.addEventListener("click", function(event) {
        //get the clicked item
        var elementClicked = event.target;
  
        //check if item is a delete button
        if (elementClicked.className.startsWith("deleteButton")) {
          //run handlers.deleteTodo(position)
          handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
        } else if (
          elementClicked.className.startsWith("toggleCompletedCheckBox")
        ) {
          //run handlers.toggleCompleted(position)
          handlers.toggleCompleted(
            parseInt(elementClicked.parentNode.id),
            elementClicked
          );
        } else if (elementClicked.className.startsWith("addTodoTextInput")) {
        }
      });
  
      //detect when an input field loses focus, and refresh list
      todosUl.addEventListener(
        "blur",
        function(event) {
          var elementEdited = event.target;
  
          if (elementEdited.className.startsWith("todoInput")) {
            //run changeTodo function when the element loses focus
            handlers.changeTodo(
              elementEdited.parentNode.parentNode.id,
              elementEdited.value
            );
          } else {
            elementEdited.value = "";
          }
        },
        true
      );
  
      todoInput.addEventListener("keyup", function(event) {
        var keyStroke = event.key;
        if (keyStroke === "Enter") {
          handlers.addTodo();
        }
      });
    }
  };
  
  //setup the event listeners for the page
  //view.generateListHeader();
  view.setUpEventListeners();
  