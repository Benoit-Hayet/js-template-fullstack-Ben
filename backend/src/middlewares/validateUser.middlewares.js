const validateUser = async (req, res, next) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const {email, password, is_admin} = req.body;

  if (!emailRegex.test(email)) {
    res.status(400).send({ message: `Dégage si t'as pas d'email` });
    return;
  }
  if ((password?.length ?? 0) < 4) {
    res.status(400).send({ message: `Mot de passe on t'a dit !`});
    return;
  }
  if (typeof is_admin !== "boolean") {
    res.status(400).send({ message: `Un booleen, t'as rien compris !`});
    return;
  }
  next();
};

module.exports = validateUser;
