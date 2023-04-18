import { useCallback, useEffect, useState } from "react";
import { useBeforeUnload } from "react-router-dom";

// The   useBeforeUnload is playing an important role when it comes to saving some states on a page like a browser's local storage before the user navigates.
//  They can restore the stateful info when they come back to the page.


export default function BeforeUnload() {
  const [state, setState] = useState(null);

  // save it off before users navigate away
  useBeforeUnload(
    useCallback(() => {
      localStorage.stuff = state;
    }, [state])
  );

  // read it in when they return
  useEffect(() => {
    if (state === null && localStorage.stuff != null) {
      setState(localStorage.stuff);
    }
  }, [state]);

  console.log('state::::::', state);

  return <>{/*... */}</>;
}