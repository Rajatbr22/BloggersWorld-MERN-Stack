import { Link, useNavigate} from "react-router-dom"
import { Alert, Button, Label, Spinner } from "flowbite-react"
import { TextInput } from "flowbite-react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice"
import OAuth from "../components/OAuth"

const SignIn = () => {
    const [formData, setFormData] = useState({});
    const { loading, error: errorMessage } = useSelector(state => state.user)

    const navigate = useNavigate();

    const dispatch = useDispatch();
    

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id] : e.target.value.trim()})    
    }
    // console.log(formData);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!formData.email || !formData.password){
            return dispatch(signInFailure('Please fill out all fields.'))
        }

        try{
            dispatch(signInStart())
            const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(formData)
            })
            const data = await res.json();
            if(data.success === false){
                dispatch(signInFailure(data.message))
            }

            if(res.ok){
                dispatch(signInSuccess(data));
                navigate('/');
            }
        }
        catch(error){
            dispatch(signInFailure(error.message))
        }
    }
    

    return (
        <div className="min-h-screen mt-20"> 
            <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">

                {/* Left */}
                <div className="flex-1">
                    <Link to="/" className="font-bold dark:text-white text-4xl">

                    <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl text-white">
                    Blogger's
                    </span>
                    World
                    </Link>

                    <p className="text-sm mt-5"> 
                        This is my dream project. You can sign in with your email and password or with Google.
                    </p>
                </div>


                {/* Right */}
                <div className="flex-1">
                    <form className="flex flex-col gap-4">

                        <div className="">
                            <Label value="Your email"/>
                            <TextInput
                                type="email"
                                placeholder="Email"
                                id="email"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="">
                            <Label value="Your password"/>
                            <TextInput
                                type="password"
                                placeholder="Password"
                                id="password"
                                onChange={handleChange}
                            />
                        </div>

                        <Button
                            gradientDuoTone="purpleToPink" type="submit" onClick={handleSubmit} disabled={loading}
                        >
                            {
                                loading ? (
                                    <>
                                        <Spinner size="sm"/>
                                        <span className="pl-3">Loading...</span>
                                    </>
                                ) : 'Sign In'
                            }
                        </Button>
                        <OAuth/>
                    </form>

                    <div className="flex gap-2 text-sm mt-5">
                        <span>Don't Have an account?</span>
                        <Link to='/signup' className="text-blue-500">
                            Sign Up
                        </Link>
                    </div>
                    {
                        errorMessage && (
                            <Alert className="mt-5" color="failure">
                                {errorMessage}
                            </Alert>
                        )
                    }

                </div>

            </div>
        </div>
    )
}

export default SignIn