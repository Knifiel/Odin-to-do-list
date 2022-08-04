import css from "./style.css";
import {storage} from "./data-storage.mjs";
import {ui} from "./UI.mjs"

makeSidebar();
renderTasks('Default');

function makeSidebar(){
    let div = document.getElementById('sidebarProjectList');
    if(div === null){
        div = document.createElement('div');
        div.id = 'sidebarProjectList'
    } else {
        div.innerHTML = '';
    }
    const ul = document.createElement('ul');
    storage.projectList().forEach((project, index) => {
        const li = document.createElement('li');
        li.innerText = project;
        li.dataset.index = index;
        ul.appendChild(li);
        li.addEventListener('click', () =>{
            renderTasks(project);
         });           
    });
    div.appendChild(ul);
    ui.sidebar.appendChild(div);
}

function renderTasks(project){
    ui.content.innerHTML = '';
    const filteredTasks = storage.taskList().filter(element => element.project !== project);
    console.log(filteredTasks);
    const ul = ui.createListFromProp(filteredTasks, 'title', 'dueToDate');
    
    const index = Number(ul.lastChild.dataset.index) + 1;
    const addLi = ui.liForAddTask();
    addLi.dataset.index = index;
    
    ul.appendChild(addLi);
    ui.content.appendChild(ul);

    addLi.addEventListener('click', (e) => {
        e.preventDefault();
        addLi.innerHTML = '';
        const form = ui.formToCreateTask();
        addLi.appendChild(form);
        addLi.classList.add('formOpen');
    }, {once : true})
}
