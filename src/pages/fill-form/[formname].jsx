import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const FormName = () => {
  const [forms, setForms] = useState([]);
  const router = useRouter();
  const formname = router.query.formname;
  useEffect(() => {
    const forms = localStorage.getItem("forms");
    if (forms) {
      const parsedForms = JSON.parse(forms);
      console.log(parsedForms);
      const currentForm = parsedForms.filter((form) => form.name === formname);
      setForms(currentForm[0]);
    }
  }, [formname]);
  console.log(forms);
  return (
    <div>
      <div className="mt-40 mx-80 border px-8 rounded-xl py-8">
        <h1 className="text-center mb-10 text-4xl font-semibold text-gray-900">
          {forms?.name}
        </h1>
        <form className="flex flex-col justify-center">
          {forms?.fields?.map((field) => (
            <div key={field?.name} className="mb-5 flex items-center ">
              {field?.type === "select" ? (
                <>
                  <label className="min-w-32" for={field.label}>
                    {field.label}:
                  </label>
                  <select
                    name={field.label}
                    id={field.label}
                    className="border px-4 py-4 w-32"
                  >
                    {field?.options?.map((option) => (
                      <option value={option}>{option}</option>
                    ))}
                  </select>
                </>
              ) : (
                <>
                  <label
                    htmlFor={field?.label}
                    className="block min-w-32 mb-2  text-gray-900 "
                  >
                    {field?.label}:
                  </label>
                  <input
                    type={field?.type}
                    placeholder={field?.label}
                    id={field?.type}
                    className="bg-gray-50 max-w-64 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    required
                  />
                </>
              )}
            </div>
          ))}
          <button className="border px-8 w-32 py-4 bg-green-500" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormName;
