import React, { useState } from "react";
import { useForm } from "react-hook-form";
import cogoToast from "cogo-toast";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { checkSentence } from "../Services/grammar";
import Loading from "./Loading";

export default function FormText({ callback }) {
  const [loading, setLoading] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [text, setText] = useState(false);
  const { register, handleSubmit } = useForm();
  const onSubmit = data => {
    setLoading(true);
    setIsCorrect(false);
    checkSentence(data, onSubmitCallback);
  };

  const onSubmitCallback = data => {
    console.log("\nLog ->\n: FormText -> data", data);
    if (data.length === 0) {
      setIsCorrect(true);
    }
    if (callback) callback(data);
    setLoading(false);
  };

  const handleTextChange = e => {
    setIsCorrect(false);
    setText(e.target.value);
  };

  return (
    <>
      <form className="card pos-relative" onSubmit={handleSubmit(onSubmit)}>
        <h1>
          <span>Grammar</span> Check
        </h1>
        <textarea
          onChange={e => handleTextChange(e)}
          className="input-box"
          rows="8"
          name="text"
          placeholder="Type your sentence here..."
          ref={register({ required: true, maxLength: 50000 })}
        />
        <div className="copy-action">
          <CopyToClipboard text={text} onCopy={() => cogoToast.success("Copied!")}>
            <input className="btn btn-sm" type="button" value="Copy" />
          </CopyToClipboard>
        </div>

        <input className="btn" type="submit" value="Check" />

        {loading && <Loading />}
      </form>
      {isCorrect && (
        <div className="card tw">
          <h6>Your sentence look fine now.</h6>
        </div>
      )}
    </>
  );
}
