import React, { useEffect } from "react";
import { Organizer } from "@components/organisms/organaizer/organizer.organism";
import { NavMenu } from "@components/organisms/nav-menu/nav-menu.organism";

export const Organaizer = (): JSX.Element => {
  useEffect(() => {
    document.title = "Органайзер";
  }, []);

  return (
    <div>
      <NavMenu />
      <Organizer />
    </div>
  );
};
