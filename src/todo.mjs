import { parse, isValid, format } from 'date-fns';

export class ToDo{
    #title;
    #dueDate;
    #priority;
    #isDone;
    #description;
    #checklist;

    constructor(title='New Task', dueDate=format(new Date(), 'P'), priority=false, isDone=false, description = "", checklist = []){
    
        if (title === ''){
            throw 'Title can not be empty';
        }
        if(!isValid(parse(dueDate, 'P', new Date()))){
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
     * @param {string} date
     */
    set dueDate(date){
    if(!isValid(parse(date, 'P', new Date()))){
        throw 'Date format is invalid';
    }
        this.#dueDate = date;
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

