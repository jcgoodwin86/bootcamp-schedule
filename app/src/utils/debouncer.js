// This function is used to debounce the saving of completed modules to the database.
export default function debounce(func, delay) {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
}
