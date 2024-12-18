import React, { createContext, useState, useContext } from "react";

const MessageContext = createContext();
export function MessageProvider({ children }) {
  const [message, setMessage] = useState({
    data: null,
    selection: null,
    isChecked: false,
    nomineeName: [],
    inputValue: "",
  });

  return (
    <MessageContext.Provider value={{ message, setMessage }}>
      {children}
    </MessageContext.Provider>
  );
}

export function useMessage() {
  return useContext(MessageContext);
}
