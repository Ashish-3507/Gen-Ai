import {router} from "./app.route.jsx";
import { RouterProvider } from "react-router";
import { AuthProvider } from "../src/features/auth/auth.context.jsx";
import { InterviewProvider } from "./features/Report/interview.context.jsx";

function App() {
    return (
        <AuthProvider>
            <InterviewProvider>
                <RouterProvider router={router} />
            </InterviewProvider>
        </AuthProvider>
    );
}

export default App
