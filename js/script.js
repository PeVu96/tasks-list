{
  let tasks = [];

  let hideDoneTasks = false;

  const addNewTask = (newTaskContent) => {
    tasks = [
      ...tasks,
      { content: newTaskContent },
    ];

    render();
  };

  const removeTask = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      ...tasks.slice(taskIndex + 1),
    ];

    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      { ...tasks[taskIndex], done: !tasks[taskIndex].done },
      ...tasks.slice(taskIndex + 1),
    ];

    render();
  };

  const bindRemoveEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, taskIndex) => {
      removeButton.addEventListener("click", () => {
        removeTask(taskIndex);
      });
    });
  };

  const bindToggleDoneEvents = () => {
    const toggleDoneButtons = document.querySelectorAll(".js-done");

    toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(taskIndex);
      });
    });
  };

  const renderTasks = () => {
    let tasksListHTMLContent = "";

    for (const task of tasks) {
      tasksListHTMLContent += `
      <li class="list__item ${task.done && hideDoneTasks ? "list__item--hidden" : ""}">
        <button class="tasks__button tasks__button--done js-done">
         ${task.done ? "&#10004" : ""}
        </button>
        <span class="${task.done ? "list__item--done" : ""}">
         ${task.content}
        </span>
        <button class="tasks__button tasks__button--remove js-remove">
         &#128465
        </button>
      </li>
    `;
    };

    document.querySelector(".js-tasks").innerHTML = tasksListHTMLContent;
  };

  const renderButtons = () => {
    let tasksListHTMLButton = "";

    if (tasks.length > 0) {
      tasksListHTMLButton = `
        <button class="list__button js-hideDoneTasks">
          ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
        </button>
        <button class="list__button js-allTasksDone" ${tasks.every(task => task.done) ? "disabled" : ""}>
          Ukończ wszystkie
        </button>
      `;
    };

    document.querySelector(".js-buttons").innerHTML = tasksListHTMLButton;
  };

  const toggleHideDoneTasks = () => {
    hideDoneTasks = !hideDoneTasks;

    render();
  };

  const markAllTasksDone = () => {
    tasks = tasks.map((task) => ({ ...task, done: true }));

    render();
  };

  const bindButtonsEvents = () => {
    const markAllTasksDoneButton = document.querySelector(".js-allTasksDone");

    if (markAllTasksDoneButton) {
      markAllTasksDoneButton.addEventListener("click", markAllTasksDone);
    };

    const toggleHideDoneTasksButton = document.querySelector(".js-hideDoneTasks");

    if (toggleHideDoneTasksButton) {
      toggleHideDoneTasksButton.addEventListener("click", toggleHideDoneTasks);
    };
  };

const render = () => {
  renderTasks();
  renderButtons();

  bindRemoveEvents();
  bindToggleDoneEvents();
  bindButtonsEvents();
};

const onFormSubmit = (event) => {
  event.preventDefault();

  const inputElement = document.querySelector(".js-newTask");
  const newTaskContent = document.querySelector(".js-newTask").value.trim();

  if (newTaskContent === "") {
    return;
  };

  addNewTask(newTaskContent);
  inputElement.value = "";
  inputElement.focus();
};

const init = () => {
  render();

  const form = document.querySelector(".js-form");

  form.addEventListener("submit", onFormSubmit);
};

init();
}