import React from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import { socialMediaUrl } from "@/constant";

interface Props {
  quizScore: number;
}

const SocialMediaShare: React.FC<Props> = ({ quizScore }) => {
  return (
    <div className="my-10 flex w-full flex-row items-center justify-evenly md:w-1/2 ">
      <FacebookShareButton
        url={socialMediaUrl}
        title={`I just aced this quiz with a score of ${quizScore}! Challenge yourself and see if you can beat my score!`}
        quote={`I just aced this quiz with a score of ${quizScore}! Challenge yourself and see if you can beat my score!`}
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <WhatsappShareButton
        url={socialMediaUrl}
        title={`I just aced this quiz with a score of ${quizScore}! Challenge yourself and see if you can beat my score!`}
        separator=":: "
      >
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
      <LinkedinShareButton
        url={socialMediaUrl}
        title={`I just aced this quiz with a score of ${quizScore}! Challenge yourself and see if you can beat my score!`}
      >
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
      <TwitterShareButton
        url={socialMediaUrl}
        title={`I just aced this quiz with a score of ${quizScore}! Challenge yourself and see if you can beat my score!`}
      >
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <TelegramShareButton
        url={socialMediaUrl}
        title={`I just aced this quiz with a score of ${quizScore}! Challenge yourself and see if you can beat my score!`}
      >
        <TelegramIcon size={32} round />
      </TelegramShareButton>
    </div>
  );
};

export default React.memo(SocialMediaShare);
