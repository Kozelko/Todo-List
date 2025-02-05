document.addEventListener('DOMContentLoaded', function () {
    const todoList = JSON.parse(localStorage.getItem('todoList')) || [];

    function createEditableCell(defaultText = '') {
        const cell = document.createElement('td');
        cell.contentEditable = 'true';
        cell.textContent = defaultText;
        cell.addEventListener('focus', function () {
            if (this.textContent === defaultText) {
                this.textContent = '';
            }
        });
        return cell;
    }

    function createDateCell(defaultDate = '') {
        const cell = document.createElement('td');
        const dateInput = document.createElement('input');
        dateInput.type = 'date';
        dateInput.value = defaultDate;
        cell.appendChild(dateInput);
        return cell;
    }

    function createDeleteButton() {
        const cell = document.createElement('td');
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = '🗑️'; // Ikona koša
        deleteBtn.addEventListener('click', function () {
            const row = this.closest('tr');
            row.remove();
            saveTasks();
        });
        cell.appendChild(deleteBtn);
        return cell;
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('tbody tr').forEach(row => {
            const task = {
                name: row.children[1].textContent,
                dueDate: row.querySelector('input[type="date"]').value,
                description: row.children[3].textContent,
                completed: row.querySelector('.task-checkbox').checked
            };
            tasks.push(task);
        });
        localStorage.setItem('todoList', JSON.stringify(tasks));
    }

    function renderTasks() {
        const tbody = document.querySelector('tbody');
        tbody.innerHTML = ''; // Clear existing tasks
        todoList.forEach(task => {
            const tr = document.createElement('tr');

            const checkboxCell = document.createElement('td');
            checkboxCell.className = 'checkbox-column';
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'task-checkbox';
            checkbox.checked = task.completed;
            checkboxCell.appendChild(checkbox);

            tr.appendChild(checkboxCell);
            tr.appendChild(createEditableCell(task.name));
            tr.appendChild(createDateCell(task.dueDate));
            tr.appendChild(createEditableCell(task.description));
            tr.appendChild(createDeleteButton()); // Pridanie tlačidla na vymazanie

            tbody.appendChild(tr);
        });
    }

    function addNewTask() {
        const tbody = document.querySelector('tbody');
        const tr = document.createElement('tr');

        const checkboxCell = document.createElement('td');
        checkboxCell.className = 'checkbox-column';
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkboxCell.appendChild(checkbox);

        tr.appendChild(checkboxCell);
        tr.appendChild(createEditableCell('New task'));
        tr.appendChild(createDateCell());
        tr.appendChild(createEditableCell());
        tr.appendChild(createDeleteButton()); // Pridanie tlačidla na vymazanie

        tbody.appendChild(tr);

        tr.children[1].focus();
        saveTasks();
    }

    document.querySelector('.new-task-btn').addEventListener('click', addNewTask);

    document.querySelector('tbody').addEventListener('input', saveTasks);

    renderTasks();
});