module.exports = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    error: 'Unexpected error happened, please try again later',
  });
};
