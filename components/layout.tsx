import React, { ReactNode } from "react";
import { NavMenu } from "@components/organisms/nav-menu/nav-menu.organism";

export default function Layout({
  children
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <>
      <NavMenu auth={false} />
      <div>{children}</div>
    </>
  );
}
