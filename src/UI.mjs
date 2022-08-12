import { format } from "date-fns";

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

    const plusSign = makeImg('Add');
    
    const span = document.createElement('span');
    span.textContent =  `Add new task`;

    li.appendChild(plusSign);
    li.appendChild(span);

    return li;
}

function makeImg(altText){
    const img = document.createElement('img');
    img.alt = altText;
    img.addEventListener('click', (e) => {
        e.stopPropagation();
    }, false);
    return img;
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
    buttonAdd.innerText = 'Confirm';
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

    form.childNodes.forEach(node => node.addEventListener('click', (e) => e.stopPropagation()));

    return form;
}

function createListFromProp(arr, ...args){
    if(arr instanceof Array === false){
        throw 'passed argument is not an array';
    }

    const ul = document.createElement('ul');
    
    arr.forEach((element, index) => {
        const li = makeLiFromProps(element, ...args);
        li.dataset.index = index;
        ul.appendChild(li);
    });
    return ul;
}

function makeLiFromProps(element, ...args){
    const li = document.createElement('li');
        const sign = makeImg('done/not done');
        sign.classList.add('mark');
        li.appendChild(sign);
        args.forEach(arg => {
            const span = document.createElement('span');
            span.innerText = element[arg];
            span.classList.add(arg);
            li.appendChild(span);
        });
        const deleteBtn = makeImg('delete');
        deleteBtn.classList.add('delete');
        li.appendChild(deleteBtn);
        li.childNodes.forEach(node => node.addEventListener('click', (e) => {
            if(li.classList.contains('taskExpanded')){
                e.stopPropagation();
            }
        }));
    return li;
}

function expandTaskDiv(div, description){
    const descriptionText = document.createElement('p');
    descriptionText.innerText = description;
    descriptionText.addEventListener('click', (e) => {e.stopPropagation()})
    descriptionText.classList.add('description');
    
    const editButton = makeImg('Edit');
    editButton.classList.add('editButton');
    
    const changeProject = makeImg('changeProject');
    changeProject.classList.add('changeProject');

    div.classList.add('taskExpanded');
    div.appendChild(descriptionText);
    div.appendChild(editButton);
    div.appendChild(changeProject);
}

function collapseTaskDiv(div){
    const elementsToRemove = div.querySelectorAll('.description, .editButton, .changeProject');
    elementsToRemove.forEach(element => {element.remove()});
    div.classList.remove('taskExpanded');
}

async function editDiv(div){
    div.classList.remove('taskExpanded');
    div.classList.add('editActive');
    const title = div.querySelector('.title').textContent;
    const description = div.querySelector('.description').textContent;
    const dueToDate = div.querySelector('.dueToDate').textContent;
    const isPrioritized = div.hasAttribute('prioritytask');
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
    const form = formToCreateTask();
    form.querySelector('#addTitle').value = title;
    form.querySelector('#addDescription').value = description;
    form.querySelector('#addDueDate').value = dueToDate;
    form.querySelector('#addPriority').checked = isPrioritized;
    div.appendChild(form);
}

export const ui = {
    liForAddTask: () => liForAddTask(),
    formToCreateTask: () => formToCreateTask(),
    createListFromProp: (array, ...prop) => createListFromProp(array, ...prop),
    expandTaskDiv: (div, description) => expandTaskDiv(div, description),
    collapseTaskDiv: (div) => collapseTaskDiv(div),
    makeLiFromProps: (todo, ...props) => makeLiFromProps(todo, ...props),
    editDiv: (div) => editDiv(div),
    makeImg: (text) => makeImg(text),

    header: header,
    sidebar: sidebar,
    content: content,
}