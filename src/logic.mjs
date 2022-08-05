import {storage} from "./data-storage.mjs";
import {ui} from "./UI.mjs"

export function makeSidebar(){
    let div = document.getElementById('sidebarProjectList');
    if(div === null){
        div = document.createElement('div');
        div.id = 'sidebarProjectList';
    } else {
        div.innerHTML = '';
    }
    const ul = document.createElement('ul');
    storage.projectList().forEach((project, index) => {
        const li = document.createElement('li');
        li.innerText = project;
        li.dataset.index = index;
        li.dataset.project = project;
        ul.appendChild(li);
        li.addEventListener('click', (e) =>{
            if(li.classList.contains('activeFilter')){
                return;
            }
            renderTasks(project);
            ul.childNodes.forEach(node => node.classList.remove('activeFilter'));
            li.classList.add('activeFilter');
         });           
    });
    div.appendChild(ul);
    ui.sidebar.appendChild(div);
    
    if (ul.childNodes.forEach(element => (element.classList==='activeFilter'))){
        return;
    } else{
        ul.firstChild.classList.add('activeFilter');
    };
}

export function renderTasks(project){
    ui.content.innerHTML = '';
    const filteredTasks = storage.taskList().filter(element => element.project === project);
    let ul;
    if(filteredTasks !==null){
    ul = ui.createListFromProp(filteredTasks, 'title', 'dueToDate');
    } else {
    ul = document.createElement('ul');
    }
    ui.content.appendChild(ul);
    filteredTasks.forEach((task, index) =>{
        ul.childNodes[index].firstChild.addEventListener('click', (e) => {
            if(task.project!=='Finished'){
                storage.changeProp(task, 'startProject', task.project)
                storage.changeProp(task, 'project', 'Finished');
            } else {
                storage.changeProp(task, 'project', task.startProject);
            }
            e.target.parentNode.remove();
        });
        if (task.priority === true){
            ul.childNodes[index].toggleAttribute('priorityTask', true);
        }
        ul.childNodes[index].addEventListener('click', (e) => {
            if(ul.childNodes[index].classList.contains('taskExpanded') === false){
            e.preventDefault();
            ui.expandTaskDiv(ul.childNodes[index], task.description, task.priority);
            }
        });
    });
    
    if(project !== "Finished"){
    addTaskLiWithListeners(ul);
    } else {
    ul.classList.add('finished');
    }
    
}

function addTaskLiWithListeners(ul){
    let index;
    if(ul.lastChild === null){
        index = 0;
    } else {
    index = Number(ul.lastChild.dataset.index) + 1;
    }
    const addLi = ui.liForAddTask();
    addLi.dataset.index = index;
    addLi.addEventListener('click', (e) => {
        openAddForm(e, addLi);
    }, {once : true});
    addLi.firstChild.addEventListener('click', (e) =>{
        openAddForm(e, addLi);
    }, {once : true});
    ul.appendChild(addLi);
}

function openAddForm(e, li){
    e.preventDefault();
        li.innerHTML = '';
        const form = ui.formToCreateTask();
        li.appendChild(form);
        li.classList.add('formOpen');
        const addButton = document.getElementById('formAdd');
    const parent = li.parentNode;
    const cancelButton = document.getElementById('formCancel');
    cancelButton.addEventListener('click', (e) => {
        e.preventDefault();
        li.remove();
        addTaskLiWithListeners(parent);
    });
    addButton.addEventListener('click', (e) =>{
        e.preventDefault();
        const form = document.getElementById('form');
        if(form.checkValidity() === true){
            const formData = new FormData(form);
            const title = formData.get('title');
            const description = formData.get('description');
            const dueToDate = formData.get('dueToDate');
            const priority = formData.get('priority')?true:false;
            const filter = document.querySelector('.activeFilter');
            console.log(filter); 
            const project = filter.dataset.project;
            console.log(title, description, dueToDate, priority, project);
            storage.NewTask(project, title, description, dueToDate, priority);
            renderTasks(project);
            console.log('task Storage:');
            console.log(storage.taskList());            
        } else {
            form.reportValidity();
        }
    });
    form.childNodes.forEach(node => {
        if(node.type !== 'textarea'){
            node.addEventListener('keydown', (e) => {
                if(e.key == 'Enter'){
                    e.preventDefault();
                }
            });
        }
    })
}

export function enableSaving(){
window.addEventListener("beforeunload", function(e){
    storage.save();
 }, false);
window.addEventListener('input', (e) => {
    if(e.target instanceof HTMLInputElement){
        storage.save();
    }
})
}