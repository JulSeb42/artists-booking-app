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
    {
        path: "/results/all/all/page-1",
        to: "/all-artists/page-1"
    },
]

export default redirects
