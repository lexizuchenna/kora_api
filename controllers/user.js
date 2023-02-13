let layout = "user"

module.exports = {
  getHome: async (req, res) => {
    try {
      return res.status(200).render("user/home", {
          layout
      });
    } catch (error) {
      console.log(error);
      return res.status(500).render("error/500");
    }
  },
};
