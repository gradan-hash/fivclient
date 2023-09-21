import React from "react";
import "./review.scss";
import { useQuery } from "@tanstack/react-query";
import newRequests from "../../utils/newRequest";
import Review from "../review/Review";

const Reviews = ({ gigId }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      newRequests
        .get(`/reviews/${gigId}`)

        // /gigs${search}&min=${minRef.current.value}&max=${maRef.current.value}"
        .then((res) => {
          return res.data;
        }),
  });

  return (
    <div>
      <div className="reviews">
        <h2>reviews</h2>
        {isLoading
          ? "loading... "
          : error
          ? "something went wrong"
          : data.map((review) => <Review key={review._id} review={review} />)}
      </div>
    </div>
  );
};

export default Reviews;
