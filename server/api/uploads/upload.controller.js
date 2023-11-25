const { profile } = require("../../config/sequelizeDB");
const { uploadProfilePicture, getProfilePicture } = require("./upload.service");

module.exports = {


  uploadProfilePic: (req, res) => {
    const { userId } = req.body;
    uploadProfilePicture(userId, req, res, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Database connection error!' });
      }
      return res.status(200).json({ data: results });
    });
  },

  getProfilePic: (req, res) => {
    const id = req.query.userId;

    profile.findOne({ where: { user_id: id } })
      .then((profilePicName) => {
        if (!profilePicName) {
          return res.status(404).json({ msg: 'Profile picture not found' });
        }
        // console.log(profilePicName.data);

        const filename = profilePicName.dataValues.profile_picture; 

        const filePath = getProfilePicture(filename);
        // console.log(filePath);
        // Set the appropriate headers to serve the file
        res.setHeader('Content-Type', 'image/*');
        // Set the correct content type for the file
        res.sendFile(filePath);
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({ msg: 'Error retrieving profile picture' });
      });
  }


  // getProfilePic: (req, res) => {
  //   const id = req.query.userId;
  
  //   profile.findOne({ where: { user_id: id } })
  //     .then((profilePicName) => {
  //       if (!profilePicName) {
  //         return res.status(404).json({ msg: 'Profile picture not found' });
  //       }
  //       console.log(profilePicName.data);
  
  //       const filename = profilePicName.dataValues.profile_picture; // Access the profile_picture field correctly

  //       const filePath = path.join(__dirname, '../../../uploads', filename);
  //         console.log(filePath);
  //         // Set the appropriate headers to serve the file
  //         res.setHeader('Content-Type', 'image/*');
  //         // Set the correct content type for the file
  //         res.sendFile(filePath);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       return res.status(500).json({ msg: 'Error retrieving profile picture' });
  //     });
  // },
}