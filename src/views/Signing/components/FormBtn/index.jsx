function FormBtn({ text, isDisabled = false }) {
  return (
    <div className={"row mt-3 justify-content-center"}>
      <button
        type="submit"
        className="btn btn-success w-50"
        disabled={isDisabled}
      >
        {" "}
        {text}
      </button>
    </div>
  );
}

export default FormBtn;
