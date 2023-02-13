module.exports = {
  getHome: async (req, res) => {
    try {
      res.status(200).render("public/home");
    } catch (error) {
      console.log(error);
    }
  },
};
