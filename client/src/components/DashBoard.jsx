import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { BarChart, Bar, AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Sector, Cell } from 'recharts';
import { curveCardinal } from 'd3-shape';



const DashBoard = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  const [totalAdmin, setTotalAdmin] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);

  const { currentUser } = useSelector((state) => state.user)
  const isSuperAdmin = currentUser && currentUser.role === 'superAdmin';


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`);
        if (!res.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await res.json();

        // Count total users and admin users
        let adminCount = 0;
        data.users.forEach(user => {
          if (user.role === 'admin') {
            adminCount++;
          }
        });

        setUsers(data.users);
        setTotalAdmin(adminCount);
        setTotalUsers(data.totalUsers);
        setLastMonthUsers(data.lastMonthUsers);
        console.log(data);
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    };
    const fetchPosts = async () => {
      try {

        const res = await fetch(`${import.meta.env.VITE_API_URL}/post/getposts`);
        if (!res.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await res.json();
        setPosts(data.posts)
        setTotalPosts(data.totalPosts);
        setLastMonthPosts(data.lastMonthPosts);


        console.log(data)
      } catch (error) {
        console.log(error);
      }
    }
    if (isSuperAdmin) {
      fetchUsers();
      fetchPosts();
    }

  }, [currentUser]);


  // Process data for the LineChart
  const monthlyUserCounts = Array(12).fill(0); // Initialize an array to store the counts for each month
  users.forEach(user => {
    const month = new Date(user.createdAt).getMonth();
    monthlyUserCounts[month]++;
  });

  const monthlyBusinessCounts = Array(12).fill(0); // Initialize an array to store the counts for each month
  posts.forEach(post => {
    const month = new Date(post.createdAt).getMonth();
    monthlyBusinessCounts[month]++;
  });

  const dataLineChart = [
    { month: 'Jan', user: monthlyUserCounts[0], business: monthlyBusinessCounts[0] },
    { month: 'Feb', user: monthlyUserCounts[1], business: monthlyBusinessCounts[1] },
    { month: 'Mar', user: monthlyUserCounts[2], business: monthlyBusinessCounts[2] },
    { month: 'Apr', user: monthlyUserCounts[3], business: monthlyBusinessCounts[3] },
    { month: 'May', user: monthlyUserCounts[4], business: monthlyBusinessCounts[4] },
    { month: 'Jun', user: monthlyUserCounts[5], business: monthlyBusinessCounts[5] },
    { month: 'Jul', user: monthlyUserCounts[6], business: monthlyBusinessCounts[6] },
    { month: 'Aug', user: monthlyUserCounts[7], business: monthlyBusinessCounts[7] },
    { month: 'Sep', user: monthlyUserCounts[8], business: monthlyBusinessCounts[8] },
    { month: 'Oct', user: monthlyUserCounts[9], business: monthlyBusinessCounts[9] },
    { month: 'Nov', user: monthlyUserCounts[10], business: monthlyBusinessCounts[10] },
    { month: 'Dec', user: monthlyUserCounts[11], business: monthlyBusinessCounts[11] },
  ];
  const cardinal = curveCardinal.tension(0.2);


  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const initialData = months.map(month => ({
    month,
    '+2': 0,
    'bachelor': 0,
    'masters': 0,
  }));

  users.forEach(user => {
    const monthIndex = new Date(user.createdAt).getMonth();
    const education = user.level; // Assuming 'level' is the key for education level
    if (education === '+2' || education === 'bachelor' || education === 'masters') {
      initialData[monthIndex][education]++;
    }
  });



  // Define chart data using the monthly user counts
  let TotalBachelor = 0;
  users.forEach(user => {
    const bachelor = user.level === 'bachelor';
    if (bachelor) {
      TotalBachelor++;
    }
  });
  let TotalPlustwo = 0;
  users.forEach(user => {
    const plustwo = user.level === '+2';
    if (plustwo) {
      TotalPlustwo++;
    }
  });

  let TotalMaster = 0;
  users.forEach(user => {
    const masters = user.level === 'masters';
    if (masters) {
      TotalMaster++;
    }
  });
  const COLORS = ['#0088FE', '#00C49F', '#FFBB98'];

  const BarGraphData = [
    { education: 'plus 2', numberOfUsers: TotalPlustwo },
    { education: 'Bachelor', numberOfUsers: TotalBachelor },
    { education: 'Masters', numberOfUsers: TotalMaster },
  ];

  // Calculate the popularity score for each post
  const postsWithScores = posts.map(post => ({
    ...post,
    popularityScore: ((post.likes.length / post.views.length) * 100).toFixed(2)
  }));

  // Sort the posts based on popularity score in descending order
  const sortedPosts = postsWithScores.sort((a, b) => b.popularityScore - a.popularityScore);

  return (
    <div>
      <div className=' w-full bg-blue-200 '>
        <h1 className='text-5xl font-aileron font-bold mx-10 py-5'>Dashboard 📄</h1>

      </div>

      <h1 className='text-2xl font-aileron font-light mt-10 mx-10 '>Overview</h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 w-full mx-10  max-w-6xl ">
        <div className="flex items-center p-4 bg-gray-200 rounded">
          <div className="flex flex-shrink-0 items-center justify-center bg-gray-300 h-16 w-16 rounded">
            <svg className="w-10 h-10 fill-current text-green-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
              <path xmlns="http://www.w3.org/2000/svg" d="M13 20V18C13 15.2386 10.7614 13 8 13C5.23858 13 3 15.2386 3 18V20H13ZM13 20H21V19C21 16.0545 18.7614 14 16 14C14.5867 14 13.3103 14.6255 12.4009 15.6311M11 7C11 8.65685 9.65685 10 8 10C6.34315 10 5 8.65685 5 7C5 5.34315 6.34315 4 8 4C9.65685 4 11 5.34315 11 7ZM18 9C18 10.1046 17.1046 11 16 11C14.8954 11 14 10.1046 14 9C14 7.89543 14.8954 7 16 7C17.1046 7 18 7.89543 18 9Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />				</svg>
          </div>
          <div className="flex-grow flex flex-col ml-4">
            <span className="text-xl font-bold">{totalUsers}</span>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Total Users</span>
              <span className="text-gray-700 text-sm font-bold ml-2">last month users : {lastMonthUsers}</span>
            </div>
          </div>
        </div>

        {/* tile2 */}
        <div className="flex items-center p-4 bg-yellow-200 rounded">
          <div className="flex flex-shrink-0 items-center justify-center bg-yellow-400 h-16 w-16 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 1024 1024" className="icon" version="1.1"><path d="M917.333333 704H106.666667a42.666667 42.666667 0 0 0-42.666667 42.666667v170.666666a42.666667 42.666667 0 0 0 42.666667 42.666667h810.666666a42.666667 42.666667 0 0 0 42.666667-42.666667v-170.666666a42.666667 42.666667 0 0 0-42.666667-42.666667z" fill="#444444" /><path d="M682.666667 234.666667a21.333333 21.333333 0 0 1-21.333334-21.333334V106.666667H362.666667v106.666666a21.333333 21.333333 0 1 1-42.666667 0V85.333333a21.333333 21.333333 0 0 1 21.333333-21.333333h341.333334a21.333333 21.333333 0 0 1 21.333333 21.333333v128a21.333333 21.333333 0 0 1-21.333333 21.333334z" fill="#B3B3B3" /><path d="M960 192H64a42.666667 42.666667 0 0 0-42.666667 42.666667v469.333333a42.666667 42.666667 0 0 0 42.666667 42.666667h896a42.666667 42.666667 0 0 0 42.666667-42.666667V234.666667a42.666667 42.666667 0 0 0-42.666667-42.666667z" fill="#636363" /><path d="M597.333333 832h-170.666666a21.333333 21.333333 0 0 1-21.333334-21.333333v-128a21.333333 21.333333 0 0 1 21.333334-21.333334h170.666666a21.333333 21.333333 0 0 1 21.333334 21.333334v128a21.333333 21.333333 0 0 1-21.333334 21.333333z" fill="#EFD358" /></svg>
          </div>
          <div className="flex-grow flex flex-col ml-4">
            <span className="text-xl font-bold">{totalPosts}</span>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Total Business</span>
              <span className="text-yellow-700 text-sm font-bold ml-2">last month posts: {lastMonthPosts}</span>
            </div>
          </div>
        </div>
        {/* tile3 */}
        <div className="flex items-center p-4 bg-green-100 rounded">
          <div className="flex flex-shrink-0 items-center justify-center bg-green-300 h-16 w-16 rounded">
            <span className="text-xl font-bold">{totalAdmin}</span>
          </div>
          <div className="flex-grow flex flex-col ml-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Total Admins</span>
            </div>
          </div>
        </div>

      </div>

      <hr className="h-px mx-5 my-10 bg-gray-700 border-0" />
      <div className='flex flex-col md:flex-row'>
      <div className='flex-1'>
      <ResponsiveContainer width="100%" height={400}>
      <h1 className='text-2xl font-aileron text-center font-light '>Pie Chart</h1>

        <PieChart>
          <Pie
            data={BarGraphData}
            cx="50%" cy="50%" innerRadius={0} outerRadius={190} fill="#82ca9d" label={({ education, numberOfUsers }) => `${education}: ${numberOfUsers}`}
            dataKey="numberOfUsers"
          >
            {BarGraphData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}></Cell>))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      </div>
      <div className='mx-10 mt-10 md:mt-0 flex-1'>
        <h1 className='text-2xl font-aileron font-light mb-4'>Popularity Index</h1>
        {sortedPosts.slice(0, 10).map((post, index) => (
          <div className='p-5 flex items-center border-b border-gray-200' key={index}>
            <img src={post.image} alt={post.title} className="w-10 h-10 rounded-full object-cover mr-4" />
            <div className="flex flex-col">
              <span className="text-sm font-medium">{post.title}</span>
              <div className="text-gray-500 text-xs">
                <span className="mr-1">{post.likes.length} likes</span>
                <span className="mr-1">{post.views.length} views</span>
                <span>Popularity Score: {post.popularityScore}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
      <hr className="h-px mx-5 my-10 bg-gray-700 border-0" />

      <div className='flex flex-row'>
        <ResponsiveContainer width="100%" height={400}>
          <h1 className='text-2xl font-aileron font-light mt-10 mx-10 '>Line Chart</h1>

          <LineChart
            data={dataLineChart}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="user" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="business" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={400}>
          <h1 className='text-2xl font-aileron font-light mt-10 mx-10 '>Stacked Area Charts</h1>

          <AreaChart
            width={500}
            height={400}
            data={dataLineChart}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="user" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
            <Area type={cardinal} dataKey="business" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <hr className="h-1 mx-5 my-24  bg-gray-700 border-0" />
      <div className='flex flex-row'>
        <ResponsiveContainer width="100%" height={300}>
          <h1 className='text-2xl font-aileron font-light mt-10 mx-10 '>Bar Chart of Level</h1>
          <p className='text-md font-aileron font-light mx-10 '>According to months</p>

          <BarChart
            data={initialData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="+2" fill="#8884d8" />
            <Bar dataKey="bachelor" fill="black" />
            <Bar dataKey="masters" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={300}>
          <h1 className='text-2xl font-aileron font-light mt-10 mx-10 '>Bar Chart of Level</h1>
          <p className='text-md font-aileron font-light mx-10 '>According to total users</p>

          <BarChart
            data={BarGraphData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="education" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="numberOfUsers" fill="#8884d8" />

          </BarChart>
        </ResponsiveContainer>

      </div>
    </div>
  );
}

export default DashBoard