import { makeMainMenu } from "./interface.mjs";
import { populate } from "./elementCreation.mjs";
import { ToDo, toDoList} from "./todo-storage.mjs";
import css from "./style.css";

export const list = new toDoList();

(() => {
    const t1 = new ToDo('Hello And Welcome!');
    t1.description = 'Please feel free to change everything';
    t1.project = 'Lazying around';
    list.addTodo(t1);
    t1.checklist = [{ text: 'This is checklist', isDone: false }, { text: 'Use it however you want', isDone: true }];
    const t2 = new ToDo('testTodo');
    t2.project = 'Test';
    list.addTodo(t2);
    const t3 = new ToDo('testToDo2');
    t3.project = 'Test 2';
    list.addProject('none');
    list.generateProjects();
})();

console.log(list);
makeMainMenu();
populate(list, document.getElementById('content'));