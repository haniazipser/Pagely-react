import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Styles/Registration.css';
import { ToastContainer, toast } from 'react-toastify';
const RegistrationForm = () => {
    const navigate = useNavigate();
    const notify = (message) => toast(message);
    const [clientType, setClientType] = useState('');
    const [formData, setFormData] = useState({
    name: '',
    NIP: '',
    dateOfBirth: '',
    sex: '',
    clientType: '',
    accountNumber: '',
    accountHolder: '',
    login: '',
    password: '',
    userType: 'OWNER',
    role: 'user',
    clientStatus: 'ACTIVE',
    userStatus: 'ACTIVE',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleClientTypeChange = (e) => {
    const selectedType = e.target.value;
    setClientType(selectedType);
    setFormData(prev => ({
      ...prev,
      clientType: selectedType,
      NIP: '',
      dateOfBirth: '',
      sex: '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      clientType,
      NIP: clientType === 'INDIVIDUAL' ? formData.NIP : null,
      dateOfBirth: clientType === 'BUSINESS' ? formData.dateOfBirth : null,
      sex: clientType === 'BUSINESS' ? formData.sex : null,
    };

    try {
      const res = await axios.post('http://localhost:8080/public/register', payload);
      console.log('Registration success:', res.data);
      notify('You registered succesfuly!');
      navigate('/');
    } catch (err) {
      console.error('Registration error:', err);
      notify('Something went wrong!');
    }
  };

  return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 my-3">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-4 rounded shadow"
            style={{ maxWidth: '500px', width: '100%' }}
          >
            <h2 className="text-center mb-4">Register</h2>
    
            {/* Client Type Selection */}
            <div className="mb-3">
              <label className="form-label">Client Type</label>
              <select
                className="form-control"
                value={clientType}
                onChange={handleClientTypeChange}
                required
              >
                <option value="">-- Select --</option>
                <option value="INDIVIDUAL">Individual</option>
                <option value="COMPANY">Company</option>
              </select>
            </div>

            {clientType && (
              <>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    onChange={handleChange}
                    required
                  />
                </div>
                </>
            )}
    
            {/* Conditional Fields */}
            {clientType === 'COMPANY' && (
              <div className="mb-3">
                <label className="form-label">NIP</label>
                <input
                  type="text"
                  name="NIP"
                  className="form-control"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
    
            {clientType === 'INDIVIDUAL' && (
              <>
              <div class = "row">
                <div className="mb-3 col">
                  <label className="form-label">Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    className="form-control"
                    onChange={handleChange}
                    required
                  />
                </div>
    
                <div className="mb-3 col">
                  <label className="form-label">Sex</label>
                  <select
                    name="sex"
                    className="form-control"
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Select --</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                  </select>
                </div>
                </div>
              </>
            )}
    
            {/* Common Fields */}
            {clientType && (
              <>
    
                <div className="mb-3">
                  <label className="form-label">Account Number</label>
                  <input
                    type="text"
                    name="accountNumber"
                    className="form-control"
                    onChange={handleChange}
                    required
                  />
                </div>
    
                <div className="mb-3">
                  <label className="form-label">Account Holder</label>
                  <input
                    type="text"
                    name="accountHolder"
                    className="form-control"
                    onChange={handleChange}
                    required
                  />
                </div>
    
                <div className="mb-3">
                  <label className="form-label">Login</label>
                  <input
                    type="text"
                    name="login"
                    className="form-control"
                    onChange={handleChange}
                    required
                  />
                </div>
    
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    onChange={handleChange}
                    required
                  />
                </div>
    
                <button type="submit" className="text-centered button">
                  Register
                </button>
              </>
            )}
          </form>
        </div>
  );
};

export default RegistrationForm;
