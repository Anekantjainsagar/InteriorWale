import React from "react";
import Button from "../ui/Button";

const CTABtn = () => (
  <div className="flex-shrink-0 w-full lg:w-auto mt-4 lg:mt-0">
    <Button
      variant="primary"
      className="w-full lg:w-auto bg-button-1 text-global-3 font-bold font-muller text-base sm:text-base lg:text-lg px-8 sm:px-10 lg:px-10 py-2 sm:py-3 lg:py-3 rounded-full hover:bg-opacity-90 transition-all duration-200"
    >
      Get started today
    </Button>
  </div>
);

export default CTABtn;
