import React, { useState, useEffect } from "react";
import Seo from "@/components/Seo";
import Layout from "@/components/layout/Layout";
import { GiBurningDot } from "react-icons/gi";
import {
  header,
  whiteHeaderText,
  homeButtonText,
  selectOptions,
} from "@/constant";
import TextInput from "@/components/TextInput/TextInput";
import Button from "@/components/buttons/Button";
import { useUser, UserProp } from "@/store/user";
import { useRouter } from "next/router";
import { ImSpinner2 } from "react-icons/im";
export default function HomePage() {
  const [newUser, setNewUser] = useState<UserProp>({
    name: "",
    difficulty: 1,
    latest_score: 0,
  });
  const {
    loading,
    setLoading,
    name,
    setName,
    setLevel,
    setUserData,
    setScore,
  } = useUser();
  const { push } = useRouter();

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
    setUserData(newUser);
  };

  const handleSubmit = () => {
    setLoading(true);
    setName(newUser?.name);
    setScore(newUser?.latest_score);
    setLevel(newUser.difficulty);
    setTimeout(() => {
      if (name !== "") {
        push("/quiz");
        setLoading(false);
      }
    }, 3000);
  };

  return (
    <Layout>
      <Seo templateTitle="| Home" />
      <main className="grid-col-1 grid min-h-screen md:grid-cols-2">
        <section className="hidden min-h-full w-full flex-col items-center justify-center bg-brand_primary md:flex">
          <div className="flex flex-shrink-0 flex-col items-center justify-center">
            <GiBurningDot className="text-6xl text-white" />
            <p className="header-text text-white">{header}</p>
          </div>
        </section>
        <section className="flex min-h-full w-full flex-col items-center justify-center bg-brand_secondary">
          <p className="header-text">{whiteHeaderText}</p>
          <div className="mt-4 flex w-full flex-col items-center justify-center">
            <TextInput
              variant="primary"
              className="w-2/3 md:w-1/2"
              name="name"
              onChange={handleChange}
            />
            <select
              className="text-primary-500 hover:text-primary-600 active:text-primary-700 mt-4 w-2/3 rounded-sm border-brand_primary md:w-1/2"
              onChange={handleChange}
              name="difficulty"
            >
              <option value="">Please choose&hellip;</option>
              {selectOptions.map(({ id, value, label }) => {
                return (
                  <option key={id} value={value}>
                    {label}
                  </option>
                );
              })}
            </select>

            <Button
              variant="submit"
              className="mt-4 h-[45px] w-2/3"
              disabled={newUser?.name == "" ? true : false}
              onClick={handleSubmit}
            >
              {loading ? (
                <ImSpinner2 className="animate-spin" />
              ) : (
                homeButtonText
              )}
            </Button>
          </div>
        </section>
      </main>
    </Layout>
  );
}
