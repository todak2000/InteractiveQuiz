import React from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import { socialMediaUrl } from "@/constant";

interface Props {
  title: string;
}

const SocialMediaShare: React.FC<Props> = ({ title }) => {
  return (
    <>
      <FacebookShareButton url={socialMediaUrl} title={title} quote={title}>
        <FacebookIcon size={25} round />
      </FacebookShareButton>
      <WhatsappShareButton url={socialMediaUrl} title={title} separator=":: ">
        <WhatsappIcon size={25} round />
      </WhatsappShareButton>
      <TwitterShareButton url={socialMediaUrl} title={title}>
        <TwitterIcon size={25} round />
      </TwitterShareButton>
    </>
  );
};

export default React.memo(SocialMediaShare);
