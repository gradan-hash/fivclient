import React from "react";
import { Link } from "react-router-dom";
import "./Orders.scss";
import { useQuery } from "@tanstack/react-query";
import newRequests from "../../utils/newRequest";

const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequests
        .get("/order/all")

        // /gigs${search}&min=${minRef.current.value}&max=${maRef.current.value}"
        .then((res) => {
          return res.data;
        }),
  });
  console.log(data);

  return (
    <div className="orders">
      {isLoading ? (
        "loading ... "
      ) : error ? (
        "something went wrong"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Orders</h1>
          </div>
          <table>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              {<th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>}
              <th>Contact</th>
            </tr>

            {data.map((order) => (
              <tr key={order._id}>
                <td>
                  <img className={order.img || "null"} alt="" />
                </td>
                <td>{order.title}</td>
                <td>{order.price}</td>

                <td>
                  <img className="message" src="./img/message.png" alt="" />
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
