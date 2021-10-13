const { connectToDatabase } = require("../utils/mongodb");

exports.show = async (_req, res) => {
    const { db } = await connectToDatabase();

    const products = await db.collection("products").find({}).toArray();
    if (products.length != 0) {
        return res.status(200).json({ products });
    }
};
