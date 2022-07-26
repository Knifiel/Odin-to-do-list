export class Project{
    #title;
    #priority;
    #isDone;
    #memoTasks;
    #tasks;
    constructor(title = 'Default', priority=false){
        if (title === ''){
            throw 'Title can not be empty';
        }
        this.#title = title;
        this.#priority = priority;
        this.#isDone = false;
        this.#memoTasks = [];
        this.#tasks = [];
    }

    set title(str){
        if (str === ''){
        throw 'Title can not be empty';
    }
    this.#title=str;
    }

    set priority(bool){
        if(!typeof bool === 'boolean'){
            throw 'Priority must be boolean'
        }       
        this.#priority = bool;
    }
    set isDone(bool){
        if(!typeof bool === 'boolean'){
            throw 'isDone must be boolean'
        } 
        this.#isDone = bool;      
    }
    
    get title(){
        return this.#title;
    }
    get priority(){
        return this.#priority;
    }
    get isDone(){
        return this.#isDone;
    }
    
    get tasks(){
        return this.#tasks;
    }
    get memoedTasks(){
        return this.#memoTasks;
    }
    
    add(obj, index, ...rest){
        if (rest.length>0){
            this.#tasks[index].add(obj, ...rest);
        } else if(index = ''){
            this.#tasks.push(obj);
        }else {
            this.#tasks.splice(index, 0, obj);
        }
    }
    delete(index, ...rest){
        if (rest.length>0){
            this.#tasks[index].delete(...rest);
        } else {
            this.#memoTasks = [...this.#tasks];
            this.#tasks.splice(index, 1);
        }
    }
    restore(...args){
        if (args.length>0){
            this.#tasks[index].restore(...args);
        } else {
            this.#tasks = [...this.#memoTasks];
        }
    }
}