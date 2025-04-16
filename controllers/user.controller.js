import User from "../models/userModel.js";


// @access  Admin (optional protect + admin middleware)
export const getAllUsers = async (req, res) => {
    try {
      const users = await User.find().select('-password');
      res.status(200).json(users);
    } catch (error) {
      console.error('Get All Users Error:', error);
      res.status(500).json({ message: 'Server error while fetching users' });
    }
  };

// @access  Private/Admin
export const getUserById = async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select('-password');
  
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      res.status(200).json(user);
    } catch (error) {
      console.error('Get User By ID Error:', error);
      res.status(500).json({ message: 'Server error while getting user' });
    }
  };

// @access  Private/Admin or Owner
export const updateUser = async (req, res) => {

    const { id } = req.params;

    if (req.user._id.toString() !== id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    try {
      const { name, username, email, bio, profileImage } = req.body;
  
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { name, username, email, bio, profileImage },
        { new: true, runValidators: true }
      ).select('-password');
  
      if (!updatedUser) return res.status(404).json({ message: 'User not found' });
  
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Update User Error:', error);
      res.status(500).json({ message: 'Server error while updating user' });
    }
  };

// @access  Private/Admin or Owner
export const deleteUser = async (req, res) => {

    const { id } = req.params;

    if (req.user._id.toString() !== id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
  
      if (!deletedUser) return res.status(404).json({ message: 'User not found' });
  
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Delete User Error:', error);
      res.status(500).json({ message: 'Server error while deleting user' });
    }
  };



export const updateProfileImage = async (req, res) => {
  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ message: "Image URL is required" });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { profileImage: imageUrl },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Profile image updated successfully",
      profileImage: user.profileImage,
    });
  } catch (error) {
    console.error("Error updating profile image:", error);
    res.status(500).json({ message: "Server error" });
  }
};
