console.log('Server Starting...'); 

import {
    formatDate,
    validateTask,
    mergeTaskUpdate,
    createTask,
    TaskValidationError
} from "./utils.js";
import { fetchSampleUsers } from "./api.js";

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

async function main() {
  try {
    const users = await fetchSampleUsers();
    console.log('Users:', users);

    const task = createTask({ title: 'Sample Task', dueDate: '2026-08-01' });
    console.log('Task:', task);
  } catch (error) {
    if (error instanceof TaskValidationError) {
      console.error('Validation error:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  }
}

main();