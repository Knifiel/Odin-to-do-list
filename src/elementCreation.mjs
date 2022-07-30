import { deleteElement, Project, ToDo, toDoList } from "./todo-storage.mjs";
import { format } from 'date-fns';
import { parseForm } from "./formParser.mjs";

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
    
    makeEditable(header, element, 'title');
    
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
        makeEditable(description, element, 'description');

        const dueDate = document.createElement('input');
        dueDate.setAttribute('type', 'date');
        dueDate.classList.add('dueDate');
        dueDate.defaultValue = element.dueDate;
        console.log(element.dueDate);
        dueDate.addEventListener('input', () => {
            if(element.dueDate !== dueDate.value){
                element.dueDate = dueDate.value;
            } 
        })

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
        makeEditable(li, element, 'text');

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

export function promptNew(type){
    if(document.getElementById('createNew')!== null){
    document.getElementById('createNew').remove();
    }
    const form = document.createElement('form');
    form.id = 'createNew';
    form.dataset.type = type;
    form.action="javascript:void(0);"
    form.method = 'get';

    const titleLabel = createLabelWithInput('title', 'Title:', 'text');
    titleLabel.lastChild.setAttribute('minlength', 1);
    titleLabel.lastChild.required = true;

    const priority = createLabelWithInput('priority', 'Prioritized?', 'checkbox');

    form.appendChild(titleLabel);
    form.appendChild(priority);
    if(type === 'task'){
        const dueDateLabel = createLabelWithInput('dueDate', 'Due to:', 'date');
        dueDateLabel.lastChild.defaultValue = format(new Date(), 'yyyy-MM-dd');

        const descriptionLabel = createLabelWithInput('description', 'Task description:', 'text');


        const addChecklistLabel = createLabelWithInput('addChecklist', 'Add checklist?','checkbox');
        addChecklistLabel.addEventListener('input', (e) => {
            if(e.target.checked === true){
                form.appendChild(checklistAdder());
            } else {
                if(document.getElementById('checklistAdder')){
                    document.getElementById('checklistAdder').remove();
                };
            }
            });
        form.appendChild(dueDateLabel);
        form.appendChild(descriptionLabel);
        form.appendChild(addChecklistLabel);
        }

    const button = document.createElement('button');
    button.innerText = 'Create';
    button.type = 'submit';
    button.addEventListener('click', (e) => {
        e.preventDefault();
        if(form.checkValidity() === true){
            const preset = parseForm(form);
            addNewElement(preset);
            form.remove();
        } else {
        form.reportValidity();
        }
    });

    form.appendChild(button);
    document.getElementById('content').appendChild(form);
}

function createLabelWithInput(id, innerText, type){
    const input = document.createElement('input');
    input.id = id;
    input.setAttribute('type', type);
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
    if(preset.type === 'project'){
        const proj = new Project(preset.title, preset.priority);
        console.log(`adding new project object to storage`);
        console.log(proj);
        toDoList.push(proj);
    } else if (preset.type === 'task'){
        const task = new ToDo(preset.title, preset.dueDate, preset.priority, false, preset.description, preset.checklist);
        console.log(`adding new todo object to storage:`);
        console.log(task);
        toDoList.push(task);
    }
    const div = createElement(toDoList[toDoList.length-1], toDoList);
    document.getElementById('content').appendChild(div);
    console.log('current storage:')
    console.table(toDoList);
}