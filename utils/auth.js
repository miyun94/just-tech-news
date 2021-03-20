const withAuth = (req, res, next) => {
  if (!req.session.user_id) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;

//function acts as a normal request callback function, checking for the existence of a session property using the res.redirect()
//if the user does not exist, it will call the next() fnction, which would be another middleware function or final function 