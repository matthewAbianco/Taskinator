var taskIdCounter = 0;

var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content");


// THE VARIABLE FOR CLEARING THE INPUT FIELDS AFTER THE "Add Task" BUTTON HAS BEEN CLICKED 
var taskFormHandler = function(event) {
  // THIS STOPS THE BROWSER/PAGE FROM REFRESHING ON ITS OWN (WHICH IT WANTS TO DO EVERY 1/4 SECOND) ALLOWING OUR TEXT AND TASK ENTRIES TO REMAIN ON THE PAGE
  event.preventDefault();
  // THE VARIABLES WHICH HOLD THE "Enter Task Name" AND "Pick A Task Type"
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;


// CHECKS IF EITHER "ENTER TASK NAME" OR "PICK A TASK TYPE" BOXES ARE EMPTY. IF ONE IS, THEN THE ALERT WILL DISPLAY
if (!taskNameInput || !taskTypeInput ) {
  alert("You need to fill out the task form!");
  return false;
}

// CLEARS THE CONTENT FROM THE "ENTER TASK NAME" AND "PICK A TASK TYPE" ENTRY BOXES AFTER SUBMISSION
formEl.reset();
// TAKES THE CREATED VALUES FROM THE "Enter Task Name" AND "Pick a Task Type" VARIABLES AND MAKES AN OBJECT OUT OF THEM
  var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput
  };
// TAKES THE DATA OF "TaskDataObj" AND USES THE DATA IN THE LIST 
  createTaskEl(taskDataObj);
};

// CREATES THE TASK FORM ENTITY
var createTaskEl = function (taskDataObj) {

  // THE VARIABLE TO CREATE THE TASK OBJECT THAT APPEARS ON THE SCREEN
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
  // TAKES THE "TaskIdCounter" VALUE AND SETS IT TO THE LIST ITEM'S ATTRIBUTE VALUE
    listItemEl.setAttribute("data-task-id", taskIdCounter);
  
  // TAKES THE "Enter Task Name" and "Pick a Task Type" VARIABLE VALUES AND CREATES A DIV / PUTS THEM IN THE LIST ITEM
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);
    
  //CREATES TASK ACTIONS (BUTTONS AND SELECT) FOR TASK
    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);  
  // TAKES THE VARIABLE "tasksActionsEl" AND MOVES IT TO THE LIST WITH "appendChild". THE "li" ELEMENT HAS BEEN APPLIED TO IT, ALLOWING US TO MOVE IT INTO THE COLUMNS, WHICH HAVE A "ul" ELEMENT 
    tasksToDoEl.appendChild(listItemEl);
  // ADDS +1 TO THE "TaskIdCounter" VALUE, WHICH IS USED TO GIVE THE TASK OBJECTS A UNIQUE ID / ATTRIBUTE VALUE
    taskIdCounter++;
  };


// THIS HOLDS THE "EDIT" "DELETE" AND "TASK STATUS" OBJECT BUTTONS ON THE FORM
var createTaskActions = function(taskId) {
  // THIS VARIABLE IS THE "Container" WHICH HOLDS THE "EDIT" "DELETE" AND "TASK STATUS" BUTTONS 
  var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";
  // better explain what is going on here with the (taskId) in "setAttribute" and the function for "createTasksActions"
  // WITH THE "appendChild" METHOD. WE ADD THE BUTTONS AND "SELECT" CONTAINER TO THE "actionContainerEl". THE "appendChild" FORCES THE ELEMENT TO BE A CHILD ELEMENT OF ANOTHER ELEMENT
  // EDIT BUTTON OBJECT
  var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(editButtonEl);
// DELETE BUTTON OBJECT
  var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(deleteButtonEl);
// TASK STATUS "Select" BAR OBJECT
  var statusSelectEl = document.createElement("select");
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    statusSelectEl.className = "select-status";
    actionContainerEl.appendChild(statusSelectEl);
  // THE VARIABLE FOR THE "To Do" "In Progres" and "Completed" STATUS COLUMNS. ORGANIZED IN [] BRACKETS TO NUMBER THEM. TO BE ADDED TO THE "StatusSelectEl" VARIABLE
  var statusChoices = ["To Do", "In Progress", "Completed"];
  // ask more about this
  // THE "FOR LOOP" FOR GIVING THE "statusChoices" VARIABLE ATTRIBUTE A VALUE 
  for (var i = 0; i < statusChoices.length; i++) {
  // THE VARIABLE TO ALLOW THE LIST OBJECT TO MOVE
    var statusOptionEl = document.createElement("option");
    statusOptionEl.setAttribute("value", statusChoices[i]);
    statusOptionEl.textContent = statusChoices[i];
  // THE FORMULA TO ALLOW THE LIST OBJECT TO MOVE BETWEEN COLUMNS
    statusSelectEl.appendChild(statusOptionEl);
  }
  // ???? THE RETURN STATEMENT STOPS THE EXECUTION OF THE "actionContainerEl" FUNCTION AND RETURNS THE VALUE OF THAT FUNCTION TO THE "actionContainerEl" VARIABLE.
  return actionContainerEl;
};



// THE "LISTENER" EVENT SO OUR DATA ENTRY FIELDS TO "Add Task" WILL CLEAR AUTOMATICALLY AFTER BEING SUBMITTED 
formEl.addEventListener("submit", taskFormHandler);

var taskButtonHandler = function(event) {
  // get target element from event
  var targetEl = event.target;

  // edit button was clicked
  if (targetEl.matches(".edit-btn")) {
    var taskId = targetEl.getAttribute("data-task-id");
    editTask(taskId);
  } 
  // delete button was clicked
  else if (targetEl.matches(".delete-btn")) {
    var taskId = targetEl.getAttribute("data-task-id");
    deleteTask(taskId);
  }
};


// VARIABLE TO EDIT TASKS
var editTask = function(taskId) {
  console.log("editing task #" + taskId)

  //get task list item element
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  // get content from task name and type
  var taskName = taskSelected.querySelector("h3.task-name").textContent;
  document.querySelector("input[name='task-name']").value = taskName;

  var taskType = taskSelected.querySelector("span.task-type").textContent;
  document.querySelector("select[name='task-type']").value = taskType;

  document.querySelector("#save-task").textContent = "save-task"
};


// VARIABLE TO DELETE TASKS
var deleteTask = function(taskId) {
  console.log(taskId);
  // find task list element with taskId value and remove it
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  taskSelected.remove();
};

// ADDS AN EVENT LISTENER TO THE "main" HTML ELEMENT, THAT IS TARGETING THE BUTTONS WITHIN THE LIST
pageContentEl.addEventListener("click", taskButtonHandler);