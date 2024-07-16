/**
 * returns the session belonging to the transaction of the req.session if exists
 * @returns ClientSession
 */ export async function withSession(db, req) {
    let transactionID = req.transactionID;
    if (transactionID instanceof Promise) {
        transactionID = await req.transactionID;
    }
    if (req) return db.sessions[transactionID] ? {
        session: db.sessions[transactionID]
    } : {};
}

//# sourceMappingURL=withSession.js.map