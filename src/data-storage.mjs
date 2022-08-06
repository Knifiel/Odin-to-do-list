import { format, isPast } from "date-fns";

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
    if(i === -1){
        projectStorage.push(title);
    }
}

function removeProject(project){
    if((project === "Unfinished")||(project === 'Finished')){
        return;
    }
    taskStorage.forEach((task) => {
        if(task.project === project){
            deleteTask(task);
        }
    });
    projectStorage.splice(projectStorage.indexOf(project));
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
    taskStorage.splice(taskStorage.indexOf(task), 1);
}

function changeProperty(target, property, value){
        switch(true){
            case ((property === 'description')&&((value === "")||(value === undefined))):
                value = "\n";
                break;
            case((property === 'project')&&(projectStorage.indexOf(value)===-1)):
                value = "Unfinished";
                break;
            case((property === 'priority')&&(value === 'true')):
                value = true;
                break;
            case((property === 'priority')&&(value === 'false')):
                value = false;
                break;
        }
        target[property] = value;
}

function changeProjectName(project, newName){
    const i = projectStorage.findIndex(project => project === newName);
    if(i === -1){
    taskStorage.forEach(task => {
        if(task.project === project){
            changeProperty(task, 'project', newName);
        }
    projectStorage.splice(projectStorage.indexOf(project), 1, newName);
    });
}}

export const storage = {
    save: () => saveToStorage(),
    addProject: (title) => addProject(title),
    removeProject: (title) => removeProject(title),
    deleteTask: (task) => deleteTask(task),
    NewTask: (...args) => NewTask(...args),
    changeProp: (target, property, value) => changeProperty(target, property, value),
    taskList: () => taskList(),
    projectList: () => projectList(),
    changeProjectName: (project, newName) => changeProjectName(project, newName),
}
       
    const defaultStorage = [];
    const defaultTask = new Task('Unfinished', 'Hello! Click on me to expand.', 'Welcome to ToDo! You can add new task by clicking the line marked "Add new task". At the bottom of expanded card, you can find buttons to move task to finished tasks, delete them, edit them and move them to another project. ');
    defaultStorage.push(defaultTask);
    const defaultProjects = ['Unfinished', 'Finished'];
    
    const localProjects = localStorage.getItem('projectList');
    const projectStorage = (localProjects === null)?defaultProjects:JSON.parse(localProjects);
    
    const localTasks = localStorage.getItem('taskStorage');
    const taskStorage = (localTasks === null)?defaultStorage:JSON.parse(localTasks);
