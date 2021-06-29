import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const User = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [role, setRole] = useState('');

	const { id } = useParams();

	useEffect(() => {
		loadUser();
	}, []);

	const loadUser = async () => {
		const result = await axios.get(`http://localhost:4000/edit/${id}`);
		setFirstName(result.data.users.FirstName);
		setLastName(result.data.users.LastName);
		setEmail(result.data.users.email);
		setRole(result.data.users.role);
	};

	return (
		<div className='container py-4'>
			<Link className='btn btn-primary' to='/dis'>
				back to Home
			</Link>
			<h1 className='display-4'>User Id: {id}</h1>
			<hr />
			<ul className='list-group w-50'>
				<li className='list-group-item'>firstName: {firstName}</li>
				<li className='list-group-item'>Lastname: {lastName}</li>

				<li className='list-group-item'>email: {email}</li>
				<li className='list-group-item'>ROLE: {role}</li>
			</ul>
		</div>
	);
};

export default User;
