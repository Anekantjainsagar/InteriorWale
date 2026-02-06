const Office = require("../../models/Office");

// Create or update office (upsert operation)
exports.createOffice = async (req, res) => {
  try {
    const { type } = req.body;

    // Check if office with this type already exists
    const existingOffice = await Office.findOne({ type });

    if (existingOffice) {
      // Update existing office
      const updatedOffice = await Office.findOneAndUpdate({ type }, req.body, {
        new: true,
        runValidators: true,
      });

      return res.status(200).json({
        status: "success",
        message: "Office updated successfully",
        data: updatedOffice,
      });
    } else {
      // Create new office
      const office = new Office(req.body);
      await office.save();

      return res.status(201).json({
        status: "success",
        message: "Office created successfully",
        data: office,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

// Alternative approach using MongoDB's upsert option
exports.createOfficeUpsert = async (req, res) => {
  try {
    const { type } = req.body;

    const office = await Office.findOneAndUpdate(
      { type }, // filter
      req.body, // update data
      {
        new: true,
        upsert: true, // Create if doesn't exist
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    res.status(200).json({
      status: "success",
      data: office,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

// Get all offices
exports.getAllOffices = async () => {
  try {
    const offices = await Office.find().lean();
    if (!offices || offices.length === 0) {
      throw new Error("No offices found");
    }
    return offices;
  } catch (error) {
    console.error("Error in getAllOffices:", error);
    throw error; // Let the controller handle the response
  }
};

// Update office by ID
exports.updateOffice = async (req, res) => {
  try {
    const office = await Office.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!office) {
      return res.status(404).json({
        status: "fail",
        message: "Office not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: office,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

// Delete office
exports.deleteOffice = async (req, res) => {
  try {
    const office = await Office.findByIdAndDelete(req.params.id);

    if (!office) {
      return res.status(404).json({
        status: "fail",
        message: "Office not found",
      });
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
