import React, { useState } from "react";

import Header from "@/components/layout/Header";
import Layout from "@/components/layout/Layout";
import TopBar from "@/components/layout/TopBar";
import type { NextPageWithLayout } from "../_app";
import { useUser } from "../../store/user";
import RightBar from "@/components/layout/RightBar";

type MainboardProps = {
  title: string;
  text?: string;
  children?: any;
};

const Mainboard: NextPageWithLayout<MainboardProps> = ({
  title,
  text,
  children,
}) => {
  const { userData, isReadInstructions } = useUser();

  return (
    <div className="parent relative overflow-hidden md:grid md:h-full md:grid-cols-8">
      <Header />

      {isReadInstructions && <RightBar />}

      <main className="main bg-[#F2F2F2] md:col-span-6">
        <div className="-pr-12 w-full bg-[#F2F2F2] md:z-[100] md:-ml-12 md:h-full md:rounded-l-3xl">
          <TopBar username={userData?.name} />
          <div className="h-full min-h-[90vh] p-4 md:p-8 md:pr-0">
            <p className="mb-2 text-xl font-thin md:mb-8 md:text-2xl">
              {title}
            </p>

            {text && (
              <p className="mb-2 text-xs font-thin text-[#818181] md:mt-[-1.5rem] md:text-sm">
                {text}
              </p>
            )}
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

Mainboard.getLayout = (page) => <Layout>{page}</Layout>;

export default React.memo(Mainboard);
