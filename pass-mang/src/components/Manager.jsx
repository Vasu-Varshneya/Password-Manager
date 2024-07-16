import React, { useEffect } from 'react'
import { useState, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", user: "", pass: "" })
  const [passwordArray, setpassword] = useState([])
  useEffect(() => {
    //passwords naam ka local storage mein agar hain to usse load kardo.
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpassword(JSON.parse(passwords))
    }
  }, [])
  const showPassword = () => {
    passwordRef.current.type = "text"
    console.log(ref.current.src);
    if (ref.current.src.includes("icons/wired-outline-243-glasses-eye-blink.png")) {
      ref.current.src = "icons/wired-outline-69-eye.png"
      passwordRef.current.type = "password"
    }
    else {
      ref.current.src = "icons/wired-outline-243-glasses-eye-blink.png"
      passwordRef.current.type = "text"
    }
  }
  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }
  const savepassword = () => {
    toast('Saved password', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setpassword([...passwordArray, {...form,id:uuidv4()}])
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form,id:uuidv4()}]))
    setform({ site: "", user: "", pass: "" })
  }
  const deletepass=(id)=>{
    console.log("Deleting password with",id)
    let c = confirm("Do you really want to delete this password?")
    if(c){
      toast('Password deleted', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setpassword(passwordArray.filter(item=>item.id!==id))
      localStorage.setItem("passwords",JSON.stringify(passwordArray.filter(item=>item.id!==id)))
    }
  }
  const editpass=(id)=>{
    console.log("Editing password with",id)
    //yaha passArray ke 0th index pe subarray ki saare elements ki id match kar rhi hain so it will return the whole sub array and use it with set form so its value of form will be restored.
    setform(passwordArray.filter(i=>i.id===id)[0])
    // yaha passArray mein koi bhi element ki id match nahi kar rhi therefore filter will return none and setpassword will set passArray to empty subarray.
    setpassword(passwordArray.filter(item=>item.id!==id))
  }
  const copyText = (text) => {
    toast('Copied to clipboard', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text);
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-500 opacity-20 blur-[100px]"></div></div>
      <div className=' md:container mx-auto py-4'>
        <h1 className='flex justify-center  text-green-500 py-2 text-xl font-bold'>
          <span>&lt;</span>
          <span>Pass</span><span>OP/&gt;</span>
        </h1>
        <p className=' py-2 text-green-500 flex justify-center'>Your own password manager</p>
        <div className='  flex flex-col py-4 text-black  items-center'>
          <input value={form.site} onChange={handlechange} type="py-3 text py-4" className='rounded-full border border-green-500 w-full px-3' placeholder='Enter website URL' name='site' />
          <div className=" flex py-8 text-black  justify-between gap-7 p-7 w-full ">
            <input value={form.user} onChange={handlechange} type="py-5 text-white " placeholder='Enter Username' className='rounded-full border border-green-500 w-full px-2' name='user' />
            <div className='relative cursor-pointer'>
              <input value={form.pass} ref={passwordRef} onChange={handlechange} type="password" placeholder='password' className='rounded-full border border-green-500 w-full px-2 ' name='pass' />
              <span className='absolute right-0 top-0 ' onClick={showPassword}>
                <img ref={ref} className='p-1 cursor-pointer' width={26} src="icons/wired-outline-69-eye.png" alt="eye" />
              </span>
            </div>


          </div>
          <button onClick={savepassword} className='flex justify-center items-center bg-green-500 rounded-full w-fit px-4 py-2 hover:bg-green-400 border border-green-900' >
            <lord-icon
              src="https://cdn.lordicon.com/kndkiwmf.json"
              trigger="hover"
              stroke="bold">
            </lord-icon>
            Save Password</button>
          <div className='paswor'>
            <h2 className='py-4 text-2xl font-bold'>Your passwords</h2>
            {passwordArray.length === 0 && <div>No passwords to show</div>}
            {passwordArray.length !== 0 &&
              <table className="table-auto w-full">
                <thead className='bg-green-800 py-2 text-white'>
                  <tr>
                    <th className='py-2'>Site</th>
                    <th className='py-2'>Username</th>
                    <th className='py-2'>Password</th>
                    <th className='py-2'>Actions</th>
                  </tr>
                </thead>
                <tbody className='bg-green-100'>
                  {passwordArray.map((item, index) => {
                    return <tr key={index}>
                      <td className='py-2 w-64 flex justify-center items-center'><a href={item.site} target='_blank'>{item.site}</a>
                        <div className='size-7 flex justify-center items-center cursor-pointer' onClick={() => { copyText(item.site) }}>
                          <lord-icon
                            src="https://cdn.lordicon.com/zyzoecaw.json"
                            trigger="hover"
                          >
                          </lord-icon>
                        </div>
                      </td>
                      <td className='py-2 text-center w-64'>{item.user}</td>
                      <td className='py-2 text-center w-64'>{item.pass}</td>
                      <td className='py-2 text-center w-64'>
                        <span className='cursor-pointer mx-2' onClick={()=>{deletepass(item.id)}}><lord-icon
                          src="https://cdn.lordicon.com/drxwpfop.json"
                          trigger="hover"
                          stroke="bold">
                        </lord-icon></span>
                        <span className='cursor-pointer mx-2' onClick={()=>{editpass(item.id)}}>
                          <lord-icon
                            src="https://cdn.lordicon.com/wuvorxbv.json"
                            trigger="hover"
                            stroke="bold">
                          </lord-icon></span>
                      </td>
                    </tr>
                  })}
                </tbody>
              </table>}
          </div>
        </div>
      </div>
    </>
  )
}

export default Manager
