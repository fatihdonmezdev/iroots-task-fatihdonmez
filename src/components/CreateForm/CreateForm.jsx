import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const FormFieldComponent = ({
  handleFieldChange,
  field,
  index,
  removeField,
  fieldTypeSelect,
}) => {
  const [forms, setForms] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [options, setOptions] = useState([]);
  const router = useRouter();
  const { formname } = router.query;

  useEffect(() => {
    const forms = localStorage.getItem("forms");
    if (forms) {
      const parsedForms = JSON.parse(forms);
      setForms(parsedForms);
      const form = parsedForms.find((form) => form.name === formname);
      if (form) {
        const localField = form.fields.find(
          (fieldz) => fieldz.label === field.label
        );
        if (localField && localField.options) {
          setOptions(localField.options);
        }
      }
    }
  }, [formname]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const addOption = () => {
    setOptions([...options, ""]);
  };
  const handleOptionChange = (e, option) => {
    const updatedOptions = options.map((optionItem) => {
      if (optionItem === option) {
        return e.target.value;
      }
      return optionItem;
    });
    setOptions(updatedOptions);
  };
  const removeOption = (option) => {
    const filteredOptions = options.filter((optionItem) => {
      return optionItem !== option;
    });
    setOptions(filteredOptions);
  };
  const saveOptions = () => {
    const updatedForms = forms.map((form) => {
      if (form.name === formname) {
        const updatedFields = form.fields.map((thisField) => {
          if (thisField.type === "select" && thisField.label === field.label) {
            return { ...thisField, options: options };
          }
          return thisField;
        });
        return { ...form, fields: updatedFields };
      }
      return form;
    });
    setShowModal(!showModal);
    setForms(updatedForms);
    localStorage.setItem("forms", JSON.stringify(updatedForms));
    console.log("Options updated and saved to localStorage.");
  };
  return (
    <div className="flex-col justify-center items-center">
      <div className="flex gap-5 p-2.5">
        <input
          type="text"
          className="flex-grow p-2 border rounded"
          placeholder="Label"
          value={field.label}
          onChange={(e) => handleFieldChange(index, "label", e.target.value)}
        />
        <select
          className="block  p-2 bg-white border rounded"
          value={field.type}
          onChange={(e) => handleFieldChange(index, "type", e.target.value)}
        >
          <option value="text">Text</option>
          <option value="number">Number</option>
          <option value="select">Select</option>
        </select>
        <button
          className="flex items-center justify-center p-2 bg-red-500 text-white rounded hover:bg-red-700"
          onClick={() => removeField(index)}
        >
          Delete Field
        </button>
        {formname && fieldTypeSelect && (
          <>
            <button
              className="flex items-center justify-center p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              onClick={toggleModal}
            >
              Add Option
            </button>
          </>
        )}
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-8 rounded-md">
            <h2 className="text-lg font-semibold mb-4">Add Options</h2>
            {options.map((option, optionIndex) => (
              <div key={optionIndex} className="mb-2">
                <input
                  type="text"
                  className="border rounded-md p-2 w-full"
                  value={option}
                  onChange={(e) => {
                    handleOptionChange(e, option);
                  }}
                />
                <button
                  className="bg-red-500 text-white p-2 rounded-md ml-2"
                  onClick={() => removeOption(option)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              className="bg-green-500 text-white p-2 rounded-md"
              onClick={addOption}
            >
              Add Another Option
            </button>
            <div className="flex justify-end mt-4">
              <button
                className="bg-blue-500 text-white p-2 rounded-md mr-2"
                onClick={saveOptions}
              >
                Save Options
              </button>
              <button
                className="bg-gray-300 p-2 rounded-md"
                onClick={toggleModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormFieldComponent;
