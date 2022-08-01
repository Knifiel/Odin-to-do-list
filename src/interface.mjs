import { promptNew, promptNewProject } from "./elementCreation.mjs";
import { list } from "./index.js";


export function makeMainMenu(){
    const app = document.createElement('div');
    app.id = 'app';
    
    const header = document.createElement('div');
    header.id = 'header';
    
    const content = document.createElement('div');
    content.id = 'content';
    
    const createTask = document.createElement('button');
    createTask.classList.add('createButton');
    createTask.innerText = "Add new task";
    createTask.addEventListener('click', () => {
        promptNew(list);
    });

    const createProject = document.createElement('button');
    createProject.classList.add('createButton');
    createProject.innerText = "Create new project";
    createProject.addEventListener('click', () => {
        promptNewProject(list);
    });
   
    /* use only for debug
    const CheckList = document.createElement('button');
    CheckList.innerText = 'print list';
    CheckList.addEventListener('click', () => console.log(list));
    header.appendChild(CheckList);
    */

    header.appendChild(createTask);
    header.appendChild(createProject);

    app.appendChild(header);
    app.appendChild(content);
    document.body.appendChild(app);
}

