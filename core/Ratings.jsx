import React from "react";
const Ratings = (reviews) => {
  // Check for empty reviews array
  if (!reviews || reviews.length === 0) {
    return 0; // or return a default value
  }

  const totalReviews = reviews.length;

  // Calculate the total rating, considering undefined ratings
  const totalRating = reviews.reduce(
    (sum, review) => sum + (review.reviews_rating || 0),
    0
  );

  // Calculate the average rating
  const averageRating = totalRating / totalReviews;
  return averageRating;
};

export default Ratings;
