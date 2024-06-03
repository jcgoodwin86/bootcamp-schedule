export default function TextInput({ time, handleChange, children }) {
  return (
    <div>
      {children}
      <input type="text" onChange={handleChange} value={time} />
    </div>
  );
}
