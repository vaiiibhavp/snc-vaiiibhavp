import React, { createContext, useState } from 'react';

export const BooleanContext = createContext();

export const BooleanProvider = ({ children }) => {
  const [enableLogs, setEnableLogs] = useState(true);

  const toggleValue = () => {
    setEnableLogs((prevValue) => !prevValue);
  };

  return (
    <BooleanContext.Provider value={{ enableLogs, toggleValue }}>
      {children}
    </BooleanContext.Provider>
  );
};