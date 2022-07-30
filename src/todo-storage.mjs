import { parse, isValid, format, eachDayOfInterval } from 'date-fns';

export class toDoList{
#array;
#projects;    
constructor(array=[], projects=new Set()){
    array.forEach(element => {
        if(element instanceof ToDo !== true){
            console.log('false')
            throw 'array members can only be instances of ToDo';
        }
    });
    this.#array = _.sortBy(array, ['project', 'dueDate']);
    this.#projects = projects;
}

/**
     * @param {any[]} arr
     */
set array(arr){
    this.#array = arr;
}
get array(){
    return this.#array;
}
get projects(){
    return this.#projects;
}

addProject(project){
    this.#projects.add(project);
}

addTodo(todo){
    if(index === undefined){
        this.#array.push(todo);
        this.#array = _.sortBy(this.#array, ['project', 'dueDate']);
    } 
}

deleteTodo(todo){
    this.#array.splice(this.#array.indexOf(todo), 1);
}
}
export class ToDo{
    #title;
    #project;
    #dueDate;
    #priority;
    #isDone;
    #description;
    #checklist;


    constructor(title='New Task', project='', dueDate=format(new Date(), 'yyyy-MM-dd'), priority=false, isDone=false, description = "", checklist = []){
    
        if (title === ''){
            throw 'Title can not be empty';
        }
        if(!isValid(parse(dueDate, 'yyyy-MM-dd', new Date()))){
            throw 'Date format is invalid';
        }
        if(!typeof priority === 'boolean'){
            throw 'Priority must be boolean'
        }
        if(!typeof isDone === 'boolean'){
            throw 'isDone must be boolean'
        }
        if(!typeof description === 'string'){
            throw 'Can only use strings for description'
        }
        if(!Array.isArray(checklist)){
            throw 'Only arrays may be used in checklists'
        }

    this.#title=title;
    this.#project='';
    this.#dueDate=dueDate;
    this.#priority=priority;
    this.#isDone=isDone;
    this.#description=description;
    this.#checklist=checklist;
    }
    /**
     * @param {string} title
     */
    set title(str){
        if (str === ''){
        throw 'Title can not be empty';
    }
    this.#title=str;
    }

    /**
     * @param {string} str
     */
    set project(str){
        this.#project = str;
    }

    /**
     * @param {string} date
     */
    set dueDate(date){
    if(!isValid(parse(date, 'yyyy-MM-dd', new Date()))){
        throw 'Date format is invalid';
        }
        this.#dueDate = parse(date, 'yyyy-MM-dd', new Date());
    }
    /**
     * @param {boolean} priority
     */
    set priority(bool){
        if(!typeof bool === 'boolean'){
            throw 'Priority must be boolean'
        }       
        this.#priority = bool;
    }
    /**
     * @param {boolean} isDone
     */
    set isDone(bool){
        if(!typeof bool === 'boolean'){
            throw 'isDone must be boolean'
        } 
        this.#isDone = bool;      
    }
    /**
     * @param {string} description
     */
    set description(str){
        if(!typeof str === 'string'){
            throw 'Can only use strings for description'
        } 
        this.#description = str;
    }
    /**
     * @param {any[]} checklist
     */
    set checklist(arr){
        if(!Array.isArray(arr)){
            throw 'Only arrays may be used in checklists'
        }
        this.#checklist = arr;
    }
    //getters for all values
    get title(){
        return this.#title;
    }
    get project(){
        return this.#project;
    }
    get dueDate(){
        return this.#dueDate;
    }
    get priority(){
        return this.#priority;
    }
    get description(){
        return this.#description;
    }
    get isDone(){
        return this.#isDone;
    }
    get checklist(){
        return this.#checklist;
    }
}
