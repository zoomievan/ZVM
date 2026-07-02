import { query } from "./_generated/server";

function bookingFromDoc(doc: any) {
  return {
    id: doc._id,
    vanId: doc.vanId ?? "",
    fsa: doc.fsa,
    customerName: doc.customerName,
    dogName: doc.dogName,
    date: doc.date,
    sessionFee: doc.sessionFee,
    surcharge: doc.surcharge,
    status: doc.status,
    createdAt: new Date(doc.createdAt).toISOString(),
  };
}

export const list = query({
  args: {},
  handler: async (ctx) => {
    const bookings = await ctx.db.query("bookings").collect();
    return bookings.map(bookingFromDoc);
  },
});
