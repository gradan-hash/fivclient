import React from "react";
import { Link, useParams } from "react-router-dom";
import "./Message.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequests from "../../utils/newRequest";

const Message = () => {
  const { id } = useParams();
  console.log(id);

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      newRequests

        .get(`/messages/${id}`)

        .then((res) => {
          return res.data;
        }),
  });
  console.log(data);

  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequests.post(`/messages/`, message);
    },
    //update reviews when post is success(refresh)
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value,
    });
    e.target[0].value = "";
  };

  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages">Messages</Link>
        </span>
        {isLoading ? (
          "loading..."
        ) : error ? (
          "something went wrong"
        ) : (
          <div className="messages">
            {data.map((message) => (
              <div className="item" key={message._id}>
                <img
                  src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
                <p>{message.desc}</p>
              </div>
            ))}
          </div>
        )}
        <hr />
        <form className="write" onSubmit={handleSubmit}>
          <textarea type="text" placeholder="write a message" />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Message;
