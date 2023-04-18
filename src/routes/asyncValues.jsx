import { useAsyncValue, Await, useAsyncError } from "react-router-dom";

// useAsyncValue returns the resolved data from the nearest <Await> ancestor component.
function ProductVariants() {
    const variants = useAsyncValue();
    return <div>{/* ... */}</div>;
  }
  
  // Await creates the context for the value
  <Await resolve={somePromiseForProductVariants}>
    <ProductVariants />
  </Await>;

// useAsyncError returns the rejection value from the nearest [<Await>][await] component.
function ErrorElement() {
    const error = useAsyncError();
    return (
      <p>Uh Oh, something went wrong! {error.message}</p>
    );
  }
  
  <Await
    resolve={promiseThatRejects}
    errorElement={<ErrorElement />}
  />;