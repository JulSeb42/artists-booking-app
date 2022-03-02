const redirects = [
    {
        path: "/artists",
        to: "/all-artists",
    },
    {
        path: "/artists/page-:pageNumber",
        to: "/all-artists",
    },
    {
        path: "/all-artists",
        to: "/all-artists/page-1",
    },
    {
        path: "/all-artists/page",
        to: "/all-artists/page-1",
    },
    {
        path: "/my-account/conversation",
        to: "/my-account",
    },
]

export default redirects
