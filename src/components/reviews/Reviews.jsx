import React from "react";
import "./review.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequests from "../../utils/newRequest";
import Review from "../review/Review";

const Reviews = ({ gigId }) => {
  const queryClient = useQueryClient();
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
  // console.log(data);
  const mutation = useMutation({
    mutationFn: (review) => {
      return newRequests.post("/reviews/new", review);
    },
    //update reviews when post is success
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
    },
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const desc = e.target[0].value;
    const star = e.target[1].value;
    mutation.mutate({ gigId, desc, star });
  };

  return (
    <div>
      <div className="reviews">
        <h2>reviews</h2>
        {isLoading
          ? "loading... "
          : error
          ? "something went wrong"
          : data.map((review) => <Review key={review._id} review={review} />)}
        <div className="add">
          <h3>Add a review</h3>
          <form onSubmit={handleSubmit}>
            <input type="text" className="addinput" name="" placeholder="write your opinion" />
            <select name="" id="">
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
            <button>Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
