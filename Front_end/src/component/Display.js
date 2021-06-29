import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
//import ReactPaginate from "react-paginate";

const Display = () => {

	const [users, setUser] = useState([]);
	const [searchName, setSearchName] = useState('');
	const [rolefilter, setRoleFilter] = useState("");

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
		setUser(result.data.user);
		setRoleFilter(result.data.user);
		console.log('usersss', rolefilter);
	};

	//delete call
	const deleteUser = async (id) => {
		await axios.delete(`http://localhost:4000/delete/${id}`);
		// console.log("front end  delete");
		loadUsers();
	};

	//Dropdown Filter Code
	const FilterDropdown = async(Dropdown)=> {

		const result = await axios.get(`http://localhost:4000/display/${Dropdown}`);
		if(Dropdown === 'all'){
			setUser(rolefilter);
		}	else{
			setUser(result.data.user);
		}	
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
					<t /> <t />

					<select className='form-group'
					onChange={(e) => FilterDropdown(e.target.value)}
					>
						<option value='all'>all</option>
						<option value='artist'>artist</option>
						<option value='designer'>designer</option>
						<option value='manager'>manager</option>
					</select>
		
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
							<th>	<Link className='btn btn-primary  mr-2' to={`/`}>
										Add Users
									</Link>
								
			</th>
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
				
				<div>
         {/* <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            pageCount={page_Count}
            //onPageChange={handlePageClick}
            containerClassName={"pagination containerClassName"}
            previousLinkClassName={"previousLinkClassName"}
            nextLinkClassName={"nextLinkClassName"}
            pageClassName={"pageClassName"}
            disabledClassName={"disabledClassName"}
            activeClassName={"activeClassName"}
          />  */}
        </div>
			</div>
		</div>
	);
};

export default Display;
