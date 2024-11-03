document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("taskForm");
    const taskInput = document.getElementById("taskInput");
    const dateInput = document.getElementById("dateInput");
    const timeInput = document.getElementById("timeInput");
    const taskList = document.getElementById("taskList");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Function to render tasks
    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const taskItem = document.createElement("li");
            taskItem.classList.add("task");
            if (task.completed) taskItem.classList.add("completed");

            taskItem.innerHTML = `
                <span>${task.name} - ${task.date} ${task.time}</span>
                <div>
                    <button onclick="toggleComplete(${index})">✓</button>
                    <button onclick="editTask(${index})">✎</button>
                    <button onclick="deleteTask(${index})">✗</button>
                </div>
            `;
            taskList.appendChild(taskItem);
        });
    }

    // Add a new task
    taskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const newTask = {
            name: taskInput.value,
            date: dateInput.value,
            time: timeInput.value,
            completed: false
        };
        tasks.push(newTask);
        taskInput.value = dateInput.value = timeInput.value = "";
        saveTasks();
        renderTasks();
    });

    // Mark task as complete
    window.toggleComplete = (index) => {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    };

    // Edit a task
    window.editTask = (index) => {
        const task = tasks[index];
        taskInput.value = task.name;
        dateInput.value = task.date;
        timeInput.value = task.time;
        deleteTask(index);
    };

    // Delete a task
    window.deleteTask = (index) => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    };

    // Save to localStorage
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    renderTasks(); // Initial render
});

