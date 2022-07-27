import { deleteElement, Project, ToDo } from "./todo-storage.mjs";


(function makeMainMenu(){
    const app = document.createElement('div');
    app.id = 'app';
    
    const header = document.createElement('div');
    header.id = 'header';
    
    const createTask = document.createElement('button');
    createTask.classList.add('createButton');
    createTask.innerText = "Add new task";
    createTask.addEventListener('click', () => {
        promptNewTask();
    });

    const createProject = document.createElement('button');
    createProject.classList.add('createButton');
    createProject.innerText = "Create new project";
    createProject.addEventListener('click', () => {
        promptNewProject();
    });


    const content = document.createElement('div');
    content.id = 'content';

    header.appendChild(createTask);
    header.appendChild(createProject);

    app.appendChild(header);
    app.appendChild(content);
    document.body.appendChild(app);

})();


export function populate(obj, rootNode){
    if(obj instanceof Array){
    obj.forEach((element) => {        
        const div = createElement(element, obj);
        rootNode.appendChild(div);
    });
    } else {
        throw 'Populate only works with arrays'
    }
}

function createElement(element, obj){
    const div = document.createElement("div");
    const header = document.createElement('h3');
    header.textContent = element.title;
    header.contentEditable = true;
    header.addEventListener('input', (e) => changeContent(e.target, element, 'title'));
    div.appendChild(header);
    addButtons(div, element, obj);

    if(element instanceof Project){
        div.classList.add('project');
        if (element.tasks.length>0){
        populate(element.tasks, div);                 
        }
    }

    if(element instanceof ToDo){
        div.classList.add('todo');
        const description = document.createElement('p');
        description.textContent = element.description;
        description.classList.add('description');
        description.contentEditable = true;
        description.addEventListener('input', (e) => changeContent(e.target, element, 'description'));

        const dueDate = document.createElement('p');
        dueDate.classList.add('description');
        dueDate.textContent = element.dueDate;
        dueDate.contentEditable = true;
        dueDate.addEventListener('input', (e) => changeContent(e.target, element, 'dueDate'));

        div.appendChild(dueDate);
        div.appendChild(description);

        if(element.checklist.length>0){
        const checklist = createChecklist(element.checklist);
        div.appendChild(checklist);
        }
    }
    return div;
}

function createChecklist(arr){
    const ol = document.createElement('ol')
    ol.classList.add('checklist')
    arr.forEach(element => {
        const checkbox = makeCheckbox(element, 'isDone');
        const li = document.createElement('li');
        li.innerText = element.text;
        
        li.appendChild(checkbox);
        const remove = document.createElement('button');
        remove.innerText = "DELETE";
        remove.addEventListener('click', () => {li.remove(); deleteElement(element, arr)})
        li.appendChild(remove);
        ol.appendChild(li);
    });
    return ol;
}


function addButtons(div, obj, objContainer){
    const priority = makeCheckbox(obj, 'priority');
    const isDone = makeCheckbox(obj, 'isDone');

    const priorityLabel = document.createElement('label');
    priorityLabel.innerHTML = `Prioritized?`;
    priorityLabel.appendChild(priority);

    const remove = document.createElement('button');
    remove.innerText = "DELETE";
    div.appendChild(priorityLabel);
    div.appendChild(isDone);
    div.appendChild(remove);
    remove.addEventListener('click', () => {div.remove(); deleteElement(obj, objContainer)})
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
        console.log(element);
        element.classList.remove('invalid');
        if(element.innerText !== object[prop]){
            object[prop] = element.innerText;
        }
    } catch(error){
        element.classList.add('invalid');
    }
}