import React, { useContext, useState } from 'react';
import './login.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';
import {  getAuth,  sendPasswordResetEmail  } from 'firebase/auth';
import app from '../../firebase.config';


const Login = () => {
    const [show, setShow] = useState(false);



    const auth = getAuth(app);

    



    const { signIn } = useContext(AuthContext);
    // const navigate = useNavigate();

    // location
    // const location = useLocation();
    // console.log(location);

    // const from = location.state?.from?.pathname || '/';


    const handleLogIn = event => {
        event.PreventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        signIn(email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                form.reset();
                navigate(from, { replace: true })
            })
            .catch(error => {
                console.log(error);
            })


            

    }

    

    //    reset password
    sendPasswordResetEmail(auth, email)
        .then(() => {
            
        })
        .catch((error) => {
        });

 
 

 


    return (
        <div>
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleLogIn}>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required />

                    <label htmlFor="password">Password:</label>
                    <input type={show ? "text" : "password"} id="password" name="password" required />
                    <p onClick={() => setShow(!show)}> <small>
                        {
                            show ? <span>Hide Password</span> : <span>Show Password</span>
                        }
                    </small> </p>

                    <button type="submit">Login</button>
                    <p>New to our Website ? <Link to="/sign-up">Sign Up Here</Link> </p>

                    {/* forgot pass */}

                    <p>Forgot your password? <button type="button" >Reset Password</button></p>


                </form>
            </div>


        </div>
    );
};

export default Login;