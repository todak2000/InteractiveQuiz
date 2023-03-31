// Home
export const header = "Interactive Quiz";
export const whiteHeaderText = "Get Started";
export const homeButtonText = "Begin";
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

export const questionsArray = [
  {
    id: 1,
    question: "Who is the president of Nigeria?",
    answerArr: [
      {
        id: 1,
        text: "Ali Bongo",
        isAnswer: false,
      },
      {
        id: 2,
        text: "Traore Kofi",
        isAnswer: false,
      },
      {
        id: 3,
        text: "Nuhu Ribadu",
        isAnswer: true,
      },
    ],
  },
  {
    id: 2,
    question: "Who is the president of Ghana?",
    answerArr: [
      {
        id: 1,
        text: "Kofi Anan",
        isAnswer: true,
      },
      {
        id: 2,
        text: "Jim Belgin",
        isAnswer: false,
      },
      {
        id: 3,
        text: "Turai Yar adua",
        isAnswer: false,
      },
    ],
  },
  {
    id: 3,
    question: "The world largest refinery is found in which country?",
    answerArr: [
      {
        id: 1,
        text: "Saudi Arabia",
        isAnswer: true,
      },
      {
        id: 2,
        text: "Venezuela",
        isAnswer: false,
      },
      {
        id: 3,
        text: "Turkey",
        isAnswer: false,
      },
    ],
  },
  {
    id: 4,
    question: "Which of the following is correct?",
    answerArr: [
      {
        id: 1,
        text: "Committee",
        isAnswer: true,
      },
      {
        id: 2,
        text: "Comittee",
        isAnswer: false,
      },
      {
        id: 3,
        text: "Committe",
        isAnswer: false,
      },
    ],
  },
  {
    id: 5,
    question: "Which of the following is not Capital of an European Country?",
    answerArr: [
      {
        id: 1,
        text: "Ontario",
        isAnswer: true,
      },
      {
        id: 2,
        text: "Stockholm",
        isAnswer: false,
      },
      {
        id: 3,
        text: "Vienna",
        isAnswer: false,
      },
    ],
  },
];

// Instructions
export const instructionHeader = "Quiz Instructions";
export const InstructionsArr = [
  {
    id: 1,
    text: "Welcome Player!",
  },
  {
    id: 2,
    text: "The quizzes consists of questions carefully curated from different subjectmatter to help you self-assess yourself. No data will be collected on the website regarding your responses or how many times you take the quiz.",
  },
  {
    id: 3,
    text: "Each question in the quiz is of multiple-choice  format and timed 7 seconds (Hard leve), 10 seconds (Medium Level) or 7 seconds (Hard level). Read each question carefully and quickly to avoid timeout and end of quiz session, and click on the button next to proceed to next question. Each correct or incorrect response will result in appropriate feedback immediately. Onclick any option, your answer is taken and cannot be reversed.",
  },
  {
    id: 4,
    text: "You can monitor the progress of your quiz session as indicated on the progress bar as well keep track of your quiz scores as they are updated in realtime. Upon completion, you will be redirected to the result page to show your final quiz score, where which you can share on social media of your choice.",
  },
  {
    id: 5,
    text: "You can always skip a question (there is no penalty for this) or end the quiz session by clicking on 'Stop Quiz' at the top right side of the screen.",
  },
  {
    id: 6,
    text: "The total score is a cummulation of all the quiz sessions you have played and always updated in realtime when playing new quiz sessions.",
  },
];
export const instructionButtonText = "lets Get Started";
