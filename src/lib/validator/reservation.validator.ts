import { z } from "zod"

export const createReservationValidator = z.object({
    listingId: z.string({ required_error: "listingId is required" }),
    startDate: z.string({ required_error: "startDate is required" }).optional(),
    endDate: z.string({ required_error: "endDate is required" }).optional(),
    totalPrice: z.number({ required_error: "totalPrice is required" }),
})
export type createReservationRequest = z.infer<typeof createReservationValidator>