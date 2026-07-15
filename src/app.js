console.log('Server Starting...'); 
import {
    formatDate,
    validateTask,
    mergeTaskUpdate
} from "./utils.js";

console.log(formatDate(new Date("2026-07-22")));

console.log(validateTask());

console.log(
    validateTask({
        title: "Project",
        dueDate: "2026-07-22"
    })
);

const originalTask = {
    title: "Old",
    dueDate: "2026-07-22",
    status: "Pending",
};

const updatedTask = mergeTaskUpdate(
    originalTask,
    { title: "New" },
    { status: "Completed" }
);