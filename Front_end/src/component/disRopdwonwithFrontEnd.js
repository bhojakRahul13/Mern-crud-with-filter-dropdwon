
import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const Display = () => {

	const [users, setUser] = useState([]);
	const [alluser, setAllUser] = useState([]);
	const [searchName, setSearchName] = useState('');
	const [rolefilter, setRoleFilter] = useState(); //dropdwon do using front end not api

	useEffect(() => {
		loadUsers();
	}, []); //[] is for running only 1 time

	//searching  Api call
	useEffect(() => {
		const search = async () => {
			const result = await axios.get(`http://localhost:4000/search?LastName=${searchName}`);

			console.log('search_result', result);
			setUser(result.data.result);
		};
		search();
	}, [searchName]);

	//Display api call
	const loadUsers = async () => {
		const result = await axios.get('http://localhost:4000/display');
		console.log('result', result.data.user);
		setAllUser(result.data.user);
		setUser(result.data.user);
		console.log('usersss', users);
	};

	//delete call
	const deleteUser = async (id) => {
		await axios.delete(`http://localhost:4000/delete/${id}`);
		// console.log("front end  delete");
		loadUsers();
	};

	const changeRole = (val) => {
		console.log('value of dropdwon', val);
		var data = alluser.filter((data, index) => data.role === val);
		if (val === 'all') {
			setUser(alluser);
		} else {
			setUser(data);
		}
		console.log('filter data ', data);
	};

	return (
		<div className='container'>
			<div className='py-4'>
				<h1> All Users Page! </h1>

				<div>
					<input
						className='form-group'
						type='text'
						placeholder='Username search'
						value={searchName}
						onChange={(e) => setSearchName(e.target.value)}
					/>
					<t/> <t/>
					<select	className='form-group'
						value={rolefilter}
						onChange={(e) => {
							const selectRole = e.target.value;
							setRoleFilter(selectRole);
							changeRole(selectRole);
						}}>
						<option value='all'>all</option>
						<option value='artist'>artist</option>
						<option value='designer'>designer</option>
						<option value='manager'>manager</option>
					</select>
					{/* {rolefilter} */}
				</div>

				<table className='table border shadow'>
					<thead className='thead-dark'>
						<tr>
							<th scope='col'> Id </th>
							<th scope='col'> FirstName </th>
							<th scope='col'> LastName </th>
							<th scope='col'> Email </th>
							<th scope='col'> Role </th>
							<th> Action </th>
						</tr>
					</thead>
					<tbody>
						{users.map((user, index) => (
							<tr>
								<th scope='row'> {user._id} </th>
								<td> {user.FirstName} </td> <td> {user.LastName} </td> <td> {user.email} </td>{' '}
								<td> {user.role} </td>
								<td>
									<Link className='btn btn-primary  mr-2' to={`/user/${user._id}`}>
										View
									</Link>
									<Link className='btn btn-success  mr-2' to={`/edit/${user._id}`}>
										Update
									</Link>
									<button className='btn btn-danger mr-2' onClick={() => deleteUser(user._id)}>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Display;
