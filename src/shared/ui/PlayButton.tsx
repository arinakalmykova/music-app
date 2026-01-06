import { useState } from "react";
import { Play,Pause } from "phosphor-react";

export function PlayButton() {
  const [play, setPlay] = useState(false);

  return (
    play? 
        <Pause 
        size={24} 
        color={"#242424"}
        onClick={() => setPlay(!play)}/>:
        <Play
        size={24}
        color={"#242424"}
        onClick={() => setPlay(!play)}
        />
  );
}
