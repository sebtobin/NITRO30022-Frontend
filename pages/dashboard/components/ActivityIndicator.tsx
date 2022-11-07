import React, { FC } from "react";
import Lottie from "react-lottie";
import LoadingAtom from "../../../lottie/loading-atom.json";

interface Props {
  dim?: number;
}
const ActivityIndicator: FC<Props> = ({ dim }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingAtom,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Lottie options={defaultOptions} height={dim ?? 50} width={dim ?? 50} />
  );
};
export default ActivityIndicator;
