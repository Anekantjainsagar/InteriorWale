import React from "react";
import Button from "../ui/Button";

const CTABtn = () => (
  <div className="flex-shrink-0 w-full lg:w-auto mt-2 lg:mt-0">
    <Button
      variant="primary"
      className="w-full lg:w-auto bg-button-1 hover:bg-opacity-90 text-global-3 font-bold font-muller text-base lg:text-lg px-8 lg:px-10 py-3 rounded-full transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-global-2 focus:ring-offset-2"
      onClick={() => {
        const formSection = document.getElementById("contact");
        if (formSection) {
          const offsetTop = formSection.offsetTop - 80; // Adjust for header height if needed
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      }}
    >
      Get started today
    </Button>
  </div>
);

export default CTABtn;
