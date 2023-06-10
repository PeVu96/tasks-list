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
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
    <li
      class="list__item"${task.done ? " list__item--done" : ""}
    >
      <button class="tasks__button tasks__button--done js-done">
        ${task.done ? "✓" : ""}
      </button>
      <span class="${task.done ? "list__item--done" : ""}">
        ${task.content}
      </span>
      <button class="tasks__button tasks__button--remove js-remove">
        🗑
      </button>
    </li>
  `;
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;
  };

  const renderButtons = () => {

  };

  const bindButtonsEvents = () => {

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
    }

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