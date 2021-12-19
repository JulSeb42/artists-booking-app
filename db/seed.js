require("dotenv/config")
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGODB_URI)
const User = require("../models/User.model")

// Test Salt password
const bcrypt = require("bcryptjs")
const password = "Password42"
const salt = bcrypt.genSaltSync()
const hash = bcrypt.hashSync(password, salt)

let fakeArtists = []

const artists = [
    "Fart Of Brightness",
    "Unruly Of Cream",
    "Scare Concern",
    "Burying Of Heater",
    "Brass Quik",
    "Palladium Of Applicable",
    "Since Itching Plumber",
    "Down Craze",
    "Vexed Of The Khaki",
    "Rut Of The Deafening",
    "Employee Beyond Galleon",
    "Endurance Above Emerald",
    "Along Rude Chocolate",
    "Crusting Lagoon And The Cottage",
    "Suicidal Of Saddle",
    "Pebble Of The Finally Aerosol",
    "Across Pharmacy",
    "Between Artistry",
    "Mean Plunge And The Vagabond",
    "Parlor Of The Oscar",
    "Pinch Of The Cosmology",
    "Intuitive Dasher And The Trench",
    "Imp Of Reptile",
    "Ignorant Of The Pointless",
    "Poodle Into The Epidemic",
    "Satellite Of The Involuntary Commode",
    "Prozac Up Asset",
    "Vampire Of Rubbing",
    "Contented Dime With The Green Control",
    "Amplification Ascent",
    "Face Flock",
    "Hobbit Of The Sensibility",
    "Moron Omnivore",
    "Absorbed Of The Blowing",
    "Just Hotline",
    "Conjunction After Choir",
    "Abused Spawn",
    "Temperance Of The Troll Hypnotist",
    "Pandemic Of The Powdered",
    "Enigmatic Of Bite",
    "Past Recoil",
    "Cubicle Of The Negative Crust",
    "Within Tangent",
    "Primo Overture",
    "Splinter Link",
]

const genres = [
    "Alt Rock",
    "Blues",
    "Country",
    "Folk",
    "Acoustic",
    "Funk",
    "Heavy Metal",
    "Hip-Hop",
    "Indie",
    "Jazz",
    "Latin",
    "Pop",
    "Punk Rock",
    "Reggae",
    "Rock",
    "R&B",
    "Soul",
    "Electronic",
]

const cities = [
    "Berlin",
    "Hamburg",
    "Frankfurt",
    "Munich",
    "Cologne",
    "Leipzig",
    "Düsseldorf",
]

