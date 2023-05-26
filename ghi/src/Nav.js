import React from "react";

function Nav() {
  return (
    <header aria-label="Site Header" className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="hidden md:block">
            <nav aria-label="Site Nav">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="/"
                  >
                    Home
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="/profile"
                  >
                    Profile
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="/journals"
                  >
                    Journals
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="/messages"
                  >
                    Messages
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="/appointments"
                  >
                    Appointments
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="/resources"
                  >
                    Resources
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}


export default Nav;



//     <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
//       <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
//         <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
//           <ul className="flex flex-row p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
//             <li>
//               <a href="/" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Homepage</a>
//             </li>
//             <li>
//               <a href="/profile" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Profile</a>
//             </li>
//             <li>
//               <a href="/journals" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Entries</a>
//             </li>
//             <li>
//               <a href="/chat" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Messages</a>
//             </li>
//             <li>
//               <a href="/appointments" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Appointments</a>
//             </li>
//             <li>
//               <a href="/resources" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Resources</a>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Nav;



// function Nav() {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light">
//       <div className="collapse navbar-collapse" id="navbarSupportedContent">
//         <ul className="navbar-nav mr-auto" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
//           <li className="nav-item active">
//             <a className="nav-link" href="/">Homepage</a>
//           </li>
//           <li className="nav-item">
//             <a className="nav-link" href="/profile">Profile</a>
//           </li>
//           <li className="nav-item">
//             <a className="nav-link" href="/journals">Entries</a>
//           </li>
//           <li className="nav-item">
//             <a className="nav-link" href="/chat">Messages</a>
//           </li>
//           <li className="nav-item">
//             <a className="nav-link" href="/appointments">Appointments</a>
//           </li>
//           <li className="nav-item">
//             <a className="nav-link" href="/resources">Resources</a>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// }

// export default Nav;
