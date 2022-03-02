// All Pages
import Home from "../pages/Home"
import NotFound from "../pages/NotFound"

// Auth
import Signup from "../pages/auth/Signup"
import SignupArtist from "../pages/auth/SignupArtist"
import Login from "../pages/auth/Login"
import ThankYou from "../pages/auth/ThankYou"
import ForgotPassword from "../pages/auth/ForgotPassword"
import ForgotSent from "../pages/auth/ForgotSent"
import ResetPassword from "../pages/auth/ResetPassword"
import Goodbye from "../pages/auth/Goodbye"
import Verify from "../pages/auth/Verify"

// User
import MyAccount from "../pages/user/MyAccount"
import EditAccount from "../pages/user/EditAccount"
import EditPassword from "../pages/user/EditPassword"
import Conversation from "../pages/user/Conversation"

// Artists
import AllArtists from "../pages/artists/AllArtists"
import SearchResults from "../pages/artists/SearchResults"
import ArtistDetail from "../pages/artists/ArtistDetail"

const routes = [
    // All pages
    {
        path: "/",
        element: Home,
        protected: false,
        anon: false,
        edit: false,
    },
    {
        path: "*",
        element: NotFound,
        protected: false,
        anon: false,
        edit: false,
    },

    // Auth
    {
        path: "/signup/user",
        element: Signup,
        protected: false,
        anon: true,
        edit: false,
    },
    {
        path: "/signup/artist",
        element: SignupArtist,
        protected: false,
        anon: true,
        edit: false,
    },
    {
        path: "/login",
        element: Login,
        protected: false,
        anon: true,
        edit: false,
    },
    {
        path: "/thank-you",
        element: ThankYou,
        protected: false,
        anon: false,
        edit: false,
    },
    {
        path: "/login/forgot-password",
        element: ForgotPassword,
        protected: false,
        anon: true,
        edit: false,
    },
    {
        path: "/login/forgot-password/email-sent",
        element: ForgotSent,
        protected: false,
        anon: true,
        edit: false,
    },
    {
        path: "/reset-password/:token/:id",
        element: ResetPassword,
        protected: false,
        anon: false,
        edit: false,
    },
    {
        path: "/goodbye",
        element: Goodbye,
        protected: false,
        anon: true,
        edit: false,
    },
    {
        path: "/verify/:token/:id",
        element: Verify,
        protected: true,
        anon: true,
        edit: true,
    },

    // User
    {
        path: "/my-account",
        element: MyAccount,
        protected: true,
        anon: false,
        edit: false,
    },
    {
        path: "/my-account/edit",
        element: EditAccount,
        protected: true,
        anon: false,
        edit: true,
    },
    {
        path: "/my-account/edit-password",
        element: EditPassword,
        protected: true,
        anon: false,
        edit: true,
    },
    {
        path: "/my-account/conversation/:id",
        element: Conversation,
        protected: true,
        anon: false,
        edit: true,
    },

    // Artists
    {
        path: "/all-artists/page-:pageNumber",
        element: AllArtists,
        protected: false,
        anon: false,
        edit: false,
    },
    {
        path: "/results/:city/:genre/page-:pageNumber",
        element: SearchResults,
        protected: false,
        anon: false,
        edit: false,
    },
    {
        path: "/artists/:id",
        element: ArtistDetail,
        protected: false,
        anon: false,
        edit: true,
    },
]

export default routes
