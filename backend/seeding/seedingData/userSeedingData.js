const dummyUsers = [
  {
    name: {
      first: "Sarah",
      middle: "",
      last: "Cohen",
    },
    phone: "050-1234567",
    email: "sarah.cohen@email.com",
    password: "Password123!",
    image: {
      url: "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_960_720.png",
      alt: "Sarah Cohen profile image",
    },
    address: {
      state: "",
      country: "Israel",
      city: "Tel-Aviv",
      street: "Dizengoff",
      houseNumber: 125,
      zip: 6546321,
    },
    isAdmin: false,
    isBusiness: false,
  },
  {
    name: {
      first: "David",
      middle: "Ben",
      last: "Levi",
    },
    phone: "052-9876543",
    email: "david.levi@email.com",
    password: "BizPass789$",
    image: {
      url: "https://cdn.pixabay.com/photo/2016/11/18/19/07/happy-1836445_960_720.jpg",
      alt: "David Levi profile image",
    },
    address: {
      state: "",
      country: "Israel",
      city: "Jerusalem",
      street: "King George",
      houseNumber: 42,
      zip: 9426805,
    },
    isAdmin: false,
    isBusiness: true,
  },
  {
    name: {
      first: "Admin",
      middle: "",
      last: "User",
    },
    phone: "054-5555555",
    email: "admin@email.com",
    password: "AdminPass789$",
    image: {
      url: "https://cdn.pixabay.com/photo/2016/03/31/19/58/avatar-1295429_960_720.png",
      alt: "Admin user profile image",
    },
    address: {
      state: "",
      country: "Israel",
      city: "Haifa",
      street: "Carmel",
      houseNumber: 15,
      zip: 3109601,
    },
    isAdmin: true,
    isBusiness: false,
  },
];

module.exports = dummyUsers;
