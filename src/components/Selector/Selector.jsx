import React, { useRef, useEffect, useState } from "react";

import Select from "react-select";

const Selector = ({ options = {}, title = "Título", onChange = () => {} }) => {
  const parseOptions = options.map((option) => ({
    value: option,
    label: option,
  }));

  return (
    <div>
      <h2> {title}</h2>
      <Select
        options={parseOptions}
        onChange={onChange}
        defaultValue ={parseOptions[0]}
      />
    </div>
  );
};

export default Selector;
