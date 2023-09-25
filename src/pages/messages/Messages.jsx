import React from "react";
import { Link } from "react-router-dom";
import "./Messages.scss";
import { useQuery } from "@tanstack/react-query";
import newRequests from "../../utils/newRequest";
import moment from "moment";
const Messages = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["conversation"],
    queryFn: () =>
      newRequests
        .get("/conversation")

        .then((res) => {
          return res.data;
        }),
  });

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div className="messages">
      {isLoading ? (
        "loading..."
      ) : error ? (
        "something went wrong"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Messages</h1>
          </div>
          <table>
            <tr>
              <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
              <th>Last Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>

            {data.map((convo) => (
              <tr
                className={
                  ((currentUser.isSeller && !convo.readByseller) ||
                    (!currentUser.isSeller && !convo.readByBuyer)) &&
                  "active"
                }
                key={convo.id}>
                <td>
                  {" "}
                  {currentUser.isSeller ? convo.sellerId : convo.buyerId}
                </td>
                <td>
                  <Link to="/message/123" className="link">
                    {convo?.lastmessage?.substring(0, 100)}...
                  </Link>
                </td>
                <td>{moment(convo.updatedAt).fromNow}</td>
                <td>
                  {((currentUser.isSeller && !convo.readByseller) ||
                    (!currentUser.isSeller && !convo.readByBuyer)) && (
                    <button>Mark as Read</button>
                  )}
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default Messages;
