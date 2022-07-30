import { makeMainMenu } from "./interface.mjs";
import { populate } from "./elementCreation.mjs";
import { ToDo, toDoList} from "./todo-storage.mjs";

export const list = new toDoList();

(() => {
    const defaultTask = new ToDo('Hello And Welcome!');
    defaultTask.description = 'Please feel free to change everything';

    list.addTodo(defaultTask);

    defaultTask.checklist = [{ text: 'This is checklist', isDone: false }, { text: 'Use it however you want', isDone: true }];
})();

console.log(list);
makeMainMenu();
populate(list, document.getElementById('content'));