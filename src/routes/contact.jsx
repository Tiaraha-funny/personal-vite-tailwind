import { useEffect } from "react";
import { Form, useFetcher, useLoaderData } from "react-router-dom";
import { getContact, updateContact } from "../contacts";

export async function loader({ params }) {
    const contact = await getContact(params.contactId);
    return { contact };
}

export async function action({ params, request }) {
    const formData = await request.formData()
    return await updateContact(params.contactId, {
        favorite: formData.get('favorite') === "true",
    })
}

// while data is in flight, use that to immediately render the state you expect the task to be in when the form submission completes, instead of waiting for the network to respond. When the network responds, the formData will no longer be available and the UI will use the value in `task.status` from the revalidation

export default function Contact() {
    // We get the returned data from loader here
    const { contact } = useLoaderData()
    const fetcher = useFetcher()
    console.log('fetcher:::data:::', fetcher.data);
    console.log('fetcher.state::::::', fetcher.state);

      useEffect(() => {
        if (fetcher.state === "idle") {
          fetcher.load("/contacts/:contactId");
        }
      }, []);


    return (
        <div id="contact">
            <div>
                <img
                    key={contact.avatar}
                    src={contact.avatar || null}
                />
            </div>

            <div>
                <h1>
                    {contact.first || contact.last ? (
                        <>
                            {contact.first} {contact.last}
                        </>
                    ) : (
                        <i>No Name</i>
                    )}{" "}
                    <Favorite contact={contact} />
                </h1>

                {contact.twitter && (
                    <p>
                        <a
                            target="_blank"
                            href={`https://twitter.com/${contact.twitter}`}
                        >
                            {contact.twitter}
                        </a>
                    </p>
                )}

                {contact.notes && <p>{contact.notes}</p>}

                <div>
                    {/* The action is called and the loader is also called after the action */}
                    <Form action="edit">
                        <button type="submit">Edit</button>
                    </Form>
                    {/* The action is called and the loader is also called after the action */}
                    <Form
                        method="post"
                        action="destroy"
                    >
                        <button type="submit">Delete</button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

function Favorite({ contact }) {
    const fetcher = useFetcher()
    // yes, this is a `let` for later
    let favorite = contact.favorite;
    return (
        // In this case, the fetcher.Form is communicating with action function with post method and the loader will be called for revalidating the data.
        <fetcher.Form method="post">
            <button
                name="favorite"
                value={favorite ? "false" : "true"}
                aria-label={
                    favorite
                        ? "Remove from favorites"
                        : "Add to favorites"
                }
            >
                {favorite ? "★" : "☆"}
            </button>
        </fetcher.Form>
    );
}