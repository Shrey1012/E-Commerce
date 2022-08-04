import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { emptyCart } from "../redux/apiCalls";
import { userRequest } from "../requestMethods";
import styled from "styled-components";
import Confetti from "../components/Confetti";

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ce9b9b;
`;

const Text = styled.div`
  font-size: 34px;
  color: aliceblue;
  font-weight: 500;
  margin-bottom: 10px;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
`;
const Button = styled.button`
  width: 125%;
  height: 50px;
  margin-top: 25px;
  border: none;
  border-radius: 12px;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Success = () => {
  const location = useLocation();
  const data = location.state.stripeData;
  const cart = location.state.cart;
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item._quantity,
          })),
          amount: cart.total,
          address: data.billing_details.address,
        });
        setOrderId(res.data._id);
      } catch {}
    };
    data && createOrder();
  }, [cart, data, currentUser]);

  const dispatch = useDispatch();

  const handleClick = () => {
    emptyCart(dispatch);
  };

  return (
    <Container>
      <Confetti />
      <Text>
        {orderId
          ? `Order has been created successfully. Your order number is ${orderId}`
          : `Successfull. Your order is being prepared...`}
      </Text>
      <Link to="/">
        <Button onClick={handleClick}>Go to Home</Button>
      </Link>
    </Container>
  );
};

export default Success;
