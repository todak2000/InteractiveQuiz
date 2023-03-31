import * as React from "react";
import { RiAlarmWarningFill } from "react-icons/ri";

import Layout from "@/components/layout/Layout";
// import ArrowLink from "@/components/links/ArrowLink";
import Seo from "@/components/Seo";
import { useRouter } from "next/router";
import type { NextPageWithLayout } from "./_app";
import { GiBurningDot } from "react-icons/gi";

const NotFoundPage: NextPageWithLayout = () => {
  const { push } = useRouter();
  const handleHome = () => {
    push("/");
  };
  return (
    <Layout>
      <Seo templateTitle="Not Found" />

      <main>
        <section className="bg-white">
          <div className="layout flex min-h-screen flex-col items-center justify-center text-center text-black">
            <GiBurningDot
              size={60}
              className="drop-shadow-glow animate-flicker text-brand_primary"
            />
            <h1 className="mt-8 text-4xl md:text-6xl">Page Not Found</h1>
            <p className="mt-4 md:text-lg" onClick={handleHome}>
              Back to Home
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
};
NotFoundPage.getLayout = (page) => <Layout>{page}</Layout>;
export default NotFoundPage;
