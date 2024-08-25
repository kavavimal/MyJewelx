"use client";

import LoadingDots from "@/components/loading-dots";

const { addReviewReplay } = require("@/actions/review");
const {
  default: ButtonComponent,
} = require("@/components/frontend/ButtonComponent");
const { showToast } = require("@/utils/helper");
const { Textarea } = require("@material-tailwind/react");
const { useState } = require("react");

const ReplayOnReview = ({ review }) => {
  const [loading, setLoading] = useState(false);
  const [replay, setReplay] = useState("");
  const handleSubmit = async () => {
    if (replay !== "") {
      setLoading(true);
      const res = await addReviewReplay(review.id, replay);
      if (res.status === "success") {
        showToast({ message: "Replay added Successfully" });
      }
      setLoading(false);
    } else {
      showToast({ message: "replay is required", type: "error" });
    }
  };
  return (
    <div>
      <Textarea
        label="Add Response"
        name="replay"
        value={replay}
        onChange={(e) => setReplay(e.target.value)}
      />

      <button
        type="button"
        className="flex items-center gap-2 px-4 py-2 hover:shadow-none hover:opacity-90 shadow-none rounded bg-primary-200 text-black font-emirates"
        onClick={handleSubmit}
        disabled={loading}
      >
        Submit {loading && <LoadingDots />}
      </button>
    </div>
  );
};

export default ReplayOnReview;
