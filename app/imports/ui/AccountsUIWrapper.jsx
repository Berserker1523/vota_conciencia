import React, { useEffect, useRef } from "react";
import { Template } from "meteor/templating";
import { Blaze } from "meteor/blaze";

const AccountsUIWrapper = () => {
  const refContainer = useRef();
  useEffect(() => {
    // Use Meteor Blaze to render login buttons
    const view = Blaze.render(Template.loginButtons, refContainer.current);

    return () => {
      // Clean up Blaze view
      Blaze.remove(view);
    };
  });

  // Just render a placeholder container that will be filled in
  return <div ref={refContainer}></div>;
};

export default AccountsUIWrapper;
