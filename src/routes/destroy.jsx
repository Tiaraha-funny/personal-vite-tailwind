import { redirect } from "react-router-dom"
import { deleteContact } from "../contacts"

// This function is called when we press the delete button which also trigger the loader for revalidating data
export async function action({ params }) {
    await deleteContact(params.contactId)
    return redirect("/")
  }
  