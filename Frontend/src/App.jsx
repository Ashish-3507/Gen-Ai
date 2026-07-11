import {router} from "./app.route.jsx";
import { RouterProvider } from "react-router";
import { AuthProvider } from "../src/features/auth/auth.context.jsx";
function App() {

  return (
    <>
    <AuthProvider>
      <RouterProvider router ={router} />
    </AuthProvider>
    </>
  )
}

export default App
