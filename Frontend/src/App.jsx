import {router} from "./app.route.jsx";
import { RouterProvider } from "react-router";
import { AuthProvider } from "./features/auth/auth.context.js";
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
