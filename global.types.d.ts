export type UserType = {
    _id: string
    name: string,
    email: string,
    image: string,
    password: string
}

export type ListingType = {
    _id: string
    title: string,
    description: string,
    image: string[],
    category: string,
    roomCount: number,
    bathroomCount: number,
    guestCount: number,
    location: string,
    price: number,
    creator: string | UserType
    createdAt: Date,
    type: string
}

export type ReservationType = {
    _id: string
    startDate: Date,
    endDate: Date,
    totalPrice: number,
    listing: ListingType | string
    reserver: string | UserType
}


export type FavType = {
    userId: any,
    listId: ListingType | string,
    _id: string
}