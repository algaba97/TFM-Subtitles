import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useTranslate from "../../utils/useTranslate";

const Word = ({ value = "Green", helpLanguage="es" }) => {
  const { translate } = useTranslate("Amazon", "en", helpLanguage);
  const [clicked, setClicked] = useState(false);

  // Translated value, its in the state in order to trigger a render when changed
  const [translation, setTranslation] = useState("");

  useEffect(() => {});

  return (
    <div
    style={{
      minWidth: "5px",
    }}
      onClick={async () => {
        setClicked(!clicked);
        // In order to only translate it once
        if (translation === "") {
          setTranslation(await translate(value));
        }
      }}
    >
      {clicked ? translation : value}
    </div>
  );
};

export default Word;
