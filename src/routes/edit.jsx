import { Form, redirect, useLoaderData } from "react-router-dom";
import { updateContact } from "../contacts";

// React Router prevents the browser to send request to the server but sends the request to your action instead, including the FormData.
export async function action({ request, params }) {
  const formData = await request.formData()
  const updated = Object.fromEntries(formData)
  await updateContact(params.contactId, updated)
  return redirect(`/contacts/${params.contactId}`)
}

export default function EditContact() {
  // This is used to get access to the value returned from loader func.
  const { contact } = useLoaderData();

  return (
    // The method post allows the Form to communicate with the action function, so the data will be revalidated from the loader func.
    <Form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          // We should always have default value as we do not want to control the input
          defaultValue={contact.first}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue={contact.last}
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultValue={contact.twitter}
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact.avatar}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea
          name="notes"
          defaultValue={contact.notes}
          rows={6}
        />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button">Cancel</button>
      </p>
    </Form>
  );
}