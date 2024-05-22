// This component is a checkbox that is used to mark a module as completed or not completed
export default function Checkbox({ completed, onChange, id }) {
  return (
    <input
      onClick={(event) => event.stopPropagation()} // Prevent the module from opening when the checkbox is clicked
      onChange={() => onChange(id)}
      checked={completed}
      type="checkbox"
      name="test"
    />
  );
}
