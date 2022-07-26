import { Project } from "./projects.mjs";
import { ToDo } from "./todo.mjs";

const mainProject = new Project('main');
const defaultProject = new Project('Hello!')
const defaultTask = new ToDo('And Welcome!');
mainProject.add(defaultProject);
defaultProject.add(defaultTask);
console.log(mainProject);
console.log(defaultProject);

