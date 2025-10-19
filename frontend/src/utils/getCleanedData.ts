import { TCards, TUsers } from "@/Types";

export const cleanedUserData = (user: TUsers) => ({
        name: {
            first: user.name.first,
            middle: user.name?.middle || '',
            last: user.name.last,
        },
        phone: user.phone,
        image: {
            url: user.image?.url || '',
            alt: user.image?.alt || '',
        },
        address: {
            country: user.address?.country,
            state: user.address?.state === "not defined" || !user.address?.state ? '' : user.address?.state,
            city: user.address?.city,
            street: user.address?.street,
            houseNumber: String(user.address?.houseNumber),
            zip: String(user.address?.zip),
        }
});

export const cleanedCardData = (card: TCards) => ({
        title: card.title,
        subtitle: card.subtitle,
        description: card.description,
        phone: card.phone,
        email: card.email,
        web: card.web,
        image: {
            url: card.image?.url || '',
            alt: card.image?.alt || '',
        },
        address: {
            country: card.address?.country,
            state: card.address?.state || '',
            city: card.address?.city,
            street: card.address?.street,
            houseNumber: String(card.address?.houseNumber),
            zip: String(card.address?.zip),
        }
    })