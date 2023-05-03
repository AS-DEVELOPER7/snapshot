import React, { useContext, useEffect, useRef, useState } from "react";

import { createContext } from "react";
const Context = createContext();
const StateContext = ({ children }) => {
  const [userId, setUserId] = useState();
  const [collectionId, setCollectionId] = useState();
  const [postId, setPostId] = useState();
  const [accountPost, setAccountPost] = useState();
  return (
    <Context.Provider
      value={{
        userId,
        setUserId,
        collectionId,
        setCollectionId,
        postId,
        setPostId,
        accountPost,
        setAccountPost,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default StateContext;

export const useStateContext = () => useContext(Context);
