import FormFieldComponent from "@/components/CreateForm/CreateForm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FormCreate from "../create-form";

const FormPage = () => {
  const [form, setForm] = useState(null);
  const router = useRouter();
  const { formname } = router.query;

  useEffect(() => {
    const formsData =
      localStorage.getItem("forms");
    if (formsData) {
      const parsedForms = JSON.parse(formsData);
      const foundForm = parsedForms.find(
        (f) => f.name === formname
      );
      if (foundForm) {
        setForm(foundForm);
      } else {
        console.log("Form not found");
      }
    } else {
      console.log("No forms in local storage");
    }
  }, [formname]);

  if (!form) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <FormCreate editform={form} />
    </>
  );
};

export default FormPage;
