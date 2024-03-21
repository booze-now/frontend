import React from "react";

import { useTranslation } from "contexts/TranslationContext";
// import { useUser } from "contexts/UserContext";
// import { useTheme } from "contexts/ThemeContext";
import { useMessages } from "contexts/MessagesContext";
import { Alert, Fade } from "react-bootstrap";

const MessageArea = () => {
  const { /* language, languages, */ __ /*, changeLanguage*/ } = useTranslation();
  // const { user, login, logout } = useUser(); // || {};
  // const { toggleTheme } = useTheme();
  const { messages, removeMessage } = useMessages();

  return (
    <>
      {Object.keys(messages).map((key) => (

        <Alert
          key={key}
          variant={messages[key].type}
          onClose={() => {
            removeMessage(key);
          }}
          transition={ Fade.in }
          dismissible
        >
          {__(messages[key].message, messages[key].args)}
        </Alert>
      ))}
    </>
  );
};

export default MessageArea;
