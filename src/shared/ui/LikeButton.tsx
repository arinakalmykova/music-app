import { Heart } from "phosphor-react";

interface LikeButtonProps {
  liked: boolean;
  onToggle: () => void;
}

export function LikeButton({liked, onToggle}: LikeButtonProps) {

  return (
    <Heart
      size={24}
      weight={liked ? "fill" : "regular"}
      color={liked ? "red" : "#242424"}
      className="cursor-pointer"
      onClick={onToggle}
    />
  );
}
