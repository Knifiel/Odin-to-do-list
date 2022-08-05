import {storage} from "./data-storage.mjs";
import {ui} from "./UI.mjs"

export function makeSidebar(){
    let div = document.getElementById('sidebarProjectList');
    if(div === null){
        div = document.createElement('div');
        div.id = 'sidebarProjectList';
    } else {
        while (div.firstChild) {
            div.removeChild(div.firstChild);
          }
          
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
    while (ui.content.firstChild) {
        ui.content.removeChild(ui.content.firstChild);
      }
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
        ul.childNodes[index].lastChild.addEventListener('click', (e) => {
            if(confirm('Delete this task?')){
                storage.deleteTask(task);
                e.target.parentNode.remove();
            }
        });

        ul.childNodes[index].addEventListener('click', (e) => {
            if((ul.childNodes[index].classList.contains('taskExpanded') === false)&&(ul.childNodes[index].classList.contains('editActive') === false)){
            e.preventDefault();
            e.stopPropagation();
            ui.expandTaskDiv(ul.childNodes[index], task.description, task.priority);
            ul.childNodes[index].querySelector('.collapseButton').addEventListener('click', (e) => ui.collapseTaskDiv(ul.childNodes[index]));
            ul.childNodes[index].querySelector('.editButton').addEventListener('click', (e) =>  {
                e.stopPropagation();
                ui.editDiv(ul.childNodes[index]);
                ul.childNodes[index].querySelector('#formCancel').addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                renderTasks(project);
            });
              ul.childNodes[index].querySelector('#formAdd').addEventListener('click', () =>{
                e.stopPropagation();
                e.preventDefault();
                console.log(task);
                const form = ul.childNodes[index].querySelector('form');
                if(form.checkValidity() === true){
                    const formData = new FormData(form);
                    const title = formData.get('title');
                    const description = formData.get('description');
                    const dueToDate = formData.get('dueToDate');
                    const priority = formData.get('priority')?true:false;
                    for (const pair of formData.entries()) {
                        storage.changeProp(task, pair[0], pair[1]);
                      };
                    renderTasks(project);
                } else {
                    form.reportValidity();
                }
            });
            } 
            );
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
    const li = ui.liForAddTask();
    li.addEventListener('click', (e) => {
        openAddForm(e, li);
    }, {once : true});
    li.firstChild.addEventListener('click', (e) =>{
        openAddForm(e, li);
    }, {once : true});
    ul.appendChild(li);
}

function openAddForm(e, li){
    e.preventDefault();
        while (li.firstChild) {
            li.removeChild(li.firstChild);
        }
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
        e.stopPropagation();
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