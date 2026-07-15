export const formatDate = (date) => `Due: ${date.toLocaleDateString()}`;

export const validateTask = ({ title, dueDate } = {}) => !!(title && dueDate);

export const mergeTaskUpdate = (original, ...updates) => ({ ...original, ...updates.reduce((merged, update) => ({ ...merged, ...update}), {}) });