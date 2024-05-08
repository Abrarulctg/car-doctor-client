import { Link, useLocation, useNavigate } from 'react-router-dom';
import loginBg from '../../../assets/images/login/login.svg';
import { useContext } from 'react';
import { AuthContex } from '../../Provider/AuthProvider';
import axios from 'axios';
const Login = () => {
    const { signIn } = useContext(AuthContex);
    const location = useLocation();
    const navigate = useNavigate();
    const handleLogin = (e) => {

        e.preventDefault();
        console.log("btn clicked");
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)

        signIn(email, password)
            .then(res => {
                const loggedInUser = res.user;
                console.log(loggedInUser);

                const user = { email };

                //Get Access Token
                axios.post('http://localhost:4500/jwt', user, { withCredentials: true })
                    .then(res => {
                        console.log(res.data);
                        if (res.data.success) {
                            navigate(location?.state ? location?.state : "/")
                        }
                    })
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="lg:w-1/2 mx-auto mr-12">
                        <img src={loginBg} alt="" />
                    </div>
                    <div className="card flex-shrink-0 w-full lg:w-1/2 shadow-2xl bg-base-100">
                        <h1 className="text-5xl text-center mt-10 font-bold">Login now!</h1>

                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <p>New to Car Doctors? <Link to="/signup">Sign Up</Link></p>
                            <div className="form-control mt-6">
                                <input className='btn btn-primary' type="submit" value="Login" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;