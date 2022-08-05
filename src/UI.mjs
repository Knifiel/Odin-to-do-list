import { format, parse } from "date-fns";

const app = document.createElement('div');
app.id = 'app';

const header = document.createElement('div');
header.id = 'header';
const headerText = document.createElement('h1');
headerText.innerText = 'ToDo';
header.appendChild(headerText);

const content = document.createElement('div');
content.id = 'content';


const sidebar = document.createElement('div');
sidebar.id = 'sidebar';
const sidebarHeader = document.createElement('h2');
sidebarHeader.innerText = "Projects:";
sidebar.appendChild(sidebarHeader);

app.appendChild(header);
app.appendChild(sidebar);
app.appendChild(content);


document.body.appendChild(app);

function liForAddTask(){
    const li = document.createElement('li');
    li.classList.add('openTaskForm');

    const plusSign = makeSign('+');
    
    const span = document.createElement('span');
    span.textContent =  `Add new task`;

    li.appendChild(plusSign);
    li.appendChild(span);

    return li;
}

function makeSign(signText){
    const sign = document.createElement('div');
    sign.textContent = signText;
    sign.classList.add('sign');
    sign.addEventListener('click', (e) => {
        e.stopPropagation();
    }, false);
    return sign;
}

function formToCreateTask(){
    const form = document.createElement('form');
    form.action = 'javascript:void(0)';
    form.id = 'form';

    const textTitle = document.createElement('input');
    textTitle.id = 'addTitle';
    textTitle.name = 'title';
    textTitle.required = true;
    textTitle.minLength = 1;

    const textTitleLabel = document.createElement('label');
    textTitleLabel.innerText = 'Title';
    textTitleLabel.setAttribute('for', 'addTitle');

    const textAreaDescription = document.createElement('textarea');
    textAreaDescription.id = "addDescription";
    textAreaDescription.name = "description";
    textAreaDescription.setAttribute('rows', '5');


    const textAreaDescriptionLabel = document.createElement('label');
    textAreaDescriptionLabel.innerText = 'Description';
    textAreaDescriptionLabel.setAttribute('for', 'addDescription');

    const dueToDate = document.createElement('input');
    dueToDate.setAttribute('type', 'date');
    dueToDate.id = 'addDueDate';
    dueToDate.name = 'dueToDate';
    dueToDate.value = format(new Date(), 'yyyy-MM-dd');
    const dueToDateLabel = document.createElement('label');
    dueToDateLabel.innerText = 'Due to:'
    dueToDateLabel.setAttribute('for', 'addDueDate');

    const checkbox = document.createElement('input');
    checkbox.id = 'addPriority';
    checkbox.name = 'priority';
    checkbox.setAttribute('type', 'checkbox');
    const checkboxLabel = document.createElement('label');
    checkboxLabel.innerText = 'Priority task?'
    checkboxLabel.setAttribute('for', 'addPriority');

    const buttonAdd = document.createElement('button');
    buttonAdd.innerText = 'Add';
    buttonAdd.id = 'formAdd';
    buttonAdd.type = 'submit';
    const buttonCancel = document.createElement('button');
    buttonCancel.innerText = 'Cancel';
    buttonCancel.id = 'formCancel';

    form.appendChild(textTitleLabel);
    form.appendChild(textTitle);

    form.appendChild(textAreaDescriptionLabel);
    form.appendChild(textAreaDescription);

    form.appendChild(dueToDateLabel);
    form.appendChild(dueToDate);

    form.appendChild(checkboxLabel);
    form.appendChild(checkbox);

    form.appendChild(buttonCancel);
    form.appendChild(buttonAdd);

    return form;
}

function createListFromProp(arr, ...args){
    if(arr instanceof Array === false){
        console.error(arr);
        throw 'passed argument is not an array';
    }

    const ul = document.createElement('ul');
    
    
    arr.forEach((element, index) => {
        const li = document.createElement('li');
        const sign = makeSign(' ');
        li.dataset.index = index;
        li.appendChild(sign);
        args.forEach(arg => {
            const span = document.createElement('span');
            span.innerText = element[arg];
            span.classList.add(arg);
            li.appendChild(span);
        });
        ul.appendChild(li);
    });
    return ul;
}

function expandTaskDiv(div, description, priority){
    const descriptionText = document.createElement('p');
    descriptionText.innerText = description;
    descriptionText.classList.add('description');
    
    const editButton = document.createElement('img');
    editButton.classList.add('editButton');
    editButton.textContent = 'Edit';
    
    const collapseButton = document.createElement('img');
    collapseButton.classList.add('collapseButton');
    collapseButton.textContent = 'Collapse';

    
    div.classList.add('taskExpanded');
    div.appendChild(descriptionText);
    div.appendChild(editButton);
    div.appendChild(collapseButton);
}

export const ui = {
    liForAddTask: () => liForAddTask(),
    formToCreateTask: () => formToCreateTask(),
    createListFromProp: (array, ...prop) => createListFromProp(array, ...prop),
    expandTaskDiv: (div, description, priority) => expandTaskDiv(div, description, priority),

    header: header,
    sidebar: sidebar,
    content: content,
}