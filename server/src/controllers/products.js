const { connectToDatabase } = require("../utils/mongodb");

exports.show = async (_req, res) => {
    const { db } = await connectToDatabase();

    const products = await db.collection("products").find({}).toArray();
    if (products.length != 0) {
        return res.status(200).json({ products });
    }
};

exports.order = async (req, res) => {
    const { db } = await connectToDatabase();
    const { productsList, total } = req.body;

    db.collection("orders").insertOne(
        { productsList, total },
        (err, result) => {
            if (err) {
                return res.status(400).json({ msg: "somthing went wrong" });
            }
            return res
                .status(200)
                .json({ orderId: result.insertedId.toString() });
        },
    );
};
