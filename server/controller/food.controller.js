const foodData = async (req, res) => {
    try {
        return res.status(200).send([global.foodData , global.catData]);
    } catch (error) {
        console.log("Error in fetching food data: ", error.message);
        return res.status(500).json({ error: error.message, success: false });
    }
}

export { foodData };    