const GlobalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

const Error4o4 = (req, res, next) => {
  // Handle 404
  res.status(404).json({ title: "404: File Not Found" });
};

const Error500 = (error, req, res, next) => {
  // Handle 500
  res.status(500).json({ title: "500: Internal Server Error", error });
};

module.exports = {
  GlobalError,
  Error4o4,
  Error500,
};
