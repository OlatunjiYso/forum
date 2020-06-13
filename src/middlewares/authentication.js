import jwt from 'jsonwebtoken';

/**
 * @description -checks if a user has a valid token or has no token at all
 *
 * @param {Object} req -api request
 * @param {Object} res -api response
 * @param {Object} next -pass on to next handler
 * @return {undefined}
 */
export const authenticate = (req, res, next) => {
    try {
        const token = req.body.token || req.headers.token;
        if (!token) {
            return res.status(401)
                .json({ success: false, msg: 'no token!' });
        }
        // check if token is valid
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401)
                    .json({
                        success: false,
                        msg: 'token Invalid'
                    });
            }
            req.user = decoded;
            return next();
        });
    } catch (err) {
        return res.status(500)
            .json({
                msg: 'internal server error occured while checking token',
                errMessage: err.message
            })
    }

}