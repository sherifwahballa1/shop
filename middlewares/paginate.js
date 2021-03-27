var limit = 25;

const pagination = () => {
  return function (req, res, next) {
    // check if page number exists in request(query)
    if (req.query.page) {
      let page = Number.parseInt(req.query.page);
      // in case there exists limit in request(query)
      // by default limit = 25
      let limitQ = req.query.limit ? Number.parseInt(req.query.limit) : "";
      if ((page && page >= 0) || page === 0) {
        let paginate = {};
        paginate.limit = limit;
        if (limitQ !== "" && limitQ > 0 && limitQ) {
          paginate.limit = limitQ;
        }
        paginate.offset = page * limit;
        // set pagination data in the request
        req.paginate = paginate;
        next();
      } else {
        return res.status(400).json({ message: "Invalid page number" });
      }
    } else {
      // if page number not exists in the request query return default paginate
      let paginate = {};
      paginate.limit = limit;
      paginate.offset = 0 * limit;
      req.paginate = paginate;
      next();
    }
  };
};

module.exports = {
  pagination,
};
