// Packages
require("dotenv/config")
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGODB_URI)

// Model
const User = require("../models/User.model")

// Utils
const { getRandom, getRandomNumber, getRandomDate, convertToEmail } = require("js-utils-julseb")

// Data
const artists = require("./seeds/artists.json")
const bio = require("./seeds/bio.json")
const cities = require("./seeds/cities.json")
const genres = require("./seeds/genres.json")
const pictures = require("./seeds/pictures.json")

// Test Salt password
const bcrypt = require("bcryptjs")
const password = "Password42"
const salt = bcrypt.genSaltSync()
const hash = bcrypt.hashSync(password, salt)

let fakeArtists = []

const randomPrice = () => getRandomNumber(5, 150) * 100

// https://source.unsplash.com/1600x900/?band
// https://baconipsum.com/api/?type=meat-and-filler

for (let i = 0; i < artists.length; i++) {
    fakeArtists.push({
        fullName: artists[i],
        email: convertToEmail(artists[i]),
        password: hash,
        role: "artist",
        city: getRandom(cities),
        imageUrl: pictures[i],

        genre: getRandom(genres),
        bio: bio,
        price: randomPrice(),
        available: [
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
        ],
        visible: true,
        verified: true,
    })
}

const realArtists = [
    {
        fullName: "Rone",
        email: "rone@email.com",
        password: hash,
        city: getRandom(cities),
        role: "artist",
        imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/f/f3/Rone_live_%C3%A0_Los_Lobos_-_Los_Angeles.png",
        genre: "Electronic",
        bio: 'As Rone, Paris - bred producer Erwan Castex creates music that is both otherworldly and warm, marrying cinematic ambitions to sounds and ideas rooted in minimal and experimental techno.\nEstablishing a shimmering, melodic techno sound with his 2009 debut, Spanish Breakfast, his music gradually became more elaborately constructed and stylistically diverse.\nAlbums such as 2014\'s Creatures and 2017\'s Mirapolis featured guest appearances from Saul Williams, Bryce Dessner(the National), and Etienne Daho, while incorporating symphonic arrangements, trance elements, heartfelt balladry, and more.\nBorn in the Parisian suburb of Boulogne - Billancourt in 1980, he debuted his Rone project in 2007, co - producing several tracks with Italian techno artist Lucy.After attracting the attention of French producer Agoria, Rone was signed to the InFiné label in 2008, making his solo debut with the Bora EP.\nFollowing the single "La Dame Blanche", his debut album, Spanish Breakfast, landed on the imprint in 2009. In 2011, Castex moved to Berlin and recorded his sophomore effort, Tohu Bohu, a 2012 release that featured rapper High Priest from Antipop Consortium.The album\'s biggest single, "Bye Bye Macadam," hit in 2013 thanks in part to a virally successful animated video and a Juan Atkins remix, while that same year, the National hired Rone to provide soundscapes for their album Trouble Will Find Me.',
        price: randomPrice(),
        available: [
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
        ],
        youtube: [
            "https://www.youtube.com/embed/03Y27qBl8Js",
            "https://www.youtube.com/embed/ZtONGk-ViRk",
            "https://www.youtube.com/embed/SQIoaBCXCYQ",
        ],
        youtubeLink: "https://www.youtube.com/channel/UCFBjUE5XIqzIj4IyRo1qPDQ",
        facebookLink: "https://www.facebook.com/roneofficial",
        instagramLink: "https://www.instagram.com/roneofficial/",
        visible: true,
        verified: true,
    },
    {
        fullName: "Justice",
        email: "justice@email.com",
        password: hash,
        city: getRandom(cities),
        role: "artist",
        imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/7/7d/Justice_%28band%29.jpg",
        genre: "Electronic",
        bio: "Described as “electronica that rocks” by The New York Times, the French duo Justice made a huge noise in the late 2000s with their boisterous blend of house, disco and rock.\n\n• Gaspard Augé and Xavier de Rosnay studied graphic design in college before forming Justice in 2003. Early on, they created a remix of the UK rock group Simian’s “Never Be Alone” for a radio contest. They didn’t win, but they earned a deal with Ed Banger Records.\n• Their blog-hyped 2007 debut album, Cross (also styled as † or Justice), topped the US and UK dance charts and earned a Grammy nomination for Best Electronic/Dance Album.\n• The single “D.A.N.C.E.” reached No. 1 on the UK dance charts and nabbed a Grammy nomination for Best Dance Recording.\n• Their roaring remix of MGMT’s “Electric Feel” won them a Grammy for Best Remixed Recording, Nonclassical, in 2009.\n• Justice’s 2011 sophomore effort, Audio, Video, Disco, made the Top 40 on the Billboard 200.\n• In 2019, Justice won a Grammy for Best Dance/Electronic Album for Woman Worldwide, featuring reworked tracks from throughout their career.\n• Justice have remixed songs by artists across the sonic spectrum, including Britney Spears, Daft Punk, N.E.R.D. and Fatboy Slim.",
        price: randomPrice(),
        available: [
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
        ],
        youtube: [
            "https://www.youtube.com/embed/VKzWLUQizz8",
            "https://www.youtube.com/embed/sy1dYFGkPUE",
        ],
        youtubeLink: "https://www.youtube.com/channel/UCQ5Ssrs48yJBfOesfDqXUeA",
        facebookLink: "https://www.facebook.com/etjusticepourtous",
        instagramLink: "https://www.instagram.com/etjusticepourtous/",
        visible: true,
        verified: true,
    },
    {
        fullName: "Rolling Stones",
        email: "rolling-stones@email.com",
        password: hash,
        city: getRandom(cities),
        role: "artist",
        imageUrl:
            "https://www.groningermuseum.nl/de/media/2/Tentoonstellingen/2020/RS/_1200x630_crop_center-center_82_none/TheRollingStones.jpg?mtime=1594374283",
        genre: "Rock",
        bio: 'It wasn’t that rock music didn’t exist before The Rolling Stones—it did. But it didn’t exist at quite the same scale, or with the same reach, or the same sheer attitude that made the Stones so seismic. You wonder if it had something to do with their otherness, as though the fact that the American sounds they emulated—blues, country, R&B—didn\'t belong to them made them both more reverential and more free to explore. Like excavations from an archaeological dig, the band’s best music played out like a conversation between present and past, finding fresh meaning and connections in sounds that feel classic, bygone. Mick Jagger once said he’d rather be dead than singing "Satisfaction" at 45. Certainly there were other artists of his generation who took the same attitude, figuratively and otherwise. Un-rock as it may be, The Rolling Stones decided to live.\nFormed in 1962 by singer Jagger and guitarist Keith Richards (Richards spotted Jagger carrying Muddy Waters and Chuck Berry records on a train platform), the band—which went on to include jazz drummer Charlie Watts and bassist Ron Wood, among others—became one of the spearheads of the British Invasion, bad boys to The Beatles’ teddy bears. They toyed with folk and psychedelia in the mid-\'60s ("Ruby Tuesday", "Mother’s Little Helper"), but always circled back to something grittier, darker, the "Under My Thumb"s and "Paint It Black"s.',
        price: randomPrice(),
        available: [
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
        ],
        youtube: ["https://www.youtube.com/embed/O4irXQhgMqg"],
        youtubeLink: "https://www.youtube.com/channel/UCB_Z6rBg3WW3NL4-QimhC2A",
        visible: true,
        verified: true,
    },
    {
        fullName: "Polo and Pan",
        email: "polo-and-pan@email.com",
        password: hash,
        city: getRandom(cities),
        role: "artist",
        imageUrl:
            "https://media.newyorker.com/photos/5c06ac55e6e9b82d59fdffb4/master/pass/REC-Taladrid-PoloPan.jpg",
        genre: "Electronic",
        bio: 'The French electronic duo Polo & Pan are sample-loving gearheads who draw from past eras and different continents to create their exotic disco- and house-tinged dance music.\n\n• Parisian musicians Paul Armand-Delille (Pol) and Alexandre Grynszpan (Pan) joined forces in the early 2010s. The pair had connected as resident DJs at the club Le Baron.\n• Typical of their approach, Polo & Pan’s 2013 debut single, "Rivolta", pairs disco bass with a sample of a ’30s-era Italian song.\n• After a few EPs, the duo released their full-length debut, Caravelle, in 2017. Blending disco, house and lush French melodies, the album achieved over 100 million streams globally.\n• The duo has an extensive collection of musical equipment. In 2020, Polo & Pan acquired a pair of compressors formerly owned by disco icons The Bee Gees.',
        price: randomPrice(),
        available: [
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
        ],
        youtube: [
            "https://www.youtube.com/embed/CsGauHXioos",
            "https://www.youtube.com/embed/RZsRgBGfXz0",
        ],
        youtubeLink: "https://www.youtube.com/channel/UCQUFWrwQshjbq3VN0yfm_5Q",
        facebookLink: "https://www.facebook.com/polopan.music",
        visible: true,
        verified: true,
    },
    {
        fullName: "Julien artist",
        email: "b@c.com",
        password: hash,
        city: "Berlin",
        role: "artist",
        imageUrl:
            "https://res.cloudinary.com/dyfxmafvr/image/upload/v1640201697/artists-booking-app/p4qeldrfg8vv1uf745fg.jpg",
        genre: "Techno",
        bio: bio,
        price: randomPrice(),
        available: [
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
            getRandomDate(2022, 2023),
        ],
        visible: true,
        verified: true,
    },
]

const realUser = {
    fullName: "Julien Sebag",
    email: "a@b.com",
    password: hash,
    city: "Berlin",
    role: "user",
    imageUrl:
        "https://res.cloudinary.com/dyfxmafvr/image/upload/v1640201697/artists-booking-app/p4qeldrfg8vv1uf745fg.jpg",
    verified: true,
}

User.insertMany(realArtists)
    .then(artist => {
        console.log(
            `Success, ${artist.length} artists were added to the database`
        )
    })
    .catch(err => console.log(err))

User.insertMany(fakeArtists)
    .then(artist => {
        console.log(
            `Success, ${artist.length} artists were added to the database`
        )
    })
    .catch(err => console.log(err))

User.insertMany(realUser)
    .then(user => {
        console.log(
            `Success, ${user.length} ${
                user.length === 1 ? "user was" : "users were"
            } added to the database`
        )
        mongoose.connection.close()
    })
    .catch(err => console.log(err))
