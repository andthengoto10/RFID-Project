const mongoose = require('mongoose');

module.exports = mongoose;
mongoose.connect(
	`mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster0-${process.env
		.CLUSTNAME}.mongodb.net/test?retryWrites=true&w=majority`,
	{
		useNewUrlParser: true
	}
);

module.exports = mongoose;
