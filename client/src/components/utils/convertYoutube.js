const convertYoutube = link => {
    return link.replace("watch?v=", "embed/")
}

export default convertYoutube

// https://www.youtube.com/watch?v=EMQuNczjUo0
// https://www.youtube.com/embed/EMQuNczjUo0