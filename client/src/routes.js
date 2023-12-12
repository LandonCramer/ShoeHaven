import App from "./App"
import ErrorPage from "./components/ErrorPage"
import Home from "./components/Home"
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import Sneaker from "./components/Sneaker"
import SneakerView from "./components/SneakerView"




const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
        {
            path: "/",
            element:<Home />
        },

        {
            path: "/login",
            element:<Login />
        },
        {
            path:'/signup',
            element:<SignUp />
        },
        {
            path:'/sneaker',
            element:<Sneaker />
        },
        {
            path:'/sneaker/:id',
            element: <SneakerView/>
        }
        ],
    },
    
];

export default routes