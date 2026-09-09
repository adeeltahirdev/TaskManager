const addtask = document.getElementById('add')
const submit = document.getElementById('submit')
const date = document.getElementById('date')
const priority = document.getElementById('priority')
const allbtn = document.getElementById('all-btn')
const activebtn = document.getElementById('active-btn')
const completedbtn = document.getElementById('completed-btn')
const lowP = document.getElementById('low-priority')
const mediumP = document.getElementById('medium-priority')
const highP = document.getElementById('high-priority')
const search = document.getElementById('search')
const searchbtn = document.querySelector('.search-btn')


// Task counter function

let counter = document.getElementById('task-counter')

function task_counter(tasks) {

    counter.textContent = tasks ? tasks.length : 0
}

// Function to add tasks

submit.addEventListener('click', () => {

    const task = addtask.value
    const tasks = JSON.parse(localStorage.getItem('task')) || []

    if (task) {

        tasks.push({
            text: task,
            date: date.value,
            priority: priority.value,
            completed: false
        })

        localStorage.setItem('task', JSON.stringify(tasks))

        render_task(tasks)
        task_counter(tasks)

        addtask.value = ''
        date.value = ''
        priority.value = 'Medium'
    }
    
})

addtask.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        submit.click()
    }
})

// Reteriving tasks on the referesh 

const tasks = JSON.parse(localStorage.getItem('task')) || []

render_task(tasks)

task_counter(tasks)


// Function to delele the task

function delete_task(button) {
    const taskItem = button.parentElement.parentElement

    const taskText = taskItem.querySelector('span').textContent

    let tasks = JSON.parse(localStorage.getItem('task')) || []

    tasks = tasks.filter(task => task.text !== taskText)

    localStorage.setItem('task', JSON.stringify(tasks))

    taskItem.remove()

    task_counter(tasks)

    render_task(tasks)

}


// Function to clear the tasks

const clearbtn = document.getElementById('clear-btn') 

clearbtn.addEventListener('click', () => {
    localStorage.removeItem('task')
    
    task_counter([])

    render_task([])

})


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
        const donebtn = taskitem.querySelector('.complete-btn')
        editbtn.remove()
        donebtn.remove()
    }

    localStorage.setItem('task', JSON.stringify(tasks))

}

// Function for editing the tasks

function edit_task(button) {
    const taskitem = button.parentElement.parentElement
    const taskSpan = taskitem.querySelector('span')
    const taskText = taskSpan.textContent

    const input = document.createElement('input')
    input.classList.add('edit-input')
    input.value = taskText

    taskSpan.replaceWith(input)

    const taskmeta = taskitem.querySelector('.task-meta')
    const editdate = document.createElement('input')
    editdate.type = 'date'
    editdate.classList.add('edit-date')

    const editpriority = document.createElement('select')
    editpriority.classList.add('edit-priority')
    editpriority.innerHTML = `
        <option value="Low">Low Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="High">High Priority</option>
    `

    const savedtasks = JSON.parse(localStorage.getItem('task')) || []
    const savedtask = savedtasks.find(item => item.text === taskText)

    if (savedtask) {
        editdate.value = savedtask.date || ''
        editpriority.value = savedtask.priority || 'Medium'
    }

    taskmeta.replaceChildren(editdate, editpriority)

    const delbtn = taskitem.querySelector('.delete-btn')
    const completebtn = taskitem.querySelector('.complete-btn')
    const editbtn = taskitem.querySelector('.edit-btn')

    delbtn.remove()
    completebtn.remove()

    editbtn.textContent = 'Save'

    function save_edit() {
         const newtext = input.value

            const tasks = JSON.parse(localStorage.getItem('task')) || []

            const task = tasks.find(item => item.text === taskText)

            if (task) {
                task.text = newtext
                task.date = editdate.value
                task.priority = editpriority.value
            }

            localStorage.setItem('task', JSON.stringify(tasks))

            const newTaskSpan = document.createElement('span')
            newTaskSpan.textContent = newtext
        
            input.replaceWith(newTaskSpan)

            taskmeta.innerHTML = `
                <span>Due: ${editdate.value || 'No date'}</span>
                <span class="priority-${editpriority.value.toLowerCase()}">${editpriority.value} priority</span>
            `

            const newDeleteBtn = document.createElement('button')
            newDeleteBtn.classList.add('delete-btn')
            newDeleteBtn.textContent = 'Delete'
            newDeleteBtn.onclick = function () {
                delete_task(this)
            }

            const newCompleteBtn = document.createElement('button')
            newCompleteBtn.classList.add('complete-btn')
            newCompleteBtn.textContent = 'Done'
            newCompleteBtn.onclick = function () {
                complete_task(this)
            }

            editbtn.textContent = 'Edit'

            editbtn.parentElement.appendChild(newDeleteBtn)
            editbtn.parentElement.appendChild(newCompleteBtn)
    }

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
           save_edit()
        }
    })

    editbtn.addEventListener('click', () => {
        save_edit()
    })

}

