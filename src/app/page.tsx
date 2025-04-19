import Link from "next/link";

export default function HomePage() {
  return (
      <div className="min-h-screen bg-gradient-to-r from-pink-200 via-white to-blue-200 flex flex-col items-center justify-center gap-10 p-6">
        {/*<div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl w-full max-w-2xl p-10 flex flex-col items-center gap-8">*/}

        {/* Welcome Box */}
        {/*<div className="flex flex-col items-center gap-10 px-4 py-12 bg-gradient-to-br from-pink-50 to-blue-50 min-h-screen">*/}
          {/* Welcome Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl px-10 py-8 text-center max-w-2xl w-full -mt-6">
          <h1 className="text-5xl font-extrabold text-pink-600 mb-3">👋 Welcome</h1>
          <p className="text-gray-700 text-xl">Choose a fetching strategy to explore</p>
        </div>


        {/* Fetching Strategy Cards */}
          <div className="flex justify-center items-stretch flex-wrap gap-8">
            {/* Parallel Fetching */}
            <Link href="/parallel" className="w-[300px]">
              <div className="min-h-[30px] flex items-center justify-center bg-white/90 backdrop-blur-md rounded-2xl shadow-xl px-8 py-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:ring-2 hover:ring-blue-200">
                <h2 className="text-2xl font-bold text-blue-600">🔁 Parallel Fetching</h2>
              </div>
            </Link>

            {/* Sequential Fetching */}
            <Link href="/sequential" className="w-[300px]">
              <div className="min-h-[30px] flex items-center justify-center bg-white/90 backdrop-blur-md rounded-2xl shadow-xl px-8 py-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:ring-2 hover:ring-blue-200">
                <h2 className="text-2xl font-bold text-pink-600 mb-2">🔂 Sequential Fetching</h2>
                {/* <p className="text-sm text-gray-600">Execute tasks one by one in a specific order.</p> */}
              </div>
            </Link>

          </div>
        </div>




      // </div>

  );
}


// import Link from "next/link";
//
// export default function HomePage() {
//   return (
//       <div className="min-h-screen bg-gradient-to-r from-pink-200 via-white to-blue-200 flex flex-col items-center justify-center gap-10 p-6">
//         {/* Welcome Section */}
//         <div className="text-center">
//           <h1 className="text-3xl font-bold text-pink-600 mb-2">👋 Welcome</h1>
//           <p className="text-gray-700 text-lg">Choose a fetching strategy to explore</p>
//         </div>
//
//         {/* Buttons Container */}
//         <div className="flex w-full justify-center gap-4">
//           {/* Parallel Fetching Box */}
//           <Link href="/parallel" className="w-1/2">
//             <div className="bg-white/80 backdrop-blur-md rounded-2xl px-6 py-8 text-center cursor-pointer transform transition-transform duration-300 hover:-translate-y-2 flex items-center justify-center gap-2">
//               <span className="text-blue-600">🔄</span>
//               <h2 className="text-2xl font-semibold text-blue-600">Parallel</h2>
//             </div>
//           </Link>
//
//           {/* Sequential Fetching Box */}
//           <Link href="/sequential" className="w-1/2">
//             <div className="bg-white/80 backdrop-blur-md rounded-2xl px-6 py-8 text-center cursor-pointer transform transition-transform duration-300 hover:-translate-y-2 flex items-center justify-center gap-2">
//               <span className="text-pink-600">🔄</span>
//               <h2 className="text-2xl font-semibold text-pink-600">Sequential</h2>
//             </div>
//           </Link>
//         </div>
//       </div>
//   );
// }