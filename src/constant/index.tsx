import { IoReaderSharp } from "react-icons/io5";
import { BsArrowUpRight, BsPerson } from "react-icons/bs";
import { GiTwoCoins } from "react-icons/gi";
import { SiTarget } from "react-icons/si";

export const bgDesktop = "/images/bg_desktop.svg";
// Home
export const header = "Interactive Quiz";
export const whiteHeaderText = "Get Started";
export const homeButtonText = "Begin";
export const socialMediaUrl = "https://interactivequiz.onrender.com";
export const ratingButtonText = "Submit";
export const GoogleLogo = "/images/logo.svg";

// Navbar
export const navBarItems = [
  {
    id: 1,
    name: "Home",
    route: "/",
  },
  {
    id: 2,
    name: "How to Play",
    route: "/#how-to-play",
  },
  {
    id: 3,
    name: "Leadersboard",
    route: "/#board",
  },
];

// how to play
export const howArray = [
  {
    id: 1,
    title: "Sign up",
    icon: <BsPerson className="text-5xl text-[#3EA96E]" />,
    text: "Get started within seconds with your Gmail account! With just a few clicks, you can get to play your first quiz and start to improve your knowledge and skills.",
  },
  {
    id: 2,
    title: "Read the Quiz Instructions",
    icon: <IoReaderSharp className="text-5xl text-[#F69E8F]" />,
    text: "Ensure to read and understant the quiz instructions. Understand the rules of the quiz, so you can answer the questions correctly and accurately. ",
  },
  {
    id: 3,
    title: "Earn some coins",
    icon: <GiTwoCoins className="text-5xl text-[#5878CC]" />,
    text: "You have the opportunity to earn real money by playing quiz sessions and rising to the top of the leaderboard. The more you play and win, the more you can win. At the end of each month, the person with the highest number of coins earned will receive a prize of N5000 and all previous coins will be reset for the start of the new month. So, get playing and start winning today!",
  },
  {
    id: 4,
    title: "Create/Accept Challenges",
    icon: <SiTarget className="text-5xl text-[#926ACA]" />,
    text: "Maximise your chances of topping the leaderboard by taking part in and winning as many challenges as possible. Head over to the challenge tab to view the current challenges or create one of your own. The more you play and the more you win, the higher your chances become at winning the monthly N5,000 prize! So, get competing and get rewarded!",
  },
];

// Hero
export const heroHeaderText = "Play online Quiz & Win Cash";
export const heroNormalText = "Win up to N5,000 monthly";
export const previewValue = 255;
export const previewValueText = "Previews";
export const callToActionArray = [
  {
    id: 1,
    text: "Get Started Now",
    variant: "subscribe",
    icon: <BsArrowUpRight />,
  },
  {
    id: 2,
    text: "Enrol Now",
    variant: "navButton",
    icon: null,
  },
];

export const feedbackResponseText =
  "Thank you for taking the time to provide feedback! We appreciate your thoughts and will use them to improve our Product.";
export const createChallengeFormState = {
  creatorId: "",
  noOfPlayers: "",
  stake: "",
  noOfQuestions: "",
  levelOfDifficulty: "",
};
export const createChallengeArray = [
  {
    id: 1,
    label: "Level of Difficulty",
    type: "select",
    name: "levelOfDifficulty",
    options: ["Easy", "Medium", "Hard"],
    value: [1, 2, 3],
  },
  {
    id: 2,
    label: "Number of Questions",
    type: "number",
    name: "noOfQuestions",
    placeholder: "e.g. 10",
    value: "",
    note: "Min of 10 and Max of 30",
  },
  {
    id: 3,
    label: "Stake Amount",
    name: "stake",
    type: "text",
    placeholder: "e.g. 2000",
    value: "",
    note: "Min of 100 coins and Max of 5000 coins",
  },
  {
    id: 4,
    label: "Number of Players",
    name: "noOfPlayers",
    type: "number",
    placeholder: "e.g. 2",
    value: "",
    note: "Min of 2 and Max of 5",
  },
];

export const selectOptions = [
  {
    id: 1,
    label: "Easy",
    value: 1,
  },
  {
    id: 2,
    label: "Medium",
    value: 2,
  },
  {
    id: 3,
    label: "Hard",
    value: 3,
  },
];


// Instructions
export const instructionHeader = "Quiz Instructions";
export const InstructionsArr = [
  {
    id: 1,
    text: "Each question in the quiz is of multiple-choice  format and timed 7 seconds (Hard leve), 10 seconds (Medium Level) or 7 seconds (Hard level).",
  },
  {
    id: 2,
    text: "Read each question carefully and quickly to avoid timeout and end of quiz session, and click on the button next to proceed to next question. Each correct or incorrect response will result in appropriate feedback immediately. Onclick any option, your answer is taken and cannot be reversed.",
  },
  {
    id: 3,
    text: "You can monitor the progress of your quiz session as indicated on the progress bar as well keep track of your quiz scores as they are updated in realtime. Upon completion, you will be redirected to the result page to show your final quiz score, where which you can share on social media of your choice.",
  },
  {
    id: 4,
    text: "You can always skip a question (there is no penalty for this) or end the quiz session by clicking on 'Stop Quiz' at the top right side of the screen.",
  },
  {
    id: 5,
    text: "With Any correct answer, you get 3 points and can answer a maximum of 10 questions per session. The total score is a cummulation of all the quiz sessions you have played and always updated in realtime when playing new quiz sessions.",
  },
];
export const instructionButtonText = "Lets Get Started";

export const boardTableHeader = [
  {
    id: 1,
    text: "Position",
  },
  {
    id: 2,
    text: "User",
  },
  {
    id: 3,
    text: "Score",
  },
];
export const challengeTableHeader = [
  {
    id: 1,
    text: "ID",
  },
  {
    id: 2,
    text: "Level",
  },
  {
    id: 3,
    text: "Players",
  },
  {
    id: 4,
    text: "Questions",
  },
  {
    id: 5,
    text: "Amount",
  },
  {
    id: 6,
    text: "Slots left",
  },
  {
    id: 7,
    text: "Ongoing",
  },
];
