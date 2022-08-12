import { parse, differenceInDays, isToday, isTomorrow } from "date-fns";
import {storage} from "./data-storage.mjs";
import {ui} from "./UI.mjs"

export function makeSidebar(activeProject){
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
        const span = document.createElement('span');
        span.innerText = project;
        li.appendChild(span);
        li.dataset.index = index;
        li.dataset.project = project;
        ul.append(li);
        if(li.dataset.project === activeProject){
            li.classList.add('activeFilter');
            renderTasks(activeProject);
        }
        
        li.addEventListener('click', () =>{
            if(li.classList.contains('activeFilter')){
                return;
            }
            renderTasks(project);
            ul.childNodes.forEach(node => node.classList.remove('activeFilter'));
            li.classList.add('activeFilter');
        });
        if((project !== 'Unfinished')&&(project !== "Finished")){
        const editBtn = ui.makeImg('edit');
        editBtn.classList.add('editButton');
        editBtn.addEventListener('click', (e) =>{
            e.preventDefault();
            e.stopPropagation();
            
            let newName = prompt('Enter new project name', project)
            if((newName === null)||(newName === project)){
                return;
            }
            li.dataset.project = newName;
            storage.changeProjectName(project, newName);
            const currentActiveProject = ul.childNodes.forEach(node =>{
                if(node.classList.contains('activeFilter')){
                    return node.dataset.project;
                }
            });
            makeSidebar(currentActiveProject);
        });
        li.prepend(editBtn);
         const deleteBtn = ui.makeImg('delete');
         deleteBtn.addEventListener('click', (e) => {
             e.stopPropagation();
             e.preventDefault();
             if(confirm("Are you sure you want to delete this project?") === false){
                return;
             }
             storage.removeProject(project);
             e.target.parentNode.remove();
             if(e.target.parentNode.classList.contains('activeFilter')){
                makeSidebar('Unfinished');
             }
         });
         deleteBtn.classList.add('delete');
         li.append(deleteBtn);
        }

    });
    div.appendChild(ul);
    ui.sidebar.appendChild(div);
    
    const liForAddButton = document.createElement('li');
    const addButton = document.createElement('button');
    addButton.innerText = 'Add New Project';
    addButton.classList.add('newProjectButton');
    addButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const projName = prompt("Enter new project title", 'New Project')
        if(projName === null){
            return;
        }
        storage.addProject(projName);
        makeSidebar(projName);
    });
    liForAddButton.appendChild(addButton);
    ul.appendChild(liForAddButton);
}

