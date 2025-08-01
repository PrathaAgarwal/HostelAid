import React, { useState } from 'react';
import StudentLocation from './studentLocation';
import BusBooking from './busBooking';
import { FaBus, FaMapMarkerAlt, FaUtensils, FaBell, FaBirthdayCake, FaBoxOpen } from 'react-icons/fa';

const StudentDashboard = () => {
  const [showMap, setShowMap] = useState(false);
  const [book, setBook] = useState(false);
  const [menu, setMenu] = useState(false);
  const [menuData, setMenuData] = useState({});
  const [notice, setNotice] = useState(false);
  const [noticeData, setNoticeData] = useState([]);
  const [lunchBox, setLunchBox] = useState(false);
  const [birth, setBirth] = useState(false);
  const [birthData, setBirthData] = useState([]);

  const fetchMenu = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/menu/get');
      const data = await res.json();
      setMenuData(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchNotice = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/notice/get');
      const data = await res.json();
      setNoticeData(data);
    } catch (err) {
      console.log(err);
    }
  };

  const bookLunch = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/lunch/reserve', {
        method: 'POST',
        credentials: 'include',
      });
      await res.json();
      setLunchBox(true);
    } catch (err) {
      console.log(err);
    }
  };

  const showBirth = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/birth/get');
      const data = await res.json();
      setBirthData(data);
    } catch (err) {
      console.log(err);
    }
  };

  const Card = ({ title, icon, content, buttonName, backContent, onToggle, isFlipped, isHover }) => (
    <div className="relative w-80 h-52 overflow-hidden flex flex-wrap gap-5 m-4 justify-center items-center">
      
      <div
        className={`w-full h-full hover:${isHover} flex items-center justify-center bg-teal-800 rounded-xl shadow-lg transform transition-all group duration-700 ${
          isFlipped ? '-translate-x-full' : 'translate-x-0 '
        }`}
      >
        
        <div className="text-center">
         <div className="text-white text-3xl mb-2 flex justify-center transform transition-transform duration-300 group-hover:scale-130">{icon}</div>
          <h2 className="text-white text-xl font-bold mb-2">{title}</h2>
          <p className='text-white'>{content}</p>
          <button className="mt-4 px-4 py-2 bg-white text-teal-800 rounded font-bold" onClick={onToggle}>
            {buttonName}
          </button>
        </div>
      </div>
      <div
        className={`absolute w-full h-full flex items-center justify-center bg-teal-300 rounded-xl shadow-lg transform transition-transform duration-700 ${
          isFlipped ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 text-center w-full">
          {backContent}
          <button className="mt-4 px-4 py-2 bg-teal-800 text-white rounded" onClick={onToggle}>
            Show Front
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="px-4 py-10 bg-teal-50 min-h-screen">
      <h1 className="text-center text-4xl font-bold text-teal-800 mb-8">Student Dashboard</h1>

      {/* 🚌 Driver Location (Modal-style) */}
      <div className="flex flex-wrap justify-center gap-6 mb-6">
        <div className="w-80 h-40 bg-teal-800 rounded-xl group shadow-md flex flex-col justify-center items-center text-center">
          <FaMapMarkerAlt className="text-3xl text-white mb-2 transform transition-transform duration-300 group-hover:scale-130" />
          <h3 className="text-xl font-bold text-white">Driver Location</h3>
          <p className="text-sm mb-3 text-white">Track live location of your driver</p>
          <button
            className="px-4 py-2 bg-white text-teal-800 font-bold rounded"
            onClick={() => setShowMap(true)}
          >
            Open
          </button>
        </div>

        {showMap && (
          <div className="fixed inset-0 bg-teal-800/30 flex justify-center items-center z-50 ">
            <div className="bg-white p-4 rounded-xl shadow-lg w-[90%] max-w-2xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-teal-800">Driver Location</h2>
                <button className="text-teal-800 font-bold" onClick={() => setShowMap(false)}>
                  CLOSE
                </button>
              </div>
              <StudentLocation />
            </div>
          </div>
        )}

        {/* 🚌 Book Bus Seat */}
        <div className="w-80 h-40 bg-teal-800 rounded-xl shadow-md group flex flex-col justify-center items-center text-center">
          <FaBus className="text-3xl text-white mb-2 transform transition-transform duration-300 group-hover:scale-130" />
          <h3 className="text-xl font-bold text-white">Book Bus Seat</h3>
          <p className="text-sm mb-3 tex-white text-white">Reserve your seat for today's bus</p>
          <button
            className="px-4 py-2 bg-white text-teal-800 font-bold rounded"
            onClick={() => setBook(true)}
          >
            Open
          </button>
        </div>

        {book && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded-xl shadow-lg w-[90%] max-w-2xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-teal-800">Bus Booking</h2>
                <button className="text-teal-800 font-bold" onClick={() => setBook(false)}>
                  X
                </button>
              </div>
              <BusBooking />
            </div>
          </div>
        )}
      </div>
      
      <div className="flex flex-wrap justify-center">
        <Card
        className='hover:opacity-100'
          title="Today's Menu"
          icon={<FaUtensils />}
          content="See what's being served today."
            buttonName="show"
          isFlipped={menu}
          onToggle={() => {
            if (!menu) fetchMenu();
            setMenu(!menu);
          }}
          backContent={
            Object.keys(menuData).length > 0 ? (
              <div>
                <p className='text-l text-teal-800 font-bold'> Breakfast: {menuData.breakfast}</p>
                <p className='text-l text-teal-800 font-bold'> Lunch: {menuData.lunch}</p>
                <p className='text-l text-teal-800 font-bold'> Snack: {menuData.snack}</p>
                <p className='text-l text-teal-800 font-bold'> Dinner: {menuData.dinner}</p>
              </div>
            ) : (
              <p>No menu available.</p>
            )
          }
        />

        <Card

          title="Hostel Notices"
          icon={<FaBell />}
          content="Check latest announcements."
          buttonName="show"
          isFlipped={notice}
          onToggle={() => {
            if (!notice) fetchNotice();
            setNotice(!notice);
          }}
          backContent={
            <div className="overflow-y-auto h-40 px-2 text-left">
              {noticeData.length > 0 ? (
                noticeData.map((item) => (
                  <div key={item.id} className="mb-3 border-b pb-2">
                    <strong>{item.title}</strong>
                    <br />
                    <span className="text-sm text-teal-800">
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                    <p>{item.description}</p>
                  </div>
                ))
              ) : (
                <p>No current notices available.</p>
              )}
            </div>
          }
        />

        <Card
          title="Reserve Lunch"
          icon={<FaBoxOpen />}
          content="Book your lunch box for the day."
            buttonName="Book"
          isFlipped={lunchBox}
          onToggle={() => {
            if (!lunchBox) bookLunch();
            setLunchBox(!lunchBox);
          }}
          backContent={<p className="text-teal-800 font-bold text-xl">Lunch Reserved!</p>}
        />

        <Card
          title="Today's Birthdays"
          icon={<FaBirthdayCake />}
          content="Wish your hostelmates!"
            buttonName="show"
          isFlipped={birth}
          onToggle={() => {
            if (!birth) showBirth();
            setBirth(!birth);
          }}
          backContent={
            <div>
              {birthData.length > 0 ? (
                birthData.map((item, index) => (
                  <p key={index} className="text-teal-800 font-bold text-l">
                     {item.name}
                  </p>
                ))
              ) : (
                <p className='text-l text-teal-800 font-bold'>No birthdays today.</p>
              )}
            </div>
          }
        />
      </div>
    </div>
  );
};

export default StudentDashboard;
