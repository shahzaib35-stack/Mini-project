import requirementModel from "../models/requirement.model.js"
async function formData(req, res) {
  try {
    const requirement = await requirementModel.create({
      ...req.body,
      user: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Requirement submitted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
export const getUser = async (req, res) => {
  try {
    const allData = await requirementModel.find({});

    return res.status(200).json({
      success: true,
      allData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const DeleteData = async (req, res) => {
  try {
    const { id } = req.body;

    const deletedRequirement = await requirementModel.findByIdAndDelete(id);

    if (!deletedRequirement) {
      return res.status(404).json({
        success: false,
        message: "Requirement not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Requirement deleted successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while deleting requirement",
    });
  }
};
export default { formData ,getUser,DeleteData};
