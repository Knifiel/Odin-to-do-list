import { ToDo } from "./todo-storage.mjs";
import { format } from 'date-fns';
import { parseForm } from "./formParser.mjs";
import { list } from "./index.js";

export function populate(list, rootNode){
    rootNode.innerHTML = '';
    console.log(list.projects);
    list.projects.forEach((project) =>{
        if(project !== 'none'){
        const div = document.createElement('div');
        const header = document.createElement('h2');
        header.innerText = project;
        div.classList.add('project');
        div.id = project;
        div.appendChild(header);
        const deleteProject = document.createElement('button');
        deleteProject.innerText = 'DELETE';
        deleteProject.addEventListener('click', () => {deleteProjectPrompt(project)});
        div.appendChild(deleteProject);
        rootNode.appendChild(div);
        }
    });

    list.array.forEach((todo) => {        
        const div = createElement(todo, list);
        if(todo.project !== 'none'){
            const targetDiv = document.getElementById(todo.project);
            targetDiv.appendChild(div);
        } else {
        rootNode.appendChild(div);
        }
    });
}

function createElement(todo, list){    
    const div = document.createElement("div");
    
    const header = document.createElement('h3');
    header.textContent = todo.title;
    makeEditable(header, todo, 'title');
    
    div.classList.add('todo');
    const description = document.createElement('p');
    description.textContent = todo.description;
    description.classList.add('description');
    makeEditable(description, todo, 'description');
    
    const dueDate = document.createElement('input');
    dueDate.setAttribute('type', 'date');
    dueDate.classList.add('dueDate');
    dueDate.defaultValue = format(new Date(todo.dueDate), 'yyyy-MM-dd');
    dueDate.addEventListener('input', () => {
        if(todo.dueDate !== dueDate.value){
            todo.dueDate = dueDate.value;
            populate(list, document.getElementById('content'));
        } 
    });
    const dueDateLabel = document.createElement('label');
    dueDateLabel.innerText = 'Due to:'
    dueDateLabel.appendChild(dueDate);
    
    const projectLabel = document.createElement('label');
    const project = document.createElement('select');
   
    projectLabel.innerText = "Project:"
    projectLabel.appendChild(project);    
        list.projects.forEach(element => {
            const option = document.createElement('option');
            option.innerText = element;
            project.appendChild(option);
        })
    project.value = todo.project;
    project.addEventListener('input', () => {
        if(project.value !== todo.project){
            todo.project = project.value;
            populate(list, document.getElementById('content'));
        }
    });
    
    const priority = makeCheckbox(todo, 'priority');
    const isDone = makeCheckbox(todo, 'isDone');
    const isDoneLabel = document.createElement('label');
    isDoneLabel.innerText = 'Done?';
    isDoneLabel.appendChild(isDone);
    
    const priorityLabel = document.createElement('label');
    priorityLabel.innerHTML = `Prioritize?`;
    priorityLabel.appendChild(priority);
    
    const remove = document.createElement('button');
    remove.innerText = "DELETE";
    remove.addEventListener('click', () => {div.remove(); list.deleteTodo(todo)})
    
    
    div.appendChild(header);
    div.appendChild(dueDateLabel);
    div.appendChild(projectLabel);
    div.appendChild(description);
    if(todo.checklist.length>0){
        const checklist = createChecklist(todo.checklist, div);
    }
    div.appendChild(priorityLabel);
    div.appendChild(isDoneLabel);
    div.appendChild(remove);
    
    
    return div;
}

function createChecklist(arr, div){
    const ol = document.createElement('ol');
    ol.classList.add('checklist');
    arr.forEach(element => {
        createListElement(element, arr, ol);
    });
    const newListItem = document.createElement('div');
    const input = document.createElement('input');
        input.type = 'text';
        const button = document.createElement('button');
        button.innerText = '+';
        button.addEventListener('click', () => {
            if(input.value !== ''){
            arr.push({text: input.value, isDone: false});
            console.log(arr);
            createListElement(arr[arr.length-1], arr, ol);
            input.value = '';
            }
        });
        newListItem.appendChild(input);
        newListItem.appendChild(button);
        ol.firstChild.before(newListItem);
    div.appendChild(ol);
}


