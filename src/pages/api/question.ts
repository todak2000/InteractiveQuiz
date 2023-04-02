
const generateQuestions = async ({
  prompt
}: {
  prompt: string | any;
}): Promise<string|any> => {
  try {
    const response = await fetch(
      "https://api.openai.com/v1/engines/text-davinci-003/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          prompt: prompt,
          max_tokens: 1500,
          temperature: 0.7,
        }),
      }
    );
    const data = await response.json();
    return data.choices[0].text;
  } catch (err) {
    console.error(err);
  }
};

export default async function handler(req: Request, res: Response): Promise<any> {
  const { prompt } = req?.body;

  const questions = await generateQuestions({
    prompt
  });
  res.status(200).json({
    questions,
  });

  return questions
}
