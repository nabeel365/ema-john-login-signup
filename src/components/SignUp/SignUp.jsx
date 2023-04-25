import React, { useContext, useState } from 'react';
import './signup.css'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';
import { sendEmailVerification } from 'firebase/auth';
const SignUp = () => {
    const [error, setError] = useState('');

    // context api .. 
    const {user, createUser} = useContext(AuthContext);


    const handleSignUp = event => {
        event.preventDefault();

        const form = event.target;
        const username = form.username.value
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;     // value is the assigned name ..
        console.log(email, password, confirm, username);

        if(password !== confirm){
            setError('Password does not match')
            return
        }
        else if(password.length < 6 ){
            setError('Password must be 6 character long')
        } 

        // create user
        createUser(username, email, password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
            form.reset();

            // 
            // sendVerificationEmail(result.user);

        })
        .catch(error => {
            console.log(error);
        })

    }

                 
 // send verification email
//  const sendVerificationEmail = (user) => {
//     sendEmailVerification(user)
//     .then(result => {
//         console.log(result);
//         alert('please  verify your email')
//     })
// }

    return (
        <div>
            <div onSubmit={handleSignUp} className="signup-container">
                <h2>Sign Up</h2>
                <form>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" required />

                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required />

                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required />

                    <label htmlFor="confirm-password">Confirm Password:</label>
                    <input type="password" id="confirm-password" name="confirm" required />

                    <button type="submit">Sign Up</button>

                    <p>Already a customer ? <Link to="/login">Login Here</Link> </p>

                    <strong className='error-text'> {error} </strong>
                </form>
            </div>

{/* context api received ... demo */}
            {/* {user.displayName} */}


        </div>
    );
};

export default SignUp;