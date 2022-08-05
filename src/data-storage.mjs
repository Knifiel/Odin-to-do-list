import { format } from "date-fns";

class Task{
    constructor(project, title, description, dueToDate, priority){
        this.project = project;
        this.title = title;
        this.description = description || "\n";
        this.dueToDate = dueToDate || format(new Date(), 'yyyy-MM-dd');
        this.priority = priority || false;
        this.oldProject = '';

    }
}

function taskList(){
    return taskStorage;
}

function projectList(){
    return projectStorage;
}

function addProject(title){
    const i = projectStorage.findIndex(project => project === title);
    if(i === undefined){
        projectList.push(title);
    }
}
function removeProject(title){
return;
}

function saveToStorage(){
    const saveTasks = JSON.stringify(taskStorage);
    const saveProjects = JSON.stringify(projectStorage);
    localStorage.setItem('taskStorage', saveTasks);
    localStorage.setItem('projectList', saveProjects);
}

function NewTask(project, title, description, dueToDate, priority){
    const task = new Task(project, title, description, dueToDate, priority);
    taskStorage.push(task);
}

function deleteTask(task){
    console.log(taskStorage.splice(taskStorage.indexOf(task), 1));
}

function changeProperty(target, property, value){
        target[property] = value;
}

export const storage = {
    save: () => saveToStorage(),
    addProject: (title) => addProject(title),
    removeProject: (title) => removeProject(title),
    deleteTask: (task) => deleteTask(task),
    NewTask: (...args) => NewTask(...args),
    changeProp: (target, property, value) => changeProperty(target, property, value),
    taskList: () => taskList(),
    projectList: () => projectList(),
}
       
    const defaultStorage = [];
    const defaultTask = new Task('Default', 'Hello! Click on me to expand.', 'Welcome to ToDo! You can add new task by clicking the line below.');
    defaultStorage.push(defaultTask);
    const defaultProjects = ['Default', 'Finished'];
    
    const localTasks = localStorage.getItem('taskStorage');
    const taskStorage = (localTasks === null)?defaultStorage:JSON.parse(localTasks);
    const localProjects = localStorage.getItem('projectList');
    const projectStorage = (localProjects === null)?defaultProjects:JSON.parse(localProjects);