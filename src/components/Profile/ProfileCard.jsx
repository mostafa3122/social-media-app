

import { Avatar, Button, Card } from "flowbite-react";
import React, { useContext, useState } from 'react';

import { UserContext } from "../context/UserContext/UserContext";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { MdEdit } from "react-icons/md";
export default function ProfileCard() {
  let { userData, getUserData } = useContext(UserContext)
  let [imageUpload, setImageUpload] = useState(false);
  let { register, handleSubmit } = useForm({})
  let queryClient = useQueryClient();
  let { mutate: handelImageUpload } = useMutation({
    mutationFn: updateImage,
    onSuccess: () => {
      toast.success("Profile edited successfully");
      setImageUpload(false);
      getUserData();
      queryClient.invalidateQueries({
        queryKey: ["user", userData?._id]
      })
    },
    onError: () => {
      toast.error("Profile edited failed");
    }
  })

  function updateImage(values) {
    let formData = new FormData();
    formData.append("photo", values.photo[0]);
    return axios.put(`${import.meta.env.VITE_BASE_URL}users/upload-photo`, formData, {
      headers: {
        token: localStorage.getItem("token")
      }
    })
  }
  return (<>
    <Card>
      <div className="flex flex-col items-center py-8">
        <div className='relative'>
          <Avatar className='avatar size-24 shadow-lg mb-2 ' alt="User settings" img={userData?.photo} rounded />
          <button onClick={() => setImageUpload(true)} className='absolute bottom-0 right-0 rounded-full bg-gray-900 text-white p-2 cursor-pointer'>
            <MdEdit />
          </button>
        </div>
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{userData?.name}</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">{userData?.email}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">{userData?.dateOfBirth}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">{userData?.gender}</span>
        <div className="mt-4 flex space-x-3 lg:mt-6">
          <Button
            TO="#"
            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          >
            Change Password
          </Button>
        </div>
      </div>
    </Card>
    {
      imageUpload && <>

        <div className="flex items-center justify-center w-full fixed h-screen top-0 left-0 right-0 z-50 bg-gray-50/50">
          <form onSubmit={handleSubmit(handelImageUpload)} className=' bg-gray-900 p-4 min-w-lg rounded-lg'>
            <label htmlFor="dropzone-file" className="  flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 ">
              <div className="flex flex-col items-center justify-center pt-5 pb-6 ">
                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" {...register("photo")} />
            </label>
            <div className='flex gap-2'>
              <Button className='mt-4' type="submit">Submit</Button>
              <Button color="red" className='mt-4' type="submit" onClick={() => setImageUpload(false)}>Cancel</Button>
            </div>
          </form>
        </div>
      </>
    }
  </>


  )
}



// import { Avatar, Button, Card } from "flowbite-react";
// import React, { useContext, useState } from 'react';
// import { MdEdit } from "react-icons/md";
// export default function ProfileCard() {
//   let { userData } = useContext(UserContext)
//   let [imageUpload, setImageUpload] = useState(false)
//   console.log("userdaaaaaaataaaaaaa", userData);
//   // if (!userData) {
//   //   return (
//   //     <div className="text-center mt-10 text-gray-500">
//   //       Loading profile...
//   //     </div>
//   //   )
//   // }
//   return (
//     <>
//       <Card>

//         <div className="flex flex-col items-center pb-10">
//           <div className="relative">
//             {/* <Avatar className="cursor-pointer avatar size-24 mb-2 shadow-lg " alt="User settings" img={userData.photo} rounded /> */}
//             <Avatar className="cursor-pointer avatar size-24 mb-2 shadow-lg " alt="User settings" img={"https://linked-posts.routemisr.com/uploads/default-profile.png"} rounded />

//             <button onClick={() => setImageUpload(true)} className="cursor-pointer absolute b-0 r-0 rounded-full bg-gray-900 p-4 text-white">
//               <MdEdit />
//             </button>
//           </div>
//           <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">userData.name</h5>
//           <span className="text-sm text-gray-500 dark:text-gray-400">userData.email</span>
//           <span className="text-sm text-gray-500 dark:text-gray-400">userData.dateOfBirth</span>
//           <span className="text-sm text-gray-500 dark:text-gray-400">userData.gender</span>
//           <div className="mt-4 flex space-x-3 lg:mt-6">

//             <Button
//               type="button"
//               className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
//             >
//               Change Password
//             </Button>
//           </div>
//         </div>
//       </Card>


//       {
//         imageUpload &&
//           <div className="flex items-center justify-center w-full bg-gray-50">
//             <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 bg-neutral-secondary-medium border border-dashed border-default-strong rounded-base cursor-pointer hover:bg-neutral-tertiary-medium">
//               <div className="flex flex-col items-center justify-center text-body pt-5 pb-6">
//                 <svg className="w-8 h-8 mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h3a3 3 0 0 0 0-6h-.025a5.56 5.56 0 0 0 .025-.5A5.5 5.5 0 0 0 7.207 9.021C7.137 9.017 7.071 9 7 9a4 4 0 1 0 0 8h2.167M12 19v-9m0 0-2 2m2-2 2 2" /></svg>
//                 <p className="mb-2 text-sm"><span className="font-semibold">Click to upload</span> or drag and drop</p>
//                 <p className="text-xs">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
//               </div>
//               <input id="dropzone-file" type="file" className="hidden" />
//             </label>
//           </div>


//       }

//     </>
//   )
// }

