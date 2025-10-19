const normalizeUserResponse = (user) => {
  const normalizedUserData = {
    _id: user._id,
    name: {
      first: user.name.first,
      middle: user.name.middle,
      last: user.name.last,
    },
    phone: user.phone,
    email: user.email,
    image: {
      url: user.image.url,
      alt: user.image.alt,
    },
    address: {
      state: user.address.state,
      country: user.address.country,
      city: user.address.city,
      street: user.address.street,
      houseNumber: user.address.houseNumber,
      zip: user.address.zip,
    },
    isAdmin: user.isAdmin,
    isBusiness: user.isBusiness,
    createdAt: user.createdAt,
  };
  return normalizedUserData;
};

const normalizeCardResponse = (card) => {
  const normalizedCardData = {
    _id: card._id,
    title: card.title,
    subtitle: card.subtitle,
    description: card.description,
    phone: card.phone,
    email: card.email,
    web: card.web,
    image: {
      url: card.image.url,
      alt: card.image.alt,
    },
    address: {
      state: card.address.state,
      country: card.address.country,
      city: card.address.city,
      street: card.address.street,
      houseNumber: card.address.houseNumber,
      zip: card.address.zip,
    },
    bizNumber: card.bizNumber,
    likes: card.likes,
    user_id: card.user_id,
    createdAt: card.createdAt,
  };

  return normalizedCardData;
};

module.exports = { normalizeUserResponse, normalizeCardResponse };
