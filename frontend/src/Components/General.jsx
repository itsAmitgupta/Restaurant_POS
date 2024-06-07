import React, { useState, useRef } from "react";
import Navbar from "./Navbar";
// import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";

function General() {
  return (
    <>
      <div className="w-screen h-screen overflow-x-hidden bg-gray-900 text-white">
        <div className="w-full">
          <Navbar />
        </div>
        <div>
          <Breadcrumb />
        </div>
        <div>
          <Form />
          {/* <DragDropFiles/> */}
        </div>
      </div>
    </>
  );
}

const Breadcrumb = () => {
  return (
    <div className="w-screen mt-1 shadow-2xl">
      <div className="px-2 py-1 bg-gray-700 rounded-lg border border-gray-300">
        <h2 className="text-white font-bold text-lg">General Setting</h2>
        {/* <ul className="flex space-x-2">
          <li className="decoration-blue-500 hover:text-blue-500 hover:cursor-pointer hover:underline">
            Home
          </li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            // width="800px"
            // height="800px"
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z"
              fill="#0F0F0F"
            />
          </svg>
          <li className="decoration-blue-500 hover:text-blue-500 hover:cursor-pointer hover:underline">
            General Setting
          </li>
        </ul> */}
      </div>
    </div>
  );
};

const Form = () => {
  const [files, setFiles] = useState(null);
  const inputRef = useRef();

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFiles(event.dataTransfer.files);
  };

  return (
    <form
      onSubmit={() => {
        e.preventDefault;
      }}
      className="mt-5 px-5 shadow-lg w-screen"
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label
            htmlFor=""
            className="block text-sm font-medium leading-6 text-white"
          >
            App name <span className="text-red-500">*</span>{" "}
          </label>
          <input
            className="w-3/4 h-8 rounded font-xl text-gray-900 py-[5px] outline-none border focus:border-green-600 border-gray-400"
            type="text"
            defaultValue="Restro"
            required
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor=""
            className="block text-sm font-medium leading-6 text-white"
          >
            Default Customer <span className="text-red-500">*</span>{" "}
          </label>
          <select className="w-3/4 h-8 rounded text-gray-900 font-xl py-[5px] outline-none border focus:border-green-600 border-gray-400">
            <option value="Default Customer" selected>
              Default Customer
            </option>
            <option value="">Dhiren</option>
            <option value="">Amit</option>
            <option value="">Mukesh</option>
            <option value="">Dhruti</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor=""
            className="block text-sm font-medium leading-6 text-white"
          >
            Sales Account <span className="text-red-500">*</span>{" "}
          </label>
          <select className="w-3/4 h-8 rounded font-xl py-[5px] text-gray-900 outline-none border focus:border-green-600 border-gray-400">
            <option value="Default Customer" selected>
              Default Account
            </option>
            <option value=""></option>
          </select>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor=""
            className="block text-sm font-medium leading-6 text-white"
          >
            Purchases Account <span className="text-red-500">*</span>{" "}
          </label>
          <select className="w-3/4 h-8 rounded font-xl text-gray-900 py-[5px] outline-none border focus:border-green-600 border-gray-400">
            <option value="Default Customer" selected>
              Default Account
            </option>
            <option value=""></option>
          </select>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor=""
            className="block text-sm font-medium leading-6 text-white"
          >
            Payroll Account <span className="text-red-500">*</span>{" "}
          </label>
          <select className="w-3/4 h-8 rounded text-gray-900 font-xl py-[5px] outline-none border focus:border-green-600 border-gray-400">
            <option value="Default Customer" selected>
              Default Account
            </option>
            <option value=""></option>
          </select>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor=""
            className="block text-sm font-medium leading-6 text-white"
          >
            Copyright<span className="text-red-500">*</span>{" "}
          </label>
          <input
            className="w-3/4 h-8 text-gray-900 rounded font-xl py-[5px] outline-none border focus:border-green-600 border-gray-400"
            type="text"
            defaultValue="&#169;2024 Digisol"
            required
          />
        </div>

        {/* <div className="flex flex-col">
              <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Logo</label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <h1>Drag and drop over</h1>
                <h1>or</h1>
                <input type="file" 
                  onChange={(event) => setFiles(event.target.files)}
                  accept="image/png, image/jpeg"
                ref={inputRef}/>
                { files?
                    <div >
                        <ul>
                            {Array.from(files).map((file, idx) => <li key={idx}>{file.name}</li> )}
                        </ul>
                        <div>
                            <button onClick={() => setFiles(null)}>Cancel</button>
                           
                        </div>
                    </div> :""
                }
              </div>      
        </div> */}
        {/* <div className="flex flex-col">
        <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Logo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
        </div> */}
      </div>
      <div className="my-4">
        <button className="w-32 font-semibold text-lg h-8 bg-white text-gray-900 rounded">
          Submit
        </button>
      </div>
    </form>
    // <form>
    //   <div className="space-y-12">
    //     <div className="border-b border-gray-900/10 pb-12">
    //       <h2 className="text-base font-semibold leading-7 text-gray-900">
    //         Profile
    //       </h2>
    //       <p className="mt-1 text-sm leading-6 text-gray-600">
    //         This information will be displayed publicly so be careful what you
    //         share.
    //       </p>

    //       <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
    //         <div className="sm:col-span-4">
    //           <label
    //             htmlFor="username"
    //             className="block text-sm font-medium leading-6 text-gray-900"
    //           >
    //             Username
    //           </label>
    //           <div className="mt-2">
    //             <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
    //               <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
    //                 workcation.com/
    //               </span>
    //               <input
    //                 type="text"
    //                 name="username"
    //                 id="username"
    //                 autoComplete="username"
    //                 className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
    //                 placeholder="janesmith"
    //               />
    //             </div>
    //           </div>
    //         </div>

    //         <div className="col-span-full">
    //           <label
    //             htmlFor="about"
    //             className="block text-sm font-medium leading-6 text-gray-900"
    //           >
    //             About
    //           </label>
    //           <div className="mt-2">
    //             <textarea
    //               id="about"
    //               name="about"
    //               rows={3}
    //               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //               defaultValue={""}
    //             />
    //           </div>
    //           <p className="mt-3 text-sm leading-6 text-gray-600">
    //             Write a few sentences about yourself.
    //           </p>
    //         </div>

    //         <div className="col-span-full">
    //           <label
    //             htmlFor="photo"
    //             className="block text-sm font-medium leading-6 text-gray-900"
    //           >
    //             Photo
    //           </label>
    //           <div className="mt-2 flex items-center gap-x-3">
    //             <UserCircleIcon
    //               className="h-12 w-12 text-gray-300"
    //               aria-hidden="true"
    //             />
    //             <button
    //               type="button"
    //               className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
    //             >
    //               Change
    //             </button>
    //           </div>
    //         </div>

    //         <div className="col-span-full">
    //           <label
    //             htmlFor="cover-photo"
    //             className="block text-sm font-medium leading-6 text-gray-900"
    //           >
    //             Cover photo
    //           </label>
    //           <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
    //             <div className="text-center">
    //               <PhotoIcon
    //                 className="mx-auto h-12 w-12 text-gray-300"
    //                 aria-hidden="true"
    //               />
    //               <div className="mt-4 flex text-sm leading-6 text-gray-600">
    //                 <label
    //                   htmlFor="file-upload"
    //                   className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
    //                 >
    //                   <span>Upload a file</span>
    //                   <input
    //                     id="file-upload"
    //                     name="file-upload"
    //                     type="file"
    //                     className="sr-only"
    //                   />
    //                 </label>
    //                 <p className="pl-1">or drag and drop</p>
    //               </div>
    //               <p className="text-xs leading-5 text-gray-600">
    //                 PNG, JPG, GIF up to 10MB
    //               </p>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>

    //     <div className="border-b border-gray-900/10 pb-12">
    //       <h2 className="text-base font-semibold leading-7 text-gray-900">
    //         Personal Information
    //       </h2>
    //       <p className="mt-1 text-sm leading-6 text-gray-600">
    //         Use a permanent address where you can receive mail.
    //       </p>

    //       <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
    //         <div className="sm:col-span-3">
    //           <label
    //             htmlFor="first-name"
    //             className="block text-sm font-medium leading-6 text-gray-900"
    //           >
    //             First name
    //           </label>
    //           <div className="mt-2">
    //             <input
    //               type="text"
    //               name="first-name"
    //               id="first-name"
    //               autoComplete="given-name"
    //               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //             />
    //           </div>
    //         </div>

    //         <div className="sm:col-span-3">
    //           <label
    //             htmlFor="last-name"
    //             className="block text-sm font-medium leading-6 text-gray-900"
    //           >
    //             Last name
    //           </label>
    //           <div className="mt-2">
    //             <input
    //               type="text"
    //               name="last-name"
    //               id="last-name"
    //               autoComplete="family-name"
    //               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //             />
    //           </div>
    //         </div>

    //         <div className="sm:col-span-4">
    //           <label
    //             htmlFor="email"
    //             className="block text-sm font-medium leading-6 text-gray-900"
    //           >
    //             Email address
    //           </label>
    //           <div className="mt-2">
    //             <input
    //               id="email"
    //               name="email"
    //               type="email"
    //               autoComplete="email"
    //               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //             />
    //           </div>
    //         </div>

    //         <div className="sm:col-span-3">
    //           <label
    //             htmlFor="country"
    //             className="block text-sm font-medium leading-6 text-gray-900"
    //           >
    //             Country
    //           </label>
    //           <div className="mt-2">
    //             <select
    //               id="country"
    //               name="country"
    //               autoComplete="country-name"
    //               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
    //             >
    //               <option>United States</option>
    //               <option>Canada</option>
    //               <option>Mexico</option>
    //             </select>
    //           </div>
    //         </div>

    //         <div className="col-span-full">
    //           <label
    //             htmlFor="street-address"
    //             className="block text-sm font-medium leading-6 text-gray-900"
    //           >
    //             Street address
    //           </label>
    //           <div className="mt-2">
    //             <input
    //               type="text"
    //               name="street-address"
    //               id="street-address"
    //               autoComplete="street-address"
    //               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //             />
    //           </div>
    //         </div>

    //         <div className="sm:col-span-2 sm:col-start-1">
    //           <label
    //             htmlFor="city"
    //             className="block text-sm font-medium leading-6 text-gray-900"
    //           >
    //             City
    //           </label>
    //           <div className="mt-2">
    //             <input
    //               type="text"
    //               name="city"
    //               id="city"
    //               autoComplete="address-level2"
    //               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //             />
    //           </div>
    //         </div>

    //         <div className="sm:col-span-2">
    //           <label
    //             htmlFor="region"
    //             className="block text-sm font-medium leading-6 text-gray-900"
    //           >
    //             State / Province
    //           </label>
    //           <div className="mt-2">
    //             <input
    //               type="text"
    //               name="region"
    //               id="region"
    //               autoComplete="address-level1"
    //               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //             />
    //           </div>
    //         </div>

    //         <div className="sm:col-span-2">
    //           <label
    //             htmlFor="postal-code"
    //             className="block text-sm font-medium leading-6 text-gray-900"
    //           >
    //             ZIP / Postal code
    //           </label>
    //           <div className="mt-2">
    //             <input
    //               type="text"
    //               name="postal-code"
    //               id="postal-code"
    //               autoComplete="postal-code"
    //               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //             />
    //           </div>
    //         </div>
    //       </div>
    //     </div>

    //     <div className="border-b border-gray-900/10 pb-12">
    //       <h2 className="text-base font-semibold leading-7 text-gray-900">
    //         Notifications
    //       </h2>
    //       <p className="mt-1 text-sm leading-6 text-gray-600">
    //         We'll always let you know about important changes, but you pick what
    //         else you want to hear about.
    //       </p>

    //       <div className="mt-10 space-y-10">
    //         <fieldset>
    //           <legend className="text-sm font-semibold leading-6 text-gray-900">
    //             By Email
    //           </legend>
    //           <div className="mt-6 space-y-6">
    //             <div className="relative flex gap-x-3">
    //               <div className="flex h-6 items-center">
    //                 <input
    //                   id="comments"
    //                   name="comments"
    //                   type="checkbox"
    //                   className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
    //                 />
    //               </div>
    //               <div className="text-sm leading-6">
    //                 <label
    //                   htmlFor="comments"
    //                   className="font-medium text-gray-900"
    //                 >
    //                   Comments
    //                 </label>
    //                 <p className="text-gray-500">
    //                   Get notified when someones posts a comment on a posting.
    //                 </p>
    //               </div>
    //             </div>
    //             <div className="relative flex gap-x-3">
    //               <div className="flex h-6 items-center">
    //                 <input
    //                   id="candidates"
    //                   name="candidates"
    //                   type="checkbox"
    //                   className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
    //                 />
    //               </div>
    //               <div className="text-sm leading-6">
    //                 <label
    //                   htmlFor="candidates"
    //                   className="font-medium text-gray-900"
    //                 >
    //                   Candidates
    //                 </label>
    //                 <p className="text-gray-500">
    //                   Get notified when a candidate applies for a job.
    //                 </p>
    //               </div>
    //             </div>
    //             <div className="relative flex gap-x-3">
    //               <div className="flex h-6 items-center">
    //                 <input
    //                   id="offers"
    //                   name="offers"
    //                   type="checkbox"
    //                   className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
    //                 />
    //               </div>
    //               <div className="text-sm leading-6">
    //                 <label
    //                   htmlFor="offers"
    //                   className="font-medium text-gray-900"
    //                 >
    //                   Offers
    //                 </label>
    //                 <p className="text-gray-500">
    //                   Get notified when a candidate accepts or rejects an offer.
    //                 </p>
    //               </div>
    //             </div>
    //           </div>
    //         </fieldset>
    //         <fieldset>
    //           <legend className="text-sm font-semibold leading-6 text-gray-900">
    //             Push Notifications
    //           </legend>
    //           <p className="mt-1 text-sm leading-6 text-gray-600">
    //             These are delivered via SMS to your mobile phone.
    //           </p>
    //           <div className="mt-6 space-y-6">
    //             <div className="flex items-center gap-x-3">
    //               <input
    //                 id="push-everything"
    //                 name="push-notifications"
    //                 type="radio"
    //                 className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
    //               />
    //               <label
    //                 htmlFor="push-everything"
    //                 className="block text-sm font-medium leading-6 text-gray-900"
    //               >
    //                 Everything
    //               </label>
    //             </div>
    //             <div className="flex items-center gap-x-3">
    //               <input
    //                 id="push-email"
    //                 name="push-notifications"
    //                 type="radio"
    //                 className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
    //               />
    //               <label
    //                 htmlFor="push-email"
    //                 className="block text-sm font-medium leading-6 text-gray-900"
    //               >
    //                 Same as email
    //               </label>
    //             </div>
    //             <div className="flex items-center gap-x-3">
    //               <input
    //                 id="push-nothing"
    //                 name="push-notifications"
    //                 type="radio"
    //                 className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
    //               />
    //               <label
    //                 htmlFor="push-nothing"
    //                 className="block text-sm font-medium leading-6 text-gray-900"
    //               >
    //                 No push notifications
    //               </label>
    //             </div>
    //           </div>
    //         </fieldset>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="mt-6 flex items-center justify-end gap-x-6">
    //     <button
    //       type="button"
    //       className="text-sm font-semibold leading-6 text-gray-900"
    //     >
    //       Cancel
    //     </button>
    //     <button
    //       type="submit"
    //       className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    //     >
    //       Save
    //     </button>
    //   </div>
    // </form>
  );
};

