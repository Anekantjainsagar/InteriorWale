import React from "react";
import { FiChevronDown } from "react-icons/fi";

const Select = ({ value, onChange, options }) => {
  return (
    <div className="relative w-full md:w-[10vw]">
      <select
        value={value}
        onChange={onChange}
        className="appearance-none w-full rounded-lg text-darkGrey text-lg border px-3 py-2 outline-none"
      >
        {options.map((element, idx) => {
          return (
            <option className="py-1" value={element} key={idx}>
              {element}
            </option>
          );
        })}
      </select>
      <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-darkGrey" />
    </div>
  );
};

export default Select;
