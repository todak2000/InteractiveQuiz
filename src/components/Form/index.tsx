import React, { useState, useEffect } from "react";
import TextInput from "../TextInput/TextInput";
import { ImSpinner2 } from "react-icons/im";
import Button from "../buttons/Button";
import { useUser } from "@/store/user";
import { SlClose } from "react-icons/sl";

type formProps = {
  id: number;
  label: string;
  type: string;
  name: string;
  note?: string;
  options?: string[];
  placeholder?: string;
};

interface Props {
  formState?: any;
  formArray: formProps[];
  inputBg: string;
  isLoading: boolean;
  handleClose: () => void;
  handleSubmit: (form: any) => void;
}

const Form: React.FC<Props> = ({
  formState,
  isLoading,
  formArray,
  inputBg,
  handleClose,
  handleSubmit,
}) => {
  const { loading, setLoading, score } = useUser();
  const [form, setForm] = useState(formState);
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="flex w-[90%] flex-col items-center justify-center pb-10 md:w-1/3">
      {formArray.map(
        ({ id, label, type, name, placeholder = "", note, options = [] }) => (
          <TextInput
            key={id}
            handleChange={handleChange}
            inputBg={inputBg}
            label={label}
            type={type}
            note={note}
            options={options}
            value={form[name]}
            placeholder={placeholder}
            name={name}
          />
        )
      )}
      <Button
        variant="submit"
        className="mt-4 h-[45px] w-2/3"
        onClick={() => {
          setLoading(true);
          handleSubmit(form);
        }}
        disabled={
          form.levelOfDifficulty !== "" &&
          form.noOfPlayers !== "" &&
          form.noOfPlayers > 1 &&
          form.noOfQuestions !== "" &&
          form.stake !== "" &&
          score > Number(form.stake)
            ? false
            : true
        }
      >
        {loading ? (
          <ImSpinner2 className="animate-spin" />
        ) : (
          "Create New Challenge"
        )}
      </Button>
      <SlClose
        size={25}
        className=" absolute top-4 right-4 mb-4 cursor-pointer text-red-400"
        onClick={handleClose}
      />
    </div>
  );
};

export default React.memo(Form);