const pictures = [
    "https://images.unsplash.com/photo-1518501257902-61d237c71f21?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmFuZHx8fHx8fDE2Mzg3MjM0NTA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1580745089089-a9d84551e657?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmFuZHx8fHx8fDE2Mzg3MjM1MDU&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmFuZHx8fHx8fDE2Mzg3MjM1MTY&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1575672913784-11a7cd4f25f4?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmFuZHx8fHx8fDE2Mzg3MjM1MjQ&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1507808973436-a4ed7b5e87c9?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmFuZHx8fHx8fDE2Mzg3MjM1MzI&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmFuZHx8fHx8fDE2Mzg3MjM1NDA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1601856254790-2f47bd818f8a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmFuZHx8fHx8fDE2Mzg3MjM1NDk&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1445375011782-2384686778a0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmFuZHx8fHx8fDE2Mzg3MjM1NTY&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1461784121038-f088ca1e7714?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmFuZHx8fHx8fDE2Mzg3MjM1NjM&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1603624840211-626538522ee5?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmFuZHx8fHx8fDE2Mzg3MjM1ODE&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1566981731417-d4c8e17a9e82?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmFuZHx8fHx8fDE2Mzg3MjM1OTA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1523397546924-a2ff57239daf?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmFuZHx8fHx8fDE2Mzg3MjM1OTg&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1619379180294-3e714910e031?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmFuZHx8fHx8fDE2Mzg3MjM2MTE&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1488036106564-87ecb155bb15?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmFuZHx8fHx8fDE2Mzg3MjM2MjM&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1455997299803-0c4649ca02fa?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmFuZHx8fHx8fDE2Mzg3MjM2MzY&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1499364615650-ec38552f4f34?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmFuZHx8fHx8fDE2Mzg3MjM2NDQ&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1567361672830-f7aa558ec4e3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmFuZHx8fHx8fDE2Mzg3MjM2NTg&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1501612780327-45045538702b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmFuZHx8fHx8fDE2Mzg3MjM2NjU&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1601949799914-81f459abb8d8?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmFuZHx8fHx8fDE2Mzg3MjM2ODk&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1526480450270-7fe59f99fcad?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmFuZHx8fHx8fDE2Mzg3MjM5OTA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1614247912229-26a7e2114c0a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmFuZHx8fHx8fDE2Mzg3MjM5OTg&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1506628150-ab62050f199c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmFuZHx8fHx8fDE2Mzg3MjQwMDg&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1605515340307-f8a51ea98881?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmFuZHx8fHx8fDE2Mzg3MjQwMjA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1534014088752-2a8afc87d509?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmFuZHx8fHx8fDE2Mzg3MjQwNDI&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1476382929176-f7b329008e17?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmFuZHx8fHx8fDE2Mzg3MjQwNTQ&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1493078770291-aa3109c60ef2?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmFuZHx8fHx8fDE2Mzg3MjQwNjE&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1566981731417-d4c8e17a9e82?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmFuZHx8fHx8fDE2Mzg3MjQwNzE&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1510731491328-7363eecd7b2d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmFuZHx8fHx8fDE2Mzg3MjQwODY&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1544013360-983116d2a733?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmFuZHx8fHx8fDE2Mzg3MjQwOTM&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1512405173804-40c66c0ed709?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmFuZHx8fHx8fDE2Mzg3MjQxMDI&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1487702232819-65ae859daf8a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmFuZHx8fHx8fDE2Mzg3MjQxMTU&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1533929702053-9986939ea193?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmFuZHx8fHx8fDE2Mzg3MjQyODI&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmFuZHx8fHx8fDE2Mzg3MjQyOTQ&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1534014088752-2a8afc87d509?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmFuZHx8fHx8fDE2Mzg3MjQzMDM&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1598519502953-96e1fb8d4a09?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmFuZHx8fHx8fDE2Mzg3MjQzMjI&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1598517834429-cf49a9e6077d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmFuZHx8fHx8fDE2Mzg3MjQzMjk&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1471478331149-c72f17e33c73?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmFuZHx8fHx8fDE2Mzg3MjQzNDM&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/flagged/photo-1580745089229-e40944a026f9?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmFuZHx8fHx8fDE2Mzg3MjQzNTQ&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1583725006943-3d7fa80ce7e7?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmFuZHx8fHx8fDE2Mzg3MjQzNzI&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1490915829216-3f2347b1e830?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmFuZHx8fHx8fDE2Mzg3MjQzNzk&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1560381108-d80486d231d7?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmFuZHx8fHx8fDE2Mzg3MjQzODc&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1544427920-c49ccfb85579?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmFuZHx8fHx8fDE2Mzg3MjQzOTY&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1578873375969-d60aad647bb9?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmFuZHx8fHx8fDE2Mzg3MjQ0MjY&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1450044804117-534ccd6e6a3a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmFuZHx8fHx8fDE2Mzg3MjQ0NDM&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmFuZHx8fHx8fDE2Mzg3MjQ0NjA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
]

