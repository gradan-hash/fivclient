import React from "react";
import "./review.scss";
import { useQuery } from "@tanstack/react-query";
import newRequests from "../../utils/newRequest";
const Review = ({ review }) => {
  console.log(review);
  // console.log(review.userId);
  const userId = review?.userId;

  const { isLoading, error, data } = useQuery({
    queryKey: [review.userId],
    queryFn: () =>
      newRequests
        .get(`/user/${userId}`)

        .then((res) => {
          return res.data;
        }),
    enabled: !!userId,
  });
  // console.log(data);
  return (
    <div>
      <div className="reviews">
        <h2>Review</h2>
        <div className="item">
          {isLoading ? (
            "loading..."
          ) : error ? (
            "something went wrong"
          ) : (
            <div className="user">
              <img className="pp" src={data.img || ""} alt="" />
              <div className="info">
                <span>{data.username}</span>
                <div className="country">
                  <span>{data.country}</span>
                </div>
              </div>
            </div>
          )}
          <div className="stars">
            {Array.from({ length: review.star }).map((_, i) => (
              <img src="/img/star.png" alt="" key={i} />
            ))}

            <span>{review.star}</span>
          </div>
          <p>{review.desc}</p>
          <div className="helpful">
            <span>Helpful?</span>
            <img src="/img/like.png" alt="" />
            <span>Yes</span>
            <img src="/img/dislike.png" alt="" />
            <span>No</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
