import React, { useState } from 'react';
import {
  FaUsers, FaClipboardList, FaUtensils, FaBoxOpen, FaInfoCircle
} from 'react-icons/fa';

const WardenDashboard = () => {
  const [showStudents, setShowStudents] = useState(false);
  const [students, setStudents] = useState([]);

  const [showMenuForm, setShowMenuForm] = useState(false);
  const [menuFormData, setMenuFormData] = useState({
    date: '', breakfast: '', lunch: '', snack: '', dinner: ''
  });

  const [showNoticeForm, setShowNoticeForm] = useState(false);
  const [noticeForm, setNoticeForm] = useState({ title: '', notice: '' });

  const [showNames, setShowNames] = useState(false);
  const [nameData, setNameData] = useState([]);

  const [quantityFlip, setQuantityFlip] = useState(false);
  const [quantityData, setQuantityData] = useState('');

  const fetchStudents = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/student/data');
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleMenuSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/menu/set', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(menuFormData)
      });
      const data = await res.json();
      alert(res.ok ? 'Menu added successfully' : 'Failed to add menu');
      setShowMenuForm(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleNoticeSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/notice/set', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noticeForm)
      });
      const data = await res.json();
      alert(res.ok ? 'Notice added successfully' : 'Failed to add notice');
      setShowNoticeForm(false);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchNameData = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/lunch/name');
      const data = await res.json();
      setNameData(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchQuantityData = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/lunch/qauntity');
      const data = await res.json();
      setQuantityData(data);
    } catch (err) {
      console.error(err);
    }
  };

  const FlipCard = ({ isFlipped, onToggle, frontContent, backContent }) => (
    <div className="relative w-80 h-52 overflow-hidden m-4">
      <div className={`absolute w-full h-full transition-transform duration-500 ${isFlipped ? '-translate-x-full' : 'translate-x-0'}`}>
        <div className="w-full h-full group bg-teal-800 rounded-xl shadow-lg flex flex-col justify-center items-center text-center">
          {frontContent}
          <button className="mt-4 px-4 py-2 bg-white text-teal-800 font-bold rounded" onClick={onToggle}>Show</button>
        </div>
      </div>
      <div className={`absolute w-full h-full transition-transform duration-500 ${isFlipped ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="w-full h-full bg-teal-300 font-bold text-lg text-teal-800 rounded-xl shadow-lg flex flex-col justify-center items-center text-center">
          {backContent}
          <button className="mt-4 px-4 py-2 bg-teal-700 text-white rounded" onClick={onToggle}>Hide</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="px-4 py-10 bg-teal-50 min-h-screen">
      <h1 className="text-center text-4xl font-bold text-teal-800 mb-8">Warden Dashboard</h1>

      {/* ACTIONS */}
      <div className="flex flex-wrap justify-center gap-6">
        {/* View Students */}
        <div className="w-72 h-40 bg-teal-800 rounded-xl group shadow-md flex flex-col justify-center items-center text-center">
          <FaUsers className="text-3xl text-white mb-2 transform transition-transform duration-300 group-hover:scale-130" />
          <h3 className="text-xl font-bold text-white">View All Students</h3>
          <button
            className="mt-2 px-4 py-2 bg-white text-teal-800 font-bold rounded"
            onClick={() => {
              fetchStudents();
              setShowStudents(true);
            }}
          >
            Open
          </button>
        </div>

        {/* Add Menu */}
        <div className="w-72 h-40 bg-teal-800 group rounded-xl shadow-md flex flex-col justify-center items-center text-center">
          <FaUtensils className="text-3xl text-white mb-2  transform transition-transform duration-300 group-hover:scale-130" />
          <h3 className="text-xl font-bold text-white">Add Menu</h3>
          <button
            className="mt-2 px-4 py-2 bg-white text-teal-800 font-bold rounded"
            onClick={() => setShowMenuForm(true)}
          >
            Open
          </button>
        </div>

        {/* Add Notice */}
        <div className="w-72 h-40 bg-teal-800 rounded-xl shadow-md flex flex-col justify-center items-center text-center group ">
          <FaClipboardList className="text-3xl text-white mb-2 transform transition-transform duration-300 group-hover:scale-130" />
          <h3 className="text-xl font-bold text-white">Add Notice</h3>
          <button
            className="mt-2 px-4 py-2 bg-white text-teal-800 font-bold rounded"
            onClick={() => setShowNoticeForm(true)}
          >
            Open
          </button>
        </div>

        {/* Lunch Names */}
        <div className="w-72 h-40 bg-teal-800 rounded-xl group shadow-md flex flex-col justify-center items-center text-center">
          <FaBoxOpen className="text-3xl text-white mb-2 transform transition-transform duration-300 group-hover:scale-130" />
          <h3 className="text-xl font-bold text-white">Lunch Names</h3>
          <button
            className="mt-2 px-4 py-2 bg-white text-teal-800 font-bold rounded"
            onClick={() => {
              fetchNameData();
              setShowNames(true);
            }}
          >
            Open
          </button>
        </div>
      </div>

      {/* Flip Card for Quantity */}
      <div className="flex justify-center mt-8 ">
        <FlipCard
          isFlipped={quantityFlip}
          onToggle={() => {
            if (!quantityFlip) fetchQuantityData();
            setQuantityFlip(!quantityFlip);
          }}
          frontContent={
            <>
              <FaInfoCircle className="text-3xl transform transition-transform duration-300 group-hover:scale-130 text-white mb-2" />
              <h3 className="text-xl font-bold text-white">Lunch Quantity</h3>
              <p className='text-white'>See total lunch boxes</p>
            </>
          }
          backContent={
            <div>
              <h3 className="text-lg font-bold text-teal-800">Total Quantity</h3>
              <p>{quantityData || 'Loading...'}</p>
            </div>
          }
        />
      </div>

      {/* Students Modal */}
      {showStudents && (
        <Modal title="All Students" onClose={() => setShowStudents(false)}>
          {students.length ? (
            <ul className='text-teal-800 text-lg font-semibold'>
              {students.map((s, i) => <li key={i}>{s.name}</li>)}
            </ul>
          ) : (
            <p className='text-teal-800 text-lg font-semibold'> No students found.</p>
          )}
        </Modal>
      )}

      {/* Menu Modal */}
      {showMenuForm && (
        <Modal title="Add Menu" onClose={() => setShowMenuForm(false)}>
          <form onSubmit={handleMenuSubmit} className="space-y-2">
            <input type="date" className="w-full border p-2 rounded" onChange={(e) => setMenuFormData({ ...menuFormData, date: e.target.value })} />
            <input type="text" placeholder="Breakfast" className="w-full border p-2 rounded" onChange={(e) => setMenuFormData({ ...menuFormData, breakfast: e.target.value })} />
            <input type="text" placeholder="Lunch" className="w-full border p-2 rounded" onChange={(e) => setMenuFormData({ ...menuFormData, lunch: e.target.value })} />
            <input type="text" placeholder="Snacks" className="w-full border p-2 rounded" onChange={(e) => setMenuFormData({ ...menuFormData, snack: e.target.value })} />
            <input type="text" placeholder="Dinner" className="w-full border p-2 rounded" onChange={(e) => setMenuFormData({ ...menuFormData, dinner: e.target.value })} />
            <button type="submit" className="bg-teal-800 text-white px-4 py-2 rounded">Submit</button>
          </form>
        </Modal>
      )}

      {/* Notice Modal */}
      {showNoticeForm && (
        <Modal title="Add Notice" onClose={() => setShowNoticeForm(false)}>
          <form onSubmit={handleNoticeSubmit} className="space-y-2">
            <input type="text" placeholder="Title" className="w-full border p-2 rounded" onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })} />
            <textarea placeholder="Notice body" className="w-full border p-2 rounded" onChange={(e) => setNoticeForm({ ...noticeForm, notice: e.target.value })}></textarea>
            <button type="submit" className="bg-teal-800 text-white px-4 py-2 rounded">Submit</button>
          </form>
        </Modal>
      )}

      {/* Lunch Names Modal */}
      {showNames && (
        <Modal title="Lunch Box Names" onClose={() => setShowNames(false)}>
          {nameData.length > 0 ? (
            nameData.map((item, idx) => <p key={idx}>{item.name}</p>)
          ) : (
            <p>No bookings available.</p>
          )}
        </Modal>
      )}
    </div>
  );
};

// Reusable Modal
const Modal = ({ title, children, onClose }) => (
<div className="fixed inset-0 bg-teal-800/30 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-lg max-h-[80vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-teal-800">{title}</h2>
        <button onClick={onClose} className="text-teal-800 font-bold text-xl">×</button>
      </div>
      {children}
    </div>
  </div>
);

export default WardenDashboard;
