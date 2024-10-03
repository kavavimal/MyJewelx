import { useState } from "react";

export default function WishlistButton({ userId, productId }) {
  const [loading, setLoading] = useState(false);

  const addToWishlist = async () => {
    setLoading(true);
    const res = await fetch("/api/addToWishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, productId }),
    });

    if (res.ok) {
      alert("Added to wishlist!");
    } else {
      alert("Failed to add to wishlist");
    }
    setLoading(false);
  };

  return (
    <button onClick={addToWishlist} disabled={loading}>
      {loading ? "Adding..." : "Add to Wishlist"}
    </button>
  );
}
