# Task Manager

A simple and responsive **Task Manager** built with **HTML, CSS, and Vanilla JavaScript**. The application allows users to create, edit, delete, complete, search, and filter tasks while keeping data persistent using the browser's **localStorage**.

## 🚀 Features

* Add new tasks
* Set a due date for tasks
* Assign task priorities:

  * Low
  * Medium
  * High
* Edit existing tasks
* Delete individual tasks
* Mark tasks as completed
* Persist tasks using `localStorage`
* View all tasks
* Filter tasks by:

  * All
  * Active
  * Completed
* Filter tasks by priority
* Search tasks by text
* Add tasks using the `Enter` key
* Save edited tasks using the `Enter` key
* Clear all tasks
* Display the total number of tasks
* Empty-state message when no tasks are available

## 🛠️ Technologies Used

* **HTML5** — Application structure
* **CSS3** — Styling and layout
* **JavaScript (ES6+)** — Application logic and DOM manipulation
* **LocalStorage** — Persistent task storage

## 📚 JavaScript Concepts Practiced

This project was built as practical JavaScript learning rather than relying on a framework.

Some of the main concepts used include:

* Variables with `const` and `let`
* Arrays and objects
* Array methods

  * `forEach()`
  * `filter()`
  * `find()`
* DOM manipulation
* Event listeners
* Keyboard events
* Functions
* Template literals
* Conditional logic
* JSON serialization and parsing
* `localStorage`
* Dynamic element creation
* Classes and attributes
* String methods

  * `trim()`
  * `toLowerCase()`
  * `includes()`

## 📂 Project Structure

```text
TaskManager/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## 💾 Data Storage

Tasks are stored in the browser's `localStorage`.

Each task is represented as an object containing information such as:

```javascript
{
    text: "Learn JavaScript",
    date: "2026-09-15",
    priority: "High",
    completed: false
}
```

The task objects are stored as a JSON array under the `task` localStorage key.

This allows tasks to remain available even after refreshing the page.

## 🔎 Search & Filtering

The application provides multiple ways to find tasks.

### Status Filters

* **All** — Displays every task
* **Active** — Displays incomplete tasks
* **Completed** — Displays completed tasks

### Priority Filters

Tasks can also be filtered according to their priority:

* Low
* Medium
* High

### Search

Users can search for tasks by entering part or all of the task name. The search is case-insensitive.

## 🎯 What I Learned

Building this project helped me understand how JavaScript can be used to create an interactive frontend without relying on frameworks.

I practiced:

* Managing application state
* Working with arrays of objects
* Updating the DOM dynamically
* Handling user interactions
* Persisting application data
* Building reusable functions
* Filtering and searching data
* Connecting UI actions with stored data

## ▶️ How to Run

No installation or dependencies are required.

1. Clone the repository:

```bash
git clone https://github.com/adeeltahirdev/TaskManager.git
```

2. Open the project directory:

```bash
cd TaskManager
```

3. Open `index.html` in your browser.

You can also use a local development extension such as **Live Server** in VS Code.

## 🔮 Future Improvements

Possible improvements for future versions include:

* Give every task a unique ID instead of identifying tasks by their text
* Combine search, status, and priority filters
* Add task sorting
* Add confirmation before clearing all tasks
* Improve responsive design for smaller screens
* Add task statistics
* Add dark mode
* Add backend persistence with Django and a database
* Convert the frontend into a Django/REST API-powered application

## 📌 Project Status

**Completed ✅**

This project was created as a practical **Vanilla JavaScript project** to strengthen frontend development and prepare for working with APIs and backend frameworks such as Django REST Framework.

## 👨‍💻 Author

**Adeel Tahir**

GitHub: `https://github.com/adeeltahirdev/TaskManager`