function createListElement(element, arr, ol) {
    const checkbox = makeCheckbox(element, 'isDone');
    const li = document.createElement('li');
    li.innerText = element.text;
    makeEditable(li, element, 'text');

    li.appendChild(checkbox);
    const remove = document.createElement('button');
    remove.innerText = "X";
    remove.addEventListener('click', () => { li.remove(); arr.splice(arr.indexOf(element), 1); console.log(arr); });
    li.appendChild(remove);
    ol.appendChild(li);
}


function makeCheckbox(obj, prop) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = obj[prop];
    checkbox.classList.add(prop);
    checkbox.addEventListener('click', () => {
        obj[prop] = !obj[prop];
    });
    return checkbox;
}

function changeContent(element, object, prop){ 
    try{
        element.classList.remove('invalid');
        if(element.firstChild.nodeValue !== object[prop]){
            object[prop] = element.firstChild.nodeValue;
        }
    } catch(error){
        element.classList.add('invalid');
    }
}

function makeEditable(element, object, prop){
    element.addEventListener('dblclick', () => {element.contentEditable = true, element.focus()});
    element.addEventListener('blur', () => element.contentEditable = false);
    element.addEventListener('input', () => changeContent(element, object, prop));
}


function createLabelWithElement(id, innerText, element, type){
    const input = document.createElement(element);
    input.id = id;
    if(type !==undefined){
    input.setAttribute('type', type);
    };
    input.name = id;
    const label = document.createElement('label');
    label.innerText = innerText;
    label.appendChild(input);
    return label;
}

function checklistAdder(){
    const div = document.createElement('div');
    div.id = 'checklistAdder';
    const header = document.createElement('h3');
    header.textContent = 'Input your checklist. Each paragraph will be a separate list item:';
    const textarea = document.createElement('textarea');
    textarea.id = 'checklist';
    textarea.name = 'checklist';

    div.appendChild(header);
    div.appendChild(textarea);
    return div;
}

function addNewElement(preset){
        const todo = new ToDo(preset.title, preset.project, preset.dueDate, preset.priority, false, preset.description, preset.checklist);
        console.log(`Adding from the preset:`);
        console.log(preset);
        console.log(`new todo object to storage:`)
        console.log(todo);
        list.addTodo(todo);
    const div = createElement(todo, list);
    document.getElementById('content').appendChild(div);
    console.log('current storage:')
    console.log(list);
}

export function promptNewProject(list){
    if(document.getElementById('createNew')!== null){
        document.getElementById('createNew').remove();
        }
        const form = document.createElement('form');
        form.id = 'createNew';
        form.action="javascript:void(0);"
    
    const titleLabel = createLabelWithElement('title', 'Title:', 'input', 'text');
    titleLabel.lastChild.setAttribute('minlength', 1);
    titleLabel.lastChild.required = true;
    
    const includeTodo = createLabelWithElement('todos', 'Select todos to include in project?:', 'select');
    list.array.forEach((element, index) => {
        const option = document.createElement('option');
        option.innerText = element.title;
        option.value = index;
        includeTodo.lastChild.appendChild(option);
    });

    includeTodo.lastChild.setAttribute('multiple', 'true');
    form.appendChild(titleLabel);
    form.appendChild(includeTodo);

    const button = document.createElement('button');
    button.innerText = 'Create';
    button.type = 'submit';
    button.addEventListener('click', (e) => {
        e.preventDefault();
        if(form.checkValidity() === true){
            const formData = new FormData(form);
            const indexes = formData.getAll('todos');
            const title = formData.get('title')
            list.addProject(title);
                indexes.forEach(index => {
                    list.array[index].project = title;
                    console.log(list.array[index]);
                } );
              
            form.remove();
            populate(list, document.getElementById('content'));
        } else {
        form.reportValidity();
        }
    });

    form.appendChild(button);


    const removeButton = document.createElement('button');
    removeButton.innerText = 'Cancel';
    removeButton.type = 'button'
    removeButton.addEventListener('click', () => {
            form.remove();
    });
    form.appendChild(removeButton);

    document.getElementById('content').appendChild(form);

}


