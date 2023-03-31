import React from "react";
import Layout from "@/components/layout/Layout";
import type { NextPageWithLayout } from "../../pages/_app";

type AvatarProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
};
const Avatar: NextPageWithLayout<AvatarProps> = ({
  src,
  alt,
  className,
  width = 70,
  height = 70,
}) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
      />
    </div>
  );
};
Avatar.getLayout = (page) => <Layout>{page}</Layout>;
export default React.memo(Avatar);
