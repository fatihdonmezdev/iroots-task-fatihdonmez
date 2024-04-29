import React, { useState } from "react";
import FormFieldComponent from "@/components/CreateForm/CreateForm";
import Toast from "@/components/Toast/Toast";

function FormCreate() {
  const [fields, setFields] = useState([]);
  const [snackbar, setSnackbar] = useState(false);
  const [form, setForm] = useState({
    name: "",
    fields: [],
  });

  const addField = () => {
    const newField = {
      id: fields.length + 1,
      label: "",
      type: "text",
    };

    setFields([...fields, newField]);
  };

  const saveForm = () => {
    const hasSelectWithoutOptions = fields.some(
      (field) => field.type === "select"
    );
    if (hasSelectWithoutOptions) {
      fields.forEach((field) => {
        if (field.type === "select") {
          if (!field.options) {
            field.options = [];
          }
        }
      });
      setSnackbar(true);
    }
    const newForm = {
      id: new Date().getTime(),
      name: form.name,
      fields: fields,
    };

    const currentFormsJson =
      localStorage.getItem("form");
    const currentForms = currentFormsJson
      ? JSON.parse(currentFormsJson)
      : [];

    const existingForm = currentForms.find(
      (localForm) =>
        localForm.name === newForm.name
    );

    if (existingForm) {
      existingForm.fields = newForm.fields;
    } else {
      currentForms.push(newForm);
    }

    localStorage.setItem(
      "form",
      JSON.stringify(currentForms)
    );
  };

  const handleFieldChange = (
    index,
    key,
    value
  ) => {
    const newFields = [...fields];
    newFields[index][key] = value;
    setFields(newFields);
  };

  const removeField = (index) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  return (
    <div className="flex relative flex-col items-center justify-center h-screen">
      <div className="w-1/2 flex flex-col gap-5 border border-gray-300 p-12 rounded-lg">
        <div className="flex items-center justify-center mb-4">
          <label className="mr-2">
            Form Name:
          </label>
          <input
            type="text"
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            className="p-2 border text-center w-64 rounded"
            placeholder="Form Name"
          />
        </div>
        {fields.map((field, index) => (
          <FormFieldComponent
            key={field.id}
            field={field}
            index={index}
            handleFieldChange={handleFieldChange}
            removeField={() => removeField(index)}
          />
        ))}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={addField}
        >
          Add Field
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 flex justify-center items-center rounded"
          onClick={saveForm}
        >
          Save the Form
        </button>
      </div>
      <Toast
        snackbar={snackbar}
        setSnackbar={setSnackbar}
      />
    </div>
  );
}

export default FormCreate;
