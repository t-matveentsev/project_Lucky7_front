export default function DropdownField({ items, fieldName }) {
  return (
    <>
      {items.map(item => (
        <option key={item?._id} value={item[fieldName]}>
          {item[fieldName]}
        </option>
      ))}
    </>
  );
}