const bio =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus metus at aliquet bibendum. Maecenas felis risus, malesuada eget felis et, dapibus volutpat felis. Quisque consequat sapien orci, a fringilla est dignissim auctor. Phasellus bibendum placerat faucibus. Nunc placerat eleifend nulla. Phasellus nec mattis enim. Ut ac sagittis augue. Integer luctus diam leo, quis lacinia diam eleifend sit amet. Nullam vel posuere libero. In viverra pretium pulvinar. Nunc et sagittis dolor.\nCras dapibus lectus risus, in tincidunt sapien luctus id. Aenean quis condimentum tellus. Vestibulum sagittis massa dapibus venenatis feugiat. Pellentesque fermentum dui vel nunc luctus, eget dapibus mi sollicitudin. Pellentesque dapibus ligula ex, cursus rhoncus ipsum euismod nec. Morbi viverra lorem nunc, et elementum nibh finibus eu. In lacinia diam risus, a dictum sem viverra non. Nam euismod vestibulum efficitur. Duis id magna molestie, aliquam dui non, dignissim urna. Aliquam vehicula mattis lobortis. Vestibulum vel risus pharetra, lacinia nibh eu, vestibulum tortor. Nullam et augue sit amet nisi hendrerit porttitor. Nullam sit amet sem at est tincidunt interdum. Sed non magna lacinia, porta metus dignissim, elementum lectus.\nNullam a accumsan eros, at ultricies justo. Duis non quam sapien. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed a ipsum elementum, lobortis risus quis, pellentesque odio. In ac tempor eros. Phasellus molestie ipsum sit amet magna sodales, id feugiat orci porta. Cras ac tellus eu dui pharetra consequat sed sit amet metus. Proin lobortis, felis at lacinia sollicitudin, metus urna tempus augue, nec interdum lacus ante et erat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque ac nisl id nisi vestibulum condimentum. Phasellus vitae accumsan purus. Donec tristique vulputate nulla ut dapibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;\nSuspendisse eleifend massa at euismod faucibus. Maecenas vulputate magna vitae turpis consectetur, ut ultricies felis pretium. Sed ultrices, felis a hendrerit venenatis, purus orci porttitor felis, in tempor turpis mi in massa. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla aliquam, lacus consectetur facilisis ultricies, lacus sapien imperdiet velit, vitae interdum sem nisi eget ipsum. Proin sapien eros, vulputate eu turpis et, facilisis feugiat sem. Curabitur et risus justo. Fusce a erat sit amet risus blandit interdum. Proin ultricies, enim a molestie tempor, neque erat euismod eros, eget tristique purus nibh vitae mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget justo in enim euismod condimentum in a neque.\nSuspendisse hendrerit ligula at lacus cursus, ut tincidunt velit posuere. Donec feugiat malesuada quam, ut congue magna tincidunt quis. Fusce lorem purus, laoreet a feugiat ac, mattis in nisl. Sed nunc ligula, ullamcorper luctus placerat id, scelerisque convallis nulla. Quisque in dui sit amet ante accumsan ultricies. Aliquam blandit lacus sapien, a pharetra justo euismod tristique. Mauris dignissim magna sapien, a elementum tortor viverra a. Etiam non suscipit enim. Nunc interdum dapibus vehicula."

const getRandom = arr => {
    const randomNumber = Math.floor(Math.random() * arr.length)
    return arr[randomNumber]
}

const randomPrice = () =>
    parseInt(`${Math.floor(Math.random() * (150 - 5)) + 5}00`)

// https://source.unsplash.com/1600x900/?band
// https://baconipsum.com/api/?type=meat-and-filler

const randomDate = () => {
    let day = Math.floor(Math.random() * (30 - 1)) + 1
    let month = Math.floor(Math.random() * (12 - 1)) + 1
    let year = 2022

    if (day < 10) {
        day = "0" + day
    }

    if (month < 10) {
        month = "0" + month
    }

    if (month === "02") {
        day = Math.floor(Math.random() * (28 - 1)) + 1
    }

    return `${year}-${month}-${day}`
}

const convertToEmail = str => {
    const convertedStr = str.toLowerCase().split(" ").join("-")
    return `${convertedStr}@email.com`
}

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
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
        ],
        visible: true,
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
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
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
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
        ],
        youtube: [
            "https://www.youtube.com/embed/VKzWLUQizz8",
            "https://www.youtube.com/embed/sy1dYFGkPUE",
        ],
        youtubeLink: "https://www.youtube.com/channel/UCQ5Ssrs48yJBfOesfDqXUeA",
        facebookLink: "https://www.facebook.com/etjusticepourtous",
        instagramLink: "https://www.instagram.com/etjusticepourtous/",
        visible: true,
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
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
        ],
        youtube: ["https://www.youtube.com/embed/O4irXQhgMqg"],
        youtubeLink: "https://www.youtube.com/channel/UCB_Z6rBg3WW3NL4-QimhC2A",
        visible: true,
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
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
            randomDate(),
        ],
        youtube: [
            "https://www.youtube.com/embed/CsGauHXioos",
            "https://www.youtube.com/embed/RZsRgBGfXz0",
        ],
        youtubeLink: "https://www.youtube.com/channel/UCQUFWrwQshjbq3VN0yfm_5Q",
        facebookLink: "https://www.facebook.com/polopan.music",
        visible: true,
    },
]

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
        mongoose.connection.close()
    })
    .catch(err => console.log(err))
