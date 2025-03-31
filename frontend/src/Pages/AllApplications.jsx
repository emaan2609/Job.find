import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';



const AllApplications = () => {

  const [users, setUsers] = useState([])

  useEffect(() => {
    const allUser = async () => {
      try {
        const response = await axios.get('https://job-find-backend.onrender.com/upload-resume');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    allUser();
  }, []);

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-xl">
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            All Applications
          </h2>
          <p className="mt-6 text-lg text-gray-600">
            Job.find is trusted by people globally. We were able to land individuals into their desired job.
          </p>
        </div>

        {users.length > 0 ? (
          <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
            {users.map((user) => (
              <li key={user._id}>
                <div className="flex items-center gap-x-6">
                  <img
                    alt="User Profile"
                    src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png"
                    className="size-16 rounded-full"
                  />
                  <div>
                    <h3 className="text-base font-semibold tracking-tight text-gray-900">{user.username}</h3>
                    <p className="text-sm font-semibold text-indigo-600">{user.email}</p>
                    <p className="text-sm font-semibold text-black">Job required: {user.job}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-lg font-semibold text-gray-700 xl:col-span-2">
            There are currently no applications on the page.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllApplications;
