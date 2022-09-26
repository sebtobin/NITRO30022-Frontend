import React, { FC } from "react";
import Lottie from "react-lottie";
import LoadingAtom from "../../../lottie/loading-atom.json";

const ActivityIndicator: FC = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingAtom,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return <Lottie options={defaultOptions} height={50} width={50} />;
};
export default ActivityIndicator;
