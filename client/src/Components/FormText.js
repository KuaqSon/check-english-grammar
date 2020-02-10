import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { checkSentence } from "../Services/grammar";
import Loading from "./Loading";

export default function FormText({ callback }) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => {
    setLoading(true);
    checkSentence(data, onSubmitCallback);
  };

  const onSubmitCallback = data => {
    console.log("\nLog ->\n: FormText -> data", data);
    if (callback) callback(data);
    setLoading(false);
  };

  return (
    <form className="card pos-relative" onSubmit={handleSubmit(onSubmit)}>
      <h1>
        <span>Grammar</span> Check
      </h1>
      <textarea
        className="input-box"
        rows="8"
        name="text"
        placeholder="Type your sentence here..."
        ref={register({ required: true, maxLength: 50000 })}
      />

      <input className="btn" type="submit" value="check" />

      {loading && <Loading />}
    </form>
  );
}
