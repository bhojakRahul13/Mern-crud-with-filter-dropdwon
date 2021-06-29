const e = require('express');
const express = require('express');
const router = express();
const { check, validationResult, body } = require('express-validator');
const User = require('../models/users.model');

//Display Route
router.get('/display', async (req, res) => {
	try {
		const { page = 1, limit = 10 } = req.query;
		const user = await User.find()
		.limit(limit * 1)
		.skip((page - 1) * limit);
	  console.log(req.body);
		
		res.json({ total_User: user.length, user });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

//Pgintion
router.get("/dis ", async (req, res) => {
	try {
	  const { page = 1, limit = 10 } = req.query;
	  let user = await User.find()
		.limit(limit * 1)
		.skip((page - 1) * limit);
	  console.log(req.body);
	  return res.json({ total_User: user.length, user });
	} catch (err) {
	  console.error(err.message);
	  return res.status(500).send("server Error");
	}
  });



//Add API
router.post(
	'/add',
	[
		check('FirstName', 'FirstName is required').not().isEmpty(),
		check('LastName', 'LastName is required').not().isEmpty(),
		check('email', 'Please include a valid email').isEmail(),
		check('role', 'role is required').not().isEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
        const { FirstName, LastName, email, role } = req.body;
        
		let user = await User.findOne({ email });
        if (user) return res.status(400).json({ error: true, message: 'User already added!' });
        
        if (role.toLowerCase() === 'manager') user = await User.findOne({ role: 'manager' });
        
		if (user) return res.status(400).json({ error: true, message: 'Art Manager already added!' });

		user = new User({
			FirstName: FirstName,
			LastName: LastName,
			email: email,
			role: role,
		});

		await user.save();
		return res.status(200).json({ error: false, message: 'User added!' });
	},
);

//Display by drop Route
router.get('/display/:Dropdown', async (req, res) => {
	try {
		const user = await User.find({role:req.params.Dropdown} );
		res.json({ total_User: user.length, user });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

//Update route
router.put('/edit/:id', async function (req, res) {
    let { FirstName, LastName, email, role } = req.body;
    
    let user = await User.findOne({ _id: req.params.id });
    
    if (!user) return res.status(400).json({ error: true, message: 'User not found!' });
    
    user = await User.findOne({ _id: req.params.id });
    
    let find_user;
    
    if (user.email != email) find_user = await User.findOne({ email });
    
    if (find_user) return res.status(400).json({ error: true, message: 'User already added!' });
    
	if (user.role !== role.toLowerCase() && role.toLowerCase() === 'manager')
		find_user = await User.findOne({ role: 'manager' });
    if (find_user) return res.status(400).json({ error: true, message: 'Art Manager already added!' });
    
	User.update(
		{ _id: req.params.id },
		{
			$set: {
				FirstName,
				LastName,
				email,
				role,
			},
		},
	).then((result) => {
		return res.status(200).json({ error: false, message: 'User updated successfully!' });
	});
});

//retrive data from ID
router.get('/edit/:id', function (req, res) {
	console.log('called', req.params.id);
	User.findById(req.params.id, function (err, users) {
		if (err) {
			return res.status(400).json({ err: true, message: 'No user with this Id' });
		} else {
			return res.status(200).json({ err: false, message: 'update ', users: users });
		}
	});
});

// //Delete Api
router.delete('/delete/:id', async function (req, res) {
	let user = await User.findOne({ _id: req.params.id });
	if (!user) return res.status(400).json({ error: true, message: 'User not found!' });
	User.findOneAndDelete({ _id: req.params.id }, function (err, users) {
		return res.status(200).json({ error: false, message: 'User Delete successfully' });
	});
});

//User Searching api
router.get('/search', (req, res) => {
	const searchFields1 = req.query.LastName;
	User.find({ LastName: { $regex: searchFields1, $options: '$i' } })
		.then((result) => {
			console.log(result);
			return res.status(200).json({ length: result.length, result });
		})
		.catch((err) => {
			return res.status(500).json({
				error: err,
			});
		});
});

module.exports = router;

// //update User
// router.put("/edit/:id", async function (req, res) {
//   let user = await User.findOne({ _id: req.params.id });
//   if (!user) return res.json({ error: true, message: "User not found!" });
//   User.update(
//     { _id: req.params.id },
//     {
//       $set: {
//         FirstName: req.body.FirstName,
//         LastName: req.body.LastName,
//         email: req.body.email,
//         role: req.body.role,
//       },
//     }
//   ).then((result) => {
//     return res.json({ error: false, message: "User updated successfully!" });
//   });
// });
