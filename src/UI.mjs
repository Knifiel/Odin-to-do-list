import { parse } from "date-fns";

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
sidebarHeader.innerText = "Projects";
sidebar.appendChild(sidebarHeader);

app.appendChild(header);
app.appendChild(sidebar);
app.appendChild(content);


document.body.appendChild(app);

function liForAddTask(){
    const li = document.createElement('li');
    li.classList.add('openTaskForm');

    const plusSign = document.createElement('div');
    plusSign.textContent = "+";
    plusSign.classList.add('sign');
    
    const span = document.createElement('span');
    span.textContent =  `Add new task`;

    li.appendChild(plusSign);
    li.appendChild(span);

    return li;
}

function formToCreateTask(){
    const form = document.createElement('form');
    form.action = 'javascript:void(0)';

    const textTitle = document.createElement('input');
    textTitle.id = 'addTitle';
    textTitle.name = 'title';
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
    dueToDate.name = 'DueToDate';
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
    buttonAdd.id = 'formAdd'
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

    form.appendChild(buttonAdd);
    form.appendChild(buttonCancel);

    return form;
}

function createListFromProp(arr, ...args){
    if(arr instanceof Array === false){
        console.error(arr);
        throw 'passed argument is not an array';
    }
    console.log(args);
    const ul = document.createElement('ul');
    arr.forEach((element, index) => {
        const li = document.createElement('li');
        li.dataset.index = index;
        args.forEach(arg => {
            const span = document.createElement('span');
            span.innerText = element[arg];
            li.appendChild(span);
        });
        ul.appendChild(li);
    });
    return ul;
}

function createTaskDiv(title, description, dueToDate, priority){
    const div = document.createElement('div');
    div.classList.add('taskOpen');

    const titleText = document.createElement('h4');
    titleText.innerText = title;

    const descriptionText = document.createElement('p');
    descriptionText.innerText = description;

    const dueToDateText = document.createElement('p');
    dueToDateText = parse(dueToDate, 'dd-MM-yyyy', new Date());

    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.checked = priority;
    checkbox.disabled = true;

    div.appendChild(titleText);
    div.appendChild(descriptionText);
    div.appendChild(dueToDateText);
    div.appendChild(checkbox);

    return div;
}

export const ui = {
    liForAddTask: () => liForAddTask(),
    formToCreateTask: () => formToCreateTask(),
    createListFromProp: (array, ...prop) => createListFromProp(array, ...prop),
    createTaskDiv: (title, description, dueToDate, priority) => createTaskDiv(title, description, dueToDate, priority),

    header: header,
    sidebar: sidebar,
    content: content,
}