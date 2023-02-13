module.exports = {
  isLoggedIn: async (req, res, next) => {
    if (!req.isAuthenticated()) {
      req.flash("errors", "Session Expired");
      return res.redirect("/users/login");
    }

    next();
  },
  isUser: async (req, res, next) => {
    if (req.isAuthenticated() && req?.user?.role === "writer") {
      return res.redirect("/users/user/dashboard");
    }

    next();
  },
  isAdmin: async (req, res, next) => {
    if (req.isAuthenticated() && req?.user?.role === "admin") {
      return res.redirect("/users/admin/dashboard");
    }

    next();
  },
};
