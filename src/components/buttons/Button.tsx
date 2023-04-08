/* eslint-disable react/display-name */
import * as React from "react";
import { IconType } from "react-icons";
import { ImSpinner2 } from "react-icons/im";

import clsxm from "@/lib/clsxm";

enum ButtonVariant {
  "neutral",
  "submit",
  "challenge",
}

enum ButtonSize {
  "sm",
  "base",
  "hero",
  "sub",
}

type ButtonProps = {
  isLoading?: boolean;
  isDarkBg?: boolean;
  variant?: keyof typeof ButtonVariant;
  size?: keyof typeof ButtonSize;
  leftIcon?: IconType;
  rightIcon?: IconType;
  leftIconClassName?: string;
  rightIconClassName?: string;
} & React.ComponentPropsWithRef<"button">;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled: buttonDisabled,
      isLoading,
      variant = "primary",
      size = "base",
      isDarkBg = false,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      leftIconClassName,
      rightIconClassName,
      ...rest
    },
    ref
  ) => {
    const disabled = isLoading || buttonDisabled;

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className={clsxm(
          "inline-flex items-center justify-center  font-primary font-medium",
          "focus:outline-none",
          "shadow-sm",
          "transition-colors duration-75",
          //#region  //*=========== Size ===========
          [
            size === "base" && ["text-[14px] leading-[19px]"],
            size === "sm" && ["px-2 py-1", "text-xs md:text-sm"],
            size === "sub" && ["p-3", "text-[8px] md:text-sm"],
            size === "hero" && [
              "text-[8px] leading-[11px] md:text-[14px] md:leading-[19px]",
            ],
          ],
          //#endregion  //*======== Size ===========
          //#region  //*=========== Variants ===========
          [
            variant === "neutral" && [
              "h-[19px] w-[69px] rounded-sm bg-transparent text-[#A1A1A1] md:h-[46px] md:w-[137px]",
              "border-0",
              "hover:border-button_bg_color hover:bg-white hover:text-button_bg_color active:bg-gray-700 disabled:bg-gray-700",
            ],

            variant === "submit" && [
              "h-[27px] w-[83px] rounded-sm bg-brand_primary text-white md:h-[54px] md:w-[209px]",
              "border border-button_bg_color",
              "hover:bg-white hover:text-brand_primary disabled:bg-[#f1f1f1] disabled:text-brand_primary",
            ],
            variant === "challenge" && [
              "h-[20px] w-[83px] rounded-sm bg-brand_primary text-white md:h-[35px] md:w-[80px]",
              "border border-button_bg_color",
              "hover:bg-white hover:text-brand_primary disabled:bg-[#f1f1f1] disabled:text-brand_primary",
            ],
          ],
          //#endregion  //*======== Variants ===========
          "disabled:cursor-not-allowed",
          isLoading &&
            "relative text-transparent transition-none hover:text-transparent disabled:cursor-wait",
          className
        )}
        {...rest}
      >
        {isLoading && (
          <div
            className={clsxm(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
              {
                "text-white": ["primary", "dark"].includes(variant),
                "text-black": ["light"].includes(variant),
                "text-primary-500": ["outline", "ghost"].includes(variant),
              }
            )}
          >
            <ImSpinner2 className="animate-spin" />
          </div>
        )}
        {LeftIcon && (
          <div
            className={clsxm([
              size === "base" && "mr-1",
              size === "sm" && "mr-1.5",
            ])}
          >
            <LeftIcon
              className={clsxm(
                [
                  size === "base" && "md:text-md text-md",
                  size === "sm" && "md:text-md text-sm",
                ],
                leftIconClassName
              )}
            />
          </div>
        )}
        {children}
        {RightIcon && (
          <div
            className={clsxm([
              size === "base" && "ml-1",
              size === "sm" && "ml-1.5",
            ])}
          >
            <RightIcon
              className={clsxm(
                [
                  size === "base" && "text-md md:text-md",
                  size === "sm" && "md:text-md text-sm",
                ],
                rightIconClassName
              )}
            />
          </div>
        )}
      </button>
    );
  }
);

export default React.memo(Button);
