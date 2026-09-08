const addtask = document.getElementById('add')
const submit = document.getElementById('submit')


// Function to add tasks

submit.addEventListener('click', () => {
    const task = addtask.value
    const tasks = JSON.parse(localStorage.getItem('task')) || []

    if (task) {

        tasks.push({text:task, completed:false})

        task_counter(tasks)

        const taskList = document.getElementById('taskList')

        const taskItem = document.createElement('li')
        taskItem.classList.add('task-item')

        taskItem.innerHTML = `
            <span>${task}</span>

            <div>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn" onclick="delete_task(this)">Delete</button>
                <button class="complete-btn" onclick="complete_task(this)">Done</button>
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
})

addtask.addEventListener('keydown', (event) => {
    if (event.key == 'Enter') {
        submit.click();
    }
})

// Reteriving tasks on the referesh 

const tasks = JSON.parse(localStorage.getItem('task'))

if (tasks && tasks.length > 0) {

    const tasklist = document.getElementById('taskList')

    tasks.forEach(task => {

        const taskitem = document.createElement('li')
        taskitem.classList.add('task-item')

        taskitem.innerHTML = `
            <span>${task.text}</span>

            <div>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn" onclick="delete_task(this)">Delete</button>
                <button class="complete-btn" onclick="complete_task(this)">Done</button>
            </div>
        `

        if (task.completed) {
            const taskspan = taskitem.querySelector('span')
            taskspan.classList.add('completed-task')
            const editbtn = taskitem.querySelector('.edit-btn')
            editbtn.remove()
        }

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

    tasks = tasks.filter(task => task.text !== taskText)

    localStorage.setItem('task', JSON.stringify(tasks))

    taskItem.remove()

    task_counter(tasks)

    if (tasks && tasks.length === 0) {
        
    const task = document.getElementById('display')

    const message = document.createElement('p')

    message.classList.add('message')

    message.textContent = 'Add a task to get started!'

    task.appendChild(message)

    }
}

// Function to clear the tasks

const clearbtn = document.getElementById('clear-btn') 

clearbtn.addEventListener('click', () => {
    localStorage.removeItem('task')
    task_counter([])

    const taskitem = document.querySelectorAll('.task-item')

    taskitem.forEach(taskitem => {
        taskitem.remove()
    })

    const task = document.getElementById('display')

    const message = document.createElement('p')

    message.classList.add('message')

    message.textContent = 'Add a task to get started!'

    task.appendChild(message)

})

// Task counter function

let counter = document.getElementById('task-counter')

function task_counter(tasks) {

    counter.textContent = tasks ? tasks.length : 0
}

// Function for task completion btn

function complete_task(button) {
    
    const taskitem = button.parentElement.parentElement
    const taskspan = taskitem.querySelector('span')
    const taskText = taskspan.textContent 

    const tasks = JSON.parse(localStorage.getItem('task')) || []

    const task = tasks.find(item => item.text === taskText)

    if (task) {
        task.completed = true
        taskspan.classList.add('completed-task')
        const editbtn = taskitem.querySelector('.edit-btn')
        editbtn.remove()
    }

    localStorage.setItem('task', JSON.stringify(tasks))

}


task_counter(tasks)