import React from "react";

const FormFieldComponent = ({
  handleFieldChange,
  field,
  index,
  removeField,
}) => {
  return (
    <div className="flex-col justify-center items-center">
      <div className="flex gap-5 p-2.5">
        <input
          type="text"
          className="flex-grow p-2 border rounded"
          placeholder="Label"
          value={field.label}
          onChange={(e) =>
            handleFieldChange(
              index,
              "label",
              e.target.value
            )
          }
        />
        <select
          className="block  p-2 bg-white border rounded"
          value={field.type}
          onChange={(e) =>
            handleFieldChange(
              index,
              "type",
              e.target.value
            )
          }
        >
          <option value="text">Text</option>
          <option value="number">Number</option>
          <option value="select">Select</option>
        </select>
        <button
          className="flex items-center justify-center p-2 bg-red-500 text-white rounded hover:bg-red-700"
          onClick={() => removeField(index)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default FormFieldComponent;
