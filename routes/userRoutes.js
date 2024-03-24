import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google'),
  (req, res) => {
    const path_name =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:5173/notes'
        : '/notes';

    console.log(path_name);

    res.redirect(
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:5173/notes'
        : '/notes'
    );
  }
);

router.get('/api/current_user', (req, res) => {
  res.send(req.user);
});

router.get('/api/logout', (req, res) => {
  const path_name =
    process.env.NODE_ENV === 'development' ? 'http://localhost:5173/' : '/';

  console.log(path_name);

  req.logout();
  res.redirect(
    process.env.NODE_ENV === 'development' ? 'http://localhost:5173/' : '/'
  );
});

export default router;
