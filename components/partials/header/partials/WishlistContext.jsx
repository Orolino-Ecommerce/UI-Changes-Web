import React, { createContext, useContext, useState, useEffect } from "react";
import { wishLists } from "~/core/requests";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistCount, setWishlistCount] = useState(0);

  const UserDetail = JSON.parse(localStorage.getItem("User"));
  const userId = UserDetail ? UserDetail.userId : null;

  useEffect(() => {
    let userId = "";
  const UserDetail = JSON.parse(localStorage.getItem("User"));
  if (UserDetail) {
    userId = UserDetail.userId;
  }
    if (userId) {
      fetchWishlistData();
    }
  }, [userId]);

  const fetchWishlistData = () => {
    wishLists(userId).then((res) => {
      const wishlistData = res?.data?.data || [];
      setWishlistCount(wishlistData.length);
    });
  };

  const updateWishlistCount = (newCount) => {
    setWishlistCount(newCount);
  };

  return (
    <WishlistContext.Provider value={{ wishlistCount, updateWishlistCount }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
