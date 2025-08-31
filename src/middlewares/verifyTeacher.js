/** @format */

const verifyTeacher = (req, res, next) => {
	const user = req.user;
	if (user && user.role === 'teacher') {
		return next();
	}
	return res.status(403).json({ message: 'Access denied. Teachers only.' });
};

export { verifyTeacher };