export function promptNew(list){
    if(document.getElementById('createNew')!== null){
    document.getElementById('createNew').remove();
    }
    const form = document.createElement('form');
    form.id = 'createNew';
    form.action="javascript:void(0);"
    

    const titleLabel = createLabelWithElement('title', 'Title:', 'input', 'text');
    titleLabel.lastChild.setAttribute('minlength', 1);
    titleLabel.lastChild.required = true;

    const priority = createLabelWithElement('priority', 'Prioritized?', 'input', 'checkbox');

    
    const dueDateLabel = createLabelWithElement('dueDate', 'Due to:', 'input', 'date');
    dueDateLabel.lastChild.defaultValue = format(new Date(), 'yyyy-MM-dd');
    
    const descriptionLabel = createLabelWithElement('description', 'Task description:', 'input', 'text');
    
    const project = createLabelWithElement('project', 'Project:', 'select')
    list.projects.forEach(element => {
    const option = document.createElement('option');
    option.innerText = element;
    project.lastChild.appendChild(option);
        });
    
    const addChecklistLabel = createLabelWithElement('addChecklist', 'Add checklist?','input', 'checkbox');
    
    addChecklistLabel.addEventListener('input', (e) => {
        if(e.target.checked === true){
            form.appendChild(checklistAdder());
        } else {
            if(document.getElementById('checklistAdder')){
                document.getElementById('checklistAdder').remove();
            };
        };
    });

    form.appendChild(titleLabel);
    form.appendChild(priority);
    form.appendChild(project);
    form.appendChild(dueDateLabel);
    form.appendChild(descriptionLabel);
    form.appendChild(addChecklistLabel);

    const button = document.createElement('button');
    button.innerText = 'Create';
    button.type = 'submit';
    button.addEventListener('click', (e) => {
        e.preventDefault();
        if(form.checkValidity() === true){
            const preset = parseForm(form);
            addNewElement(preset);
            form.remove()
            populate(list, document.getElementById('content'));
        } else {
        form.reportValidity();
        }
    });

    form.appendChild(button);

    const removeButton = document.createElement('button');
    removeButton.innerText = 'Cancel';
    removeButton.type = 'button'
    removeButton.addEventListener('click', () => {
            form.remove();
    });
    form.appendChild(removeButton);
    document.getElementById('content').appendChild(form);
}

function deleteProjectPrompt(project){
    const div = document.createElement('div');
    const p = document.createElement('p');
    p.innerText = "Do you want to delete project with all todos in it?\n Or do you want to remove only project and leave todos untouched?";
    const deleteAll = document.createElement('button');
    deleteAll.innerText = 'Delete all';
    const deleteProject = document.createElement('button');
    deleteProject.innerText = 'Delete project only';
    const cancel = document.createElement('button');
    cancel.innerText = 'Cancel';

    deleteAll.addEventListener('click', () => removeProject(project, true));
    deleteProject.addEventListener('click', () => removeProject(project, false));
    cancel.addEventListener('click', () => { div.remove() });

    div.appendChild(p);
    div.appendChild(deleteAll);
    div.appendChild(deleteProject);
    div.appendChild(cancel);
    document.getElementById('content').appendChild(div);
}

function removeProject(project, isFullDeletion){
    list.removeProject(project);
    if(isFullDeletion){
        list.array.forEach(todo =>{
            if(todo.project === project){
            list.deleteTodo(todo);
            }
        });
    } else {
        list.array.forEach(todo =>{
            if(todo.project === project){
            todo.project = 'none';
            }
        });
    }
    
    populate(list, document.getElementById('content'));
}