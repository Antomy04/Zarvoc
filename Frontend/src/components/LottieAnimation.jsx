import React from "react";
import Lottie from "lottie-react";
import animationData from "../assets/lottie_login.json";

const LottieAnimation = ({ style }) => {
  return <Lottie animationData={animationData} loop={true} style={style} />;
};

export default LottieAnimation;
