async function loadTasks() {
    const res = await fetch('http://localhost:3000/api/tasks');
    const tasks = await res.json();

    const list = document.getElementById('taskList');
    list.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${task.title}
            <button onclick="deleteTask(${task.id})">X</button>
        `;
        list.appendChild(li);
    });
}

async function addTask() {
    const input = document.getElementById('taskInput');
    const title = input.value.trim();

    if (!title) return;

    await fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
    });

    input.value = '';
    loadTasks();
}

async function deleteTask(id) {
    await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: 'DELETE'
    });

    loadTasks();
}

loadTasks();