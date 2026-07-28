export const formatDate = (date) => `Due: ${date.toLocaleDateString()}`;

export const validateTask = ({ title, dueDate } = {}) => !!(title && dueDate);

export const mergeTaskUpdate = (original, ...updates) => ({ ...original, ...updates.reduce((merged, update) => ({ ...merged, ...update}), {}) });

export class TaskValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "TaskValidationError";
  }
}

export const createTask = (taskData) => {
  if (!validateTask(taskData)) {
    throw new TaskValidationError("Invalid task data");
  }
  return { id: Date.now(), completed: false, ...taskData };
};