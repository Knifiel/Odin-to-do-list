import { format } from "date-fns";

class Task{
    constructor(project, title, description, dueToDate, priority){
        this.project = project;
        this.title = title;
        this.description = description || "";
        this.dueToDate = dueToDate || format(new Date(), 'yyyy-MM-dd');
        this.priority = priority || false;
        this.isCompleted = false;

    }
}

function taskList(){
    const tempStorage = structuredClone(taskStorage);
    return tempStorage;
}

function projectsList(){
    const tempList = structuredClone(projectList);
    return tempList;
}

function addProject(title){
    const i = projectList.findIndex(project => project === title);
    if(i === undefined){
        projectList.push(title);
    }
}
function removeProject(title){


}

function saveToStorage(){
    const saveTasks = JSON.stringify(taskStorage);
    const saveProjects = JSON.stringify(projectList);
    localStorage.setItem('taskStorage', saveTasks);
    localStorage.setItem('projectList', saveProjects);
}

function NewTask(project, title, description, dueToDate, priority, isCompleted){
    const task = new Task(project, title, description, dueToDate, priority, isCompleted);
    taskStorage.push(task);
}

function changeProperty(target, property, value){
    if(target[property]!== value){ 
        target[property] = value;
    } else {
        console.warn(`object ${target} property ${property} is already ${value}.`);
    }
}

export const storage = {
    save: () => saveToStorage(),
    addProject: (title) => addProject(title),
    removeProject: (title) => removeProject(title),
    NewTask: (...args) => NewTask(...args),
    changeProp: (target, property, value) => changeProperty(target, property, value),
    taskList: () => taskList(),
    projectList: () => projectsList(),
}
       
    const defaultStorage = [];
    const defaultTask = new Task('Hello!', 'Welcome to ToDo! You can add new task by clicking the line below.');
    defaultStorage.push(defaultTask);
    const defaultProjects = ['Default'];
    
    const localTasks = localStorage.getItem('taskStorage');
    const taskStorage = (localTasks === null)?defaultStorage:JSON.parse(local);
    const localProjects = localStorage.getItem('projectList');
    const projectList = (localProjects === null)?defaultProjects:JSON.parse(localProjects);