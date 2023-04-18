import { useEffect } from "react";
import {
  Outlet,
  Link,
  useLoaderData,
  Form,
  useSubmit,
  useNavigation,
  useFetcher,
} from "react-router-dom";
import { createContact, getContacts } from "../contacts";

export async function loader({ request }) {
  const url = new URL(request.url)
  const q = url.searchParams.get("q")
  const contacts = await getContacts(q);
  return { contacts, q };
}

export async function action() {
  const contact = await createContact();
  return { contact };
}

export default function Root() {
  // This is one way to access the data that is returned from loader
  const { contacts, q } = useLoaderData()
  const navigation = useNavigation()
  const submit = useSubmit()

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          {/* The loader function is triggered as Form communicates with it  */}
          <Form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onChange={(event) => {
                submit(event.currentTarget.form);
              }}
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={true}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
          </Form>
          {/* When we press this button, the action function is called to make a post request which makes the loader being called for revalidating the data */}
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <Link to={`contacts/${contact.id}`}>
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div
        id="detail"
        className={
          navigation.state === "loading" ? "loading" : ""
        }
      >
        <Outlet />
      </div>

    </>
  );
}