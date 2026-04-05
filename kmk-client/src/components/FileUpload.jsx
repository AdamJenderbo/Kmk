import { useRef } from "react";
import Button from "./Button";

export default function FileUpload({ onChange }) {
  const fileRef = useRef(null);

  return (
    <>
      <input
        type="file"
        name="img"
        onChange={onChange}
        ref={fileRef}
        style={{ display: "none" }}
      />

      <Button type="button" onClick={() => fileRef.current.click()}>
        Ladda upp
      </Button>
    </>
  );
}