const DragDropFiles = () =>
  // {inputRef,files,setFiles}
  {
    // const [files, setFiles] = useState(null);
    // const inputRef = useRef();

    const handleDragOver = (event) => {
      event.preventDefault();
    };

    const handleDrop = (event) => {
      event.preventDefault();
      setFiles(event.dataTransfer.files);
    };

    // send files to the server // learn from my other video
    const handleUpload = () => {
      const formData = new FormData();
      formData.append("Files", files);
      console.log(formData.getAll());
      // fetch(
      //   "link", {
      //     method: "POST",
      //     body: formData
      //   }
      // )
    };

    if (files)
      return (
        <div className="uploads">
          <ul>
            {Array.from(files).map((file, idx) => (
              <li key={idx}>{file.name}</li>
            ))}
          </ul>
          <div className="actions">
            <button onClick={() => setFiles(null)}>Cancel</button>
            <button onClick={handleUpload}>Upload</button>
          </div>
        </div>
      );

    return (
      <>
        <div
          className="dropzone"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <h1>Drag and Drop Files to Upload</h1>
          <h1>Or</h1>
          <input
            type="file"
            onChange={(event) => setFiles(event.target.files)}
            hidden
            accept="image/png, image/jpeg"
            ref={inputRef}
          />
          <button onClick={() => inputRef.current.click()}>Select Files</button>
        </div>
      </>
    );
  };

export default General;
