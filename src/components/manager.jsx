import React, { useRef, useState, useEffect } from "react"
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [passwordsList, setPasswordsList] = useState([])
    const ref = useRef()
    const passwordRef = useRef()

    const getData = async ()=>{
        let res = await fetch("http://localhost:3000");
        let passwords = await res.json()
        if (passwords) {
            setPasswordsList(passwords)
        }
    }
    useEffect(() => {
        getData()
    }, [])

    //for local storage
    const savetoLS = (data) => {
        return localStorage.setItem("passwords", JSON.stringify(data))
    }

    //copying to clipboard
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
        toast.success('🎉 Copied To Clipboard!', {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    //for hiding password
    const handleEye = () => {
        if (ref.current.src.includes("/icons/eyeCross.svg")) {
            ref.current.src = "./icons/eye.svg"
            ref.current.type = "password"
            passwordRef.current.type = "password"
        } else {
            ref.current.src = "./icons/eyeCross.svg"
            passwordRef.current.type = "text"
        }
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    //for saving form object in password useState
    const savePassword = async () => {
        if(form.username.length > 2 && form.password.length > 8){

            await fetch("http://localhost:3000/", {method: "DELETE",headers: { "Content-Type": "application/json" },body: JSON.stringify({id:form.id}),
            })

            setPasswordsList([...passwordsList, {...form , id:uuidv4()}])

            await fetch("http://localhost:3000/", {method: "POST",headers: { "Content-Type": "application/json" },body: JSON.stringify({...form , id:uuidv4()}),
            })

            setForm({ site: "", username: "", password: "" })

            toast.success("Saved! You’re good to go.", {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else{
            toast.error("Failed to Save ! ", {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }
    //deleting u s and pass
    const deletePass= async (id)=>{
        let doubleConfirm = confirm("Letting go is part of moving forward. Confirm to delete.")
        if (doubleConfirm){

            setPasswordsList(passwordsList.filter(item=>item.id != id));

            await fetch("http://localhost:3000/", {method: "DELETE",headers: { "Content-Type": "application/json" },body: JSON.stringify({id}),
            })

            toast.success('Deleted Successfully !', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    //editing password username and site
    const editPass = (id) =>{
        setForm({...passwordsList.filter(item=>item.id === id)[0],id})
        setPasswordsList(passwordsList.filter(item=>item.id != id));
    }

    //clearing table
    const clearTable=()=>{
        let doubleConfirm = confirm("Once deleted, this can't be undone. Are you sure you’re ready to let go?")
        if (doubleConfirm){
            setPasswordsList([]);
            savetoLS([])
            toast.success('Everything Deleted Successfully !', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    return (
        <>
            {/* <div class="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div> */}

            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            {/* ---------------------------------------------------------------------------------------------- */}
            {/* ---------------------------------------------------------------------------------------------- */}
            <div className="flex flex-col justify-center items-center my-24">
                <h1 className='text-2xl font-medium'>
                    <span className='text-blue-600'> &lt;</span>
                    <span className="text-slate-800">Pass </span>
                    <span className='font-bold text-blue-600'>OP</span>
                    <span className='text-blue-600'>/&gt;</span>
                </h1>
                <p>Your Password Manager</p>

                <div className='flex flex-col items-center gap-6 py-5 w-full px-3'>
                    <input type="text" placeholder="Enter Site Name ..." name="site" value={form.site} onChange={handleChange} className='w-full px-3 rounded-xl border border-blue-600 outline-1 outline-blue-500 lg:w-2/3' />

                    <div className='flex lg:flex-row flex-col gap-6 w-full lg:w-2/3'>
                        <input type="text" placeholder="Username " name="username" value={form.username} onChange={handleChange} className='w-full lg:2/3 px-3 rounded-xl border border-blue-600 outline-1 outline-blue-500' />
                        <span className='w-full lg:1/3 relative'>
                            <input type="password" ref={passwordRef} placeholder="Password " name="password" value={form.password} onChange={handleChange} className='w-full px-3 pr-9 rounded-xl border border-blue-600 outline-1 outline-blue-500' />
                            <img src="./icons/eye.svg" width="18px" ref={ref} onClick={handleEye} className='absolute bottom-1 right-2 cursor-pointer' />
                        </span>
                    </div>
                    <button onClick={savePassword} className="flex items-center gap-1 px-6 py-1 text-lg rounded-full border-2 border-blue-500 text-black bg-blue-500">
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>Save
                    </button>
                </div>

                {/* details display */}
                <div className="w-full flex flex-col justify-center px-3 overflow-y-scroll mr-3 gap-3 my-4 mb-12 lg:px-48">
                    <div className="relative text-base font-bold text-gray-500 border-b border-blue-700 px-2">YOUR PASSWORDS {passwordsList.length > 0 && <span onClick={clearTable} className="absolute right-2 text-sm cursor-pointer">Clear all</span>}</div>
                    {passwordsList.length === 0 && <div className="text-center my-10 text-gray-500">No Passwords to show</div>}
                    {passwordsList.length > 0 &&
                        <table className="table-auto rounded-sm overflow-hidden">
                            <thead className="bg-blue-800 text-white">
                                <tr>
                                    <th className="py-1 w-1/4">Site Name</th>
                                    <th className="py-1 w-1/4">Username</th>
                                    <th className="py-1 w-1/4">Password</th>
                                    <th className="py-1 w-1/4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-blue-100">
                                {passwordsList.map((item) => {
                                    return (<tr key={item.id} >
                                        <td className="py-1 w-1/4 text-center">
                                            <span className="flex justify-center items-center gap-1 pl-5 md:gap-2"><a target="_blank" rel="noopener noreferrer" href={item.site.startsWith("http") ? item.site : `https://${item.site}`}> {item.site}</a><img src="./icons/copy.svg" width="17px" alt="" onClick={() => copyToClipboard(item.site)} className="cursor-pointer hover:scale-125 pr-2 w-7" />
                                            </span>
                                        </td>
                                        <td className="py-1 w-1/4 text-center">
                                            <span className="flex justify-center items-center gap-1 pl-5 md:gap-2">{item.username}<img src="./icons/copy.svg" width="17px" alt="" onClick={() => copyToClipboard(item.username)} className="cursor-pointer hover:scale-125 pr-2 w-7" /></span>
                                        </td>
                                        <td className="py-1 w-1/4 text-center">
                                            <span className="flex justify-center items-center gap-1 pl-5 md:gap-2">{item.password}<img src="./icons/copy.svg" width="17px" alt="" onClick={() => copyToClipboard(item.password)} className="cursor-pointer hover:scale-125 pr-2 w-7" /></span>
                                        </td>
                                        <td className="py-1 w-1/4 text-center">
                                            <span onClick={()=>editPass(item.id)} className="px-2 cursor-pointer"><lord-icon
                                                src="https://cdn.lordicon.com/vysppwvq.json"
                                                trigger="hover"
                                                colors="primary:#000000,secondary:#000000"
                                                style={{"width":"25px","height":"25px"}}>
                                            </lord-icon></span>
                                            <span onClick={()=>deletePass(item.id)} className="px-2 cursor-pointer"><lord-icon
                                                src="https://cdn.lordicon.com/wpyrrmcq.json"
                                                trigger="hover"
                                                style={{"width":"25px","height":"25px"}}>
                                            </lord-icon></span>
                                        </td>
                                    </tr>)
                                })}
                            </tbody>
                        </table>}
                </div>


            </div>
        </>
    )
}

export default Manager
