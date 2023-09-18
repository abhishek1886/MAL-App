import { createContext, useState } from 'react';

const MyContext = createContext();

export function MyContextProvider({ children }) {
  const [data, setData] = useState('');

  return (
    <MyContext.Provider value={{ data, setData }}>
      {children}
    </MyContext.Provider>
  );
}

export default MyContext;