import React from "react";

type ContainerProps = {
  children?: React.ReactNode;
};

function Container({ children }: ContainerProps) {
  return <div className="container max-w-screen-lg mx-auto ">{children}</div>;
}

export default Container;
