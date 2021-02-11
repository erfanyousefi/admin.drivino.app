const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const Admin = require('app/models/admin');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.serializeUser(function (admin, done) {
    done(null, admin.id);
});

passport.deserializeUser(function (id, done) {
    Admin.findById(id, function (err, admin) {
        done(err, admin);
    });
});

passport.use('local.alogin', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    Admin.findOne({ 'email': email }, (err, admin) => {
        if (err) return done(err);

        if (!admin || !admin.comparePassword(password)) {
            return done(null, false, req.flash('messages', 'Login failed'))
        }
        done(null, admin);
    })
}));

passport.use('local.aregister', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    try {
        Admin.findOne({ 'email': email }, function (err, admin) {
            if (admin) {
                return done(
                    null,
                    false,
                    req.flash('messages', 'this user exist')
                );
            }
            const newAdmin = new Admin({
                name: req.body.name,
                family: req.body.family,
                email,
                password,
                image: req.body.images,
                mobile: req.body.mobile,
            });
            newAdmin.save(err => {
                if (err) return done(err, false, req.flash('messages', 'registeration failed please try again'));
                return done(null, newAdmin);
            })
        });

    } catch (error) {
        done(error);
    }
}));

passport.use(new JWTstrategy({
    secretOrKey: 'top_secret',
    jwtFromRequest: ExtractJWT.fromBodyField('secret_token')
}, async (token, done) => {
    try {
        let token_ad = await Admin.findById(token.admin._id);
        token.admin = token_ad;
        return done(null, token.admin);
    } catch (error) {
        return done(error);
    }
}));


