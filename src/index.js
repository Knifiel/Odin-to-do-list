import css from "./style.css";
import {makeSidebar, renderTasks, enableSaving} from './logic.mjs';

makeSidebar();
renderTasks('Default');
enableSaving();
