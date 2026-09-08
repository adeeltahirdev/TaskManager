const addtask = document.getElementById('add')
const submit = document.getElementById('submit')


// Function to add tasks

function add_task() {

    const task = addtask.value
    const tasks = JSON.parse(localStorage.getItem('task')) || []

    if (task) {

        tasks.push(task)

        const taskList = document.getElementById('taskList')

        const taskItem = document.createElement('li')
        taskItem.classList.add('task-item')

        taskItem.innerHTML = `
            <span>${task}</span>

            <div>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn" onclick="delete_task(this)">Delete</button>
                <button class="complete-btn">Done</button>
            </div>
        `

        taskList.appendChild(taskItem)

        addtask.value = ''

        const message = document.querySelector('.message')

        if (message) {
            message.remove()
        }

        localStorage.setItem('task', JSON.stringify(tasks))
    }
}


// Reteriving tasks on the referesh 

const tasks = JSON.parse(localStorage.getItem('task'))

if (tasks && tasks.length > 0) {

    const tasklist = document.getElementById('taskList')

    tasks.forEach(task => {

        const taskitem = document.createElement('li')
        taskitem.classList.add('task-item')

        taskitem.innerHTML = `
            <span>${task}</span>

            <div>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn" onclick="delete_task(this)">Delete</button>
                <button class="complete-btn">Done</button>
            </div>
        `

        tasklist.appendChild(taskitem)
    })

}

else {

    const task = document.getElementById('display')

    const message = document.createElement('p')

    message.classList.add('message')

    message.textContent = 'Add a task to get started!'

    task.appendChild(message)
}


// Function to delele the task

function delete_task(button) {
    const taskItem = button.parentElement.parentElement

    const taskText = taskItem.querySelector('span').textContent

    let tasks = JSON.parse(localStorage.getItem('task')) || []

    tasks = tasks.filter(task => task !== taskText)

    localStorage.setItem('task', JSON.stringify(tasks))

    taskItem.remove()
}

// Function to clear the tasks
