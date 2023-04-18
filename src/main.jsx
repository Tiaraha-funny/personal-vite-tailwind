import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './error-page'
import './index.css'
import ActionDataEx, { action as useActionDataAction } from './routes/actionData'
import BeforeUnload from './routes/beforeUnload'
import Contact, { loader as contactLoader, action as contactAction } from './routes/contact'
import { action as destroyAction } from './routes/destroy'
import EditContact, { action as editAction } from './routes/edit'
import { FetcherEx } from './routes/fetcher'
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";
// 1-CALL: The loader is called as we are going to render our root component
// 2-CALL: When we click an action button, the action is called. The loader will be called to revalidate the data.
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
        action: contactAction
      },
      {
        path: "contacts/:contactId/edit",
        element: <EditContact />,
        action: editAction,
        loader: contactLoader
      },
      {
        path: "contacts/:contactId/destroy",
        action: destroyAction
      },
      {
        path: "action-data",
        action: useActionDataAction,
        element: <ActionDataEx />
      },
      {
        path: "before-unload",
        element: <BeforeUnload />
      },
      {
        path: "fetcher",
        loader: rootLoader,
        element: <FetcherEx/>
      }
    ],
  },

])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
