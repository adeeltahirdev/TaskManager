const addtask = document.getElementById('add')
const submit = document.getElementById('submit')

function add_task() {
    const task = addtask.value
    const tasks = JSON.parse(localStorage.getItem('task')) || []
    if (task) {
        tasks.push(task)
        const taskList = document.getElementById('taskList')
        const taskItem = document.createElement('li')
        taskItem.textContent = task
        taskList.appendChild(taskItem)
        addtask.value = ''
        const message = document.querySelector('.message')
        if (message) {
            message.remove()
        }
        localStorage.setItem('task', JSON.stringify(tasks))
    }
}

let tasks = JSON.parse(localStorage.getItem('task'))
if (tasks) {
    const tasklist = document.getElementById('taskList')
    tasks.forEach(task => {
        const taskitem = document.createElement('li')
        taskitem.textContent = task
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