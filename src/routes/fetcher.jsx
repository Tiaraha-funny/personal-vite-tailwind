import { useFetcher } from "react-router-dom";

export function FetcherEx() {
    const fetcher = useFetcher();

    useEffect(() => {
      if (fetcher.state === "idle" && !fetcher.data) {
        // This loads data from the route loader that is only on the leaf match
        // The loader is called to get a new data
        fetcher.load("/contacts");
      }
    }, [fetcher]);

    return (
      // This doesn't cause a navigation
      <fetcher.Form method="post" action="/contacts">
        <input type="text" />
      </fetcher.Form>
    );
  }