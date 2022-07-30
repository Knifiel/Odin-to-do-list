import { makeMainMenu } from "./interface.mjs";
import { populate } from "./elementCreation.mjs";
import {Project, ToDo, toDoList} from "./todo-storage.mjs";


(function makeMainProjects(){
    const defaultProject = new Project('Hello!')
    const defaultTask = new ToDo('And Welcome!');
    defaultTask.description = 'Please feel free to change everything';


    toDoList.push(defaultProject);
    defaultProject.add(defaultTask, 0);

    const array = [{text: 'This is checklist', isDone:false}, {text:'Use it however you want',isDone:true}]
    defaultTask.checklist = array;
})();

console.log(toDoList);
makeMainMenu();
populate(toDoList, document.getElementById('content'));