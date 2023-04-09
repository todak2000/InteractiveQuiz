import React, { useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import StarRatings from "react-star-ratings";
import Button from "../buttons/Button";
import { submitRating } from "@/firebase";
import { ratingButtonText } from "@/constant";
import { useUser } from "@/store/user";
import { feedbackResponseText } from "@/constant";

const RatingComponent: React.FC = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const { userData } = useUser();
  // Catch Rating value
  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    if (rating !== 0 && comment) {
      setIsLoading(true);
      submitRating(rating, comment, userData?.email).then(() => {
        setIsLoading(false);
        setIsSubmit(true);
      });
    }
  };

  return (
    <div className="mb-10 flex w-full flex-col items-center justify-evenly md:w-1/2 ">
      {isSubmit ? (
        <p className="text-center font-primary text-sm text-green-700">
          &#128522; {feedbackResponseText}
        </p>
      ) : (
        <>
          <p className="my-1 font-primary">
            Rate this app based on your experience
          </p>
          <StarRatings
            rating={rating}
            starRatedColor="#FFC42E"
            changeRating={handleRating}
            numberOfStars={5}
            starHoverColor="#DFD3AB"
            starDimension="30px"
            name="rating"
          />

          <div className="mt-6 w-full">
            <textarea
              placeholder="Kindly provide feedback or ways to improve. Thanks..."
              value={comment}
              onChange={handleChange}
              className="w-full rounded-sm border-0 bg-gray-50 p-4 text-sm text-[#414141] placeholder-gray-400"
            />
          </div>
          <Button
            variant="submit"
            className="mt-4 h-[45px] w-2/3"
            disabled={
              (comment === "" && rating === 0) || isLoading ? true : false
            }
            onClick={handleSubmit}
          >
            {isLoading ? (
              <ImSpinner2 className="animate-spin" />
            ) : (
              ratingButtonText
            )}
          </Button>
        </>
      )}
    </div>
  );
};

export default React.memo(RatingComponent);
