import App from "./App"
import ErrorPage from "./components/ErrorPage"
import Home from "./components/Home"
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import CreateSneaker from "./components/CreateSneaker"
import SneakerView from "./components/SneakerView"
import CartPage from "./components/Cart"
import UseContext from"./context/UserContext.js"




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
            path: "/currentuser",
            element:<UseContext />
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
            element:<CreateSneaker />
        },
        {
            path:'/cart',
            element:<CartPage />
        },
        {
            path:'/sneaker/:id',
            element: <SneakerView />
        }
        ],
    },
    
];

export default routes