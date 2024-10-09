import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    gender: '',
    dateofbirth: '',
    city: '',
    phone: '',
    email: ''
  });

 
  useEffect(() => {
    axios.get('http://localhost:5000/api/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error("Error fetching users", error));
  }, []);

 
  const handleCreateUser = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/users', form)
      .then(response => setUsers([...users, response.data]))
      .catch(error => console.error("Error creating user", error));
  };

  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    axios.get(`http://localhost:5000/api/users/search?query=${e.target.value}`)
      .then(response => setUsers(response.data))
      .catch(error => console.error("Error searching users", error));
  };

  return (
    <div className="container">
      <h1>User Management</h1>
      
       
      <input 
        type="text" 
        placeholder="Search by name or email" 
        value={searchQuery} 
        onChange={handleSearch} 
        className="search-input"
      />
      
    
      <form onSubmit={handleCreateUser} className="create-user-form">
        <div>
          <label>First Name:</label>
          <input 
            type="text" 
            name="firstname" 
            value={form.firstname} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input 
            type="text" 
            name="lastname" 
            value={form.lastname} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label>Gender:</label>
          <select name="gender" value={form.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label>Date of Birth:</label>
          <input 
            type="date" 
            name="dateofbirth" 
            value={form.dateofbirth} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label>City:</label>
          <input 
            type="text" 
            name="city" 
            value={form.city} 
            onChange={handleChange} 
          />
        </div>
        <div>
          <label>Phone:</label>
          <input 
            type="text" 
            name="phone" 
            value={form.phone} 
            onChange={handleChange} 
          />
        </div>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            name="email" 
            value={form.email} 
            onChange={handleChange} 
            required 
          />
        </div>
        <button type="submit">Create User</button>
      </form>

      
      <h2>Users List</h2>
      <table className="users-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>Date of Birth</th>
            <th>City</th>
            <th>Phone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.gender}</td>
              <td>{new Date(user.dateofbirth).toLocaleDateString()}</td>
              <td>{user.city}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