//render all task cards belonging to the project;
export function renderTasks(project){
    while (ui.content.firstChild) {
        ui.content.removeChild(ui.content.firstChild);
      }
    const head = document.createElement('h3');
    ui.content.appendChild(head);
    
    let filteredTasks;
    if(project === 'Unfinished'){
        filteredTasks = storage.taskList().filter(element => element.project != 'Finished');
    } else {
    filteredTasks = storage.taskList().filter(element => element.project === project);
    }
    let ul;
    if(filteredTasks !==null){
        ul = ui.createListFromProp(filteredTasks, 'title', 'dueToDate');
    } else {
        ul = document.createElement('ul');
    }
    head.textContent = `${project}. Tasks: ${filteredTasks.length}`;
    if(filteredTasks.length !== 0){
        const clearTasksButton = document.createElement('button');
        clearTasksButton.innerText = "Clear";
        head.appendChild(clearTasksButton);
        clearTasksButton.classList.add('clearTasks');
        clearTasksButton.addEventListener('click', (e) => {
            e.preventDefault();
            if(confirm('Do you want to delete all tasks in this project')){
                filteredTasks.forEach(task => {
                    if(task.project === project){
                        storage.deleteTask(task);
                    }
                });
            renderTasks(project);
            }
        });
    }
    ui.content.appendChild(ul);


//add event listeners to each project card to expand/finish/delete them.
    filteredTasks.forEach((task, index) =>{
        ul.childNodes[index].firstChild.addEventListener('click', (e) => {
            if(task.project!=='Finished'){
                storage.changeProp(task, 'startProject', task.project);
                storage.changeProp(task, 'project', 'Finished');
            } else {
                storage.changeProp(task, 'project', task.startProject);
            }
            e.target.parentNode.remove();
        });
        if (task.priority === true){
            ul.childNodes[index].toggleAttribute('priorityTask', true);
        }
        
//give classes according to current date

const date = parse(task.dueToDate, 'yyyy-MM-dd', new Date());
const refDate = new Date();
        if (isToday(date)){
            ul.childNodes[index].classList.add('isToday');
        }else if(isTomorrow(date)){
            ul.childNodes[index].classList.add('isTomorrow');
        }else if(differenceInDays(date, refDate) < 0){
            ul.childNodes[index].classList.add('isLate');
        }else if(differenceInDays(date, refDate) < 7){
            ul.childNodes[index].classList.add('isWithinWeek')
        }else{
            ul.childNodes[index].classList.add('isQuiteAway');
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
            ul.childNodes[index].querySelector('.changeProject').addEventListener('click', (e) =>{
                e.preventDefault();
                e.stopPropagation();
                const filter = (storage.projectList().filter(item => ((item !== 'Finished')&&(item !== project))));
                if(filter.length === 0){
                    return;
                }
                if(document.getElementById('projOptions') !== null){
                    return;
                }
                const form = document.createElement('form');
                form.id = 'projOptions';

                const choice = document.createElement('select');
                choice.required = true;
                choice.name = 'project';

                choice.addEventListener('click', (e) => e.stopImmediatePropagation());

                e.target.parentNode.appendChild(form);
                        filter.forEach(projectItem => {
                        const option = document.createElement('option');
                        option.text = projectItem;
                        option.value = projectItem;
                        choice.appendChild(option);
                    });
                form.appendChild(choice);
                const confirmButton = document.createElement('button');
                confirmButton.innerText = 'Accept';
                form.appendChild(confirmButton);
                confirmButton.addEventListener('click', (e) =>{
                    e.stopPropagation();
                    e.preventDefault();
                    if(e.target !== e.currentTarget) return;
                    if(form.checkValidity() === true){
                        ul.childNodes[index].remove();
                        form.remove();
                        const formData = new FormData(form);
                        storage.changeProp(task, 'project', formData.get('project'));
                    } else {
                        form.reportValidity();
                    }
                });
                const cancelButton = document.createElement('button');
                    cancelButton.innerText = 'Cancel';
                    form.appendChild(cancelButton);
                    cancelButton.addEventListener('click', (e) =>{
                        e.stopPropagation();
                        e.preventDefault();
                        if(e.target !== e.currentTarget) return;
                        form.remove();
                    });
                form.addEventListener('mouseover', (e) => {e.preventDefault; e.stopPropagation});
                form.addEventListener('click', (e) => {e.preventDefault; e.stopPropagation});
            });    

            ul.childNodes[index].querySelector('.editButton').addEventListener('click', (e) =>  {
                e.preventDefault();
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
                const form = ul.childNodes[index].querySelector('form');
                if(form.checkValidity() === true){
                    const formData = new FormData(form);
                    if(formData.has('priority')===false){
                        formData.append('priority', false );
                    } else {
                        formData.set('priority', true );
                    }
                    for (const pair of formData.entries()) {
                        storage.changeProp(task, pair[0], pair[1]);
                      }
                    renderTasks(project);
                } else {
                    form.reportValidity();
                }
            });
            } 
            )} else {
                ui.collapseTaskDiv(ul.childNodes[index]);
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
            const project = filter.dataset.project;
            storage.NewTask(project, title, description, dueToDate, priority);
            renderTasks(project);       
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
window.addEventListener("beforeunload", function(){
    storage.save();
 }, false);
window.addEventListener('input', (e) => {
    if(e.target instanceof HTMLInputElement){
        storage.save();
    }
})
}