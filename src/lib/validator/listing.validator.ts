import { z } from "zod"

export const createListingValidator = z.object({
    title: z.string({ required_error: "Title is required" }).min(5, "Title should must be at least 5 characters"),
    description: z.string({ required_error: "Description is required" }).min(5, "Description should be at least 5 characters"),    image: z.string({ required_error: "Image is required" }),
    category: z.string({ required_error: "Category is required" }),
    roomCount: z.number({ required_error: " roomCount is required" }).min(1, "Room must be at least 1"),
    bathroomCount: z.number({ required_error: "bathroomCount is required" }).min(1, "bathroom must be at least 1"),
    guestCount: z.number({ required_error: "GuestCount is required" }).min(1, "Guest must be at least"),
    location: z.string({ required_error: "Location is required" }),
    price: z.number({ required_error: "Price is required" }),
})
export type createListingRequest = z.infer<typeof createListingValidator>