function render_task(tasks) {

    const tasklist = document.getElementById('taskList')

    tasklist.innerHTML = ''

     const existingMessage = display.querySelector('.message')
    if (existingMessage) {
        existingMessage.remove()
    }

    if (tasks && tasks.length > 0) {

        tasks.forEach(task => {

            const taskitem = document.createElement('li')
            taskitem.classList.add('task-item')

            taskitem.innerHTML = `
                <span>${task.text}</span>

                <div class="task-meta">
                    <span>Due: ${task.date || 'No date'}</span>
                    <span class="priority-${(task.priority || 'Medium').toLowerCase()}">${task.priority || 'Medium'} priority</span>
                </div>

                <div>
                    <button class="edit-btn" onclick="edit_task(this)">Edit</button>
                    <button class="delete-btn" onclick="delete_task(this)">Delete</button>
                    <button class="complete-btn" onclick="complete_task(this)">Done</button>
                </div>
            `

            if (task.completed) {
                const taskspan = taskitem.querySelector('span')
                taskspan.classList.add('completed-task')
                const editbtn = taskitem.querySelector('.edit-btn')
                const donebtn = taskitem.querySelector('.complete-btn')
                editbtn.remove()
                donebtn.remove()
            }

            tasklist.appendChild(taskitem)
        })

    }

    else {
        const message = document.createElement('p')
        message.classList.add('message')
        message.textContent = 'Add a task to get started!'
        display.appendChild(message)
    }
}


// Active tab function

function active_tab(button) {
    const tabs = [allbtn, activebtn, completedbtn]

    tabs.forEach(tabs => {
        tabs.classList.remove('active')
    })

    button.classList.add('active')
}


// Filtering the tasks

allbtn.addEventListener('click', () => {

    active_tab(allbtn)

    const tasks = JSON.parse(localStorage.getItem('task')) || []

    render_task(tasks)
})

activebtn.addEventListener('click', () => {

    active_tab(activebtn)

    const tasks = JSON.parse(localStorage.getItem('task')) || []

    const activeTask = tasks.filter(item => item.completed === false)

    render_task(activeTask)
})

completedbtn.addEventListener('click', () => {

    active_tab(completedbtn)

    const tasks = JSON.parse(localStorage.getItem('task')) || []

    const completedTask = tasks.filter(item => item.completed === true)

    render_task(completedTask)
})

lowP.addEventListener('click', () => {
    
    const tasks = JSON.parse(localStorage.getItem('task')) || []

    const lowPtask = tasks.filter(item => item.priority === 'Low')
    
    render_task(lowPtask)
})

mediumP.addEventListener('click', () => {
    
    const tasks = JSON.parse(localStorage.getItem('task')) || []

    const mediumPtask = tasks.filter(item => item.priority === 'Medium')
    
    render_task(mediumPtask)
})

highP.addEventListener('click', () => {
    
    const tasks = JSON.parse(localStorage.getItem('task')) || []

    const highPtask = tasks.filter(item => item.priority === 'High')
    
    render_task(highPtask)
})

// Search tasks by their text

function search_tasks() {
    const searchTerm = search.value.trim().toLowerCase()
    const tasks = JSON.parse(localStorage.getItem('task')) || []
    const matchingTasks = tasks.filter(task => task.text.toLowerCase().includes(searchTerm))

    render_task(matchingTasks)
}

searchbtn.addEventListener('click', search_tasks)

search.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        search_tasks()
    }
})

task_counter(tasks)
