module.exports = (req, res, next) => {
  const { id } = req.params;
  req.params.id = Number(id);
  next();
};
