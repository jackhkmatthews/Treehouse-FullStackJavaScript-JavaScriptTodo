//PROBLEM: user interation doesnt provide desired results
//SOLLUTION: add interactivity so the user can manage daily tasks

var taskInput = document.getElementById("new-task"); //new-task
var addButton = document.getElementsByTagName("button")[0]; //first button
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); //incomoplete-tasks list
var completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks list

//new Task List Item
var createNewTaskElement = function (taskString) {
  
  //create list item
  var listItem = document.createElement("li");
  
      //input (checkbox)
      var checkBox = document.createElement("input"); //checkbox
      //label
      var label = document.createElement("label")
      //input (text)
      var editInput = document.createElement("input") //text
      //button.edit
      var editButton = document.createElement("button")
      //button.delete
      var deleteButton = document.createElement("button")
      
      //each element needs modified
      
      checkBox.type = "checkbox";
      editInput.type = "text";
  
      editButton.innerText = "Edit";
      editButton.className = "edit";
      deleteButton.innerText = "Delete";
      deleteButton.className = "delete";
  
      label.innerText = taskString;
      
      //each element needs appending
      listItem.appendChild(checkBox);
      listItem.appendChild(label);
      listItem.appendChild(editInput);
      listItem.appendChild(editButton);
      listItem.appendChild(deleteButton);
      
      return listItem;
}
  
//add a new task
var addTask = function() {
  console.log("add task...")
  //create a new list item with text from #new-tasks:
  var newTaskLabel = taskInput.value
  var listItem = createNewTaskElement(newTaskLabel);
  //append listItem to incompleteTaskHolder
  incompleteTasksHolder.appendChild(listItem);
  var newTask = incompleteTasksHolder.lastChild;
  bindTaskEvents(newTask, taskCompleted)
  
  //clear value from taskInput
  taskInput.value = ("");
    
}
  
//edit an existing task
var editTask = function() { 
  console.log("edit task...")
  
  var listItem = this.parentNode;
  
  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");
  
  var containsClass = listItem.classList.contains("editMode")
  
    //if class of parent is .editmode 
    if(containsClass) {
      //switch from edit mode
      //make label text become input value
      label.innerText = editInput.value;
    } else {
      //switch to edit mode 
      //input value becomes labels text
      editInput.value = label.innerText;
    }
  
    //toggle edit mode on the list item
    listItem.classList.toggle("editMode");
  
  
}

//Delete an existing task
var deleteTask = function() {
  console.log("delete task...")
    //remove parent list item from ul
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    ul.removeChild(listItem);
}
  
//Mark a task as complete
var taskCompleted = function() {
  console.log("task complete...")
    //append the task list item to the #completed-tasks
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}
  
//Mark task as incomplete
var taskIncomplete = function() {
  console.log("task incomplete...")
    //apend the the task item to the #completed-tasks
    var listItem = this.parentNode;
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler){
  console.log("bind list items")
  //select taskListItem's children
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");
    
    //bind editTask to edit button
    editButton.onclick = editTask;
    
    //bind deleteTask to delete button
    deleteButton.onclick = deleteTask;
    
    //bind checkBoxEventHandler to the checkbox
    checkBox.onchange = checkBoxEventHandler;
}

//set the click handler to the addTask function
addButton.onclick = addTask;

//cycle over the incomplete tasks holder ul list items
for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
    //bind events to list item's children (taskComplete)
    bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

//cycle over the incomplete tasks holder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
    //bind events to list item's children (taskComplete)
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}




