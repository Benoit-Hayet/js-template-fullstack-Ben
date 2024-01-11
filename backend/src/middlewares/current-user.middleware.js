// id de l'url est != de la personne connectée et que ce n'est pas un admin
const currentMiddlewareUser = (req, res, next) => {
  if (+req.params.id !== req.user.id && !req.user.isAdmin) {
    return res
      .status(403)
      .send({ message: "t'as pas le droit d'aller au carré VIP" });
  }
  return next();
};

module.exports = currentMiddlewareUser;
