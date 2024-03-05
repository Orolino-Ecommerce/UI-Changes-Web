import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import ALink from "~/components/features/alink";
import { useWishlist } from "./WishlistContext";

function WishlistMenu() {
  const { wishlistCount } = useWishlist();
  return (
    <ALink href="/bd/wishlist" className="wishlist-link" title="Wishlist">
      <i className="icon-heart-o"></i>
      <span className="wishlist-count">{wishlistCount}</span>
      {/* <span className="wishlist-txt">My Wishlist</span> */}
    </ALink>
  );
}

function mapStateToProps(state) {
  return {
    wishlist: state.wishlist.data,
  };
}

export default connect(mapStateToProps, {})(WishlistMenu);
