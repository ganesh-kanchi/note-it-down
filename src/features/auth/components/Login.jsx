import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginHandler } from "../authSlice"

export const Login = () => {
    const dispatch = useDispatch()
    const guestUser = {
        email: "adarshbalika@gmail.com",
        password: "adarshBalika123",
      };
    const [login, setLogin] = useState({ input: {}, error:"", showPassword: false})

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setLogin({ input: {...login.input, [name]:value}});
    }
    const loginSubmitHandler = (e) => {
        e.preventDefault()
        dispatch(loginHandler({login,setLogin}))
    }
    
    return (
        <div className="flex flex-col p-4 min-h-screen justify-center items-center">
            <div className="flex flex-col max-w-xl min-w-min w-1/3 border-2 rounded-md items-center p-4">

                <div className=" text-4xl font-medium">Login</div>

                <form className="flex flex-col gap-2 w-full text-lg" onSubmit={loginSubmitHandler}>

                    <label>E-mail</label>
                    <input
                        className="bg-inherit py-1 px-2 rounded border-primary border-2 outline-none " 
                        required name="email" value={login.input['email']||""} onChange={inputChangeHandler} 
                        placeholder="Please enter your E-mail here"
                        />
                    <label>Password</label>
                    <input 
                        className="bg-inherit py-1 px-2 rounded border-primary border-2 outline-none " 
                        required name="password" value={login.input['password']||""} onChange={inputChangeHandler} 
                        placeholder="Please enter your Password here"
                        />
                    <button className="bg-primary rounded-full p-1 hover:bg-dimPrimary mt-2" type="submit">
                        Log In
                    </button>
                    <button className="bg-primary rounded-full p-1 hover:bg-dimPrimary mt-2" type="submit" onClick={()=>{
                        setLogin(prev=> {return {...prev, input: guestUser}})
                    }}>
                        Guest Login
                    </button>

                </form>
            </div>
        </div>
    )
} 