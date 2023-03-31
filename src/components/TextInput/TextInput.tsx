/* eslint-disable react/display-name */
import * as React from "react";

import clsxm from "@/lib/clsxm";

enum TextInputVariant {
  "primary",
  "basic",
  "subscribe",
}

type TextInputProps = {
  variant?: keyof typeof TextInputVariant;
} & React.ComponentPropsWithRef<"input">;

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      children,
      className,
      variant = "primary",
      disabled: buttonDisabled,
      ...rest
    },
    ref
  ) => {
    return (
      <input
        ref={ref}
        type="text"
        disabled={buttonDisabled}
        placeholder="Enter your Name"
        className={clsxm(
          "p-2 font-thin",
          "focus:outline-none",
          "transition duration-100",
          //#region  //*=========== Variant ===========
          variant === "primary" && [
            "text-primary-500 hover:text-primary-600 active:text-primary-700 rounded-sm border-brand_primary",
            "disabled:text-primary-200",
          ],
          variant === "subscribe" && [
            "text-brand_secondary_color-500 rounded-l-sm border border-button_bg_color bg-[#2A2A2B] hover:text-white active:text-white",
            "disabled:text-primary-200 w-[65%]",
          ],
          variant === "basic" && [
            "text-black hover:text-gray-600 active:text-gray-800",
            "disabled:text-gray-300",
          ],
          //#endregion  //*======== Variant ===========
          "disabled:cursor-not-allowed disabled:brightness-105 disabled:hover:underline",
          className
        )}
        {...rest}
      />
    );
  }
);

export default TextInput;
