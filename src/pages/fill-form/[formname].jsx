import { useRouter } from "next/router";
import React from "react";

const FormName = () => {
  const router = useRouter();
  console.log(router.query.formname);
  return <div></div>;
};

export default FormName;
