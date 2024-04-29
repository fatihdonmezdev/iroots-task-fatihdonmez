import { useState, useEffect } from "react";

const index = () => {
  const [forms, setForms] = useState([]);
  useEffect(() => {
    const forms = localStorage.getItem("forms");
    if (forms) {
      setForms(JSON.parse(forms));
    }
  }, []);
  return (
    <div className="ml-80 mt-40 relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Form name
            </th>
            <th scope="col" className="px-6 py-3">
              Fields
            </th>
            <th scope="col" className="px-6 py-3">
              Field Types
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {forms.map((form) => (
            <tr
              key={form.id}
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {form.name}
              </th>
              <td className="px-6 uppercase py-4">
                {form.fields.map((field) => (
                  <span key={field.id} className="mr-2">
                    {field.label}
                  </span>
                ))}
              </td>
              <td className="px-6 uppercase py-4">
                {form.fields.map((field) => (
                  <span key={field.id} className="mr-2">
                    {field.type}
                  </span>
                ))}
              </td>

              <td className="px-6 flex gap-4 py-4">
                <a href={`/list-forms/${form.name}`}>
                  <button
                    type="button"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    const newForms = forms.filter((f) => f.id !== form.id);
                    setForms(newForms);
                    localStorage.setItem("forms", JSON.stringify(newForms));
                  }}
                  className="font-medium text-red-600 dark:text-red-500 hover:underline"
                >
                  Delete
                </button>
                <a href={`fill-form/${form.name}`}>
                  <button
                    type="button"
                    className="font-medium text-green-600 dark:text-green-500 hover:underline"
                  >
                    Fill the form
                  </button>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default index;
