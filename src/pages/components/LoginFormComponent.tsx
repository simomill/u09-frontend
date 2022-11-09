import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../Services/auth.service';

const LoginForm = ({ state, setLoading, loading }: any) => {
    // STATES AND VARIABLES
    const [statusMsg, setStatusMsg] = useState(state);
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    async function onSubmit(data: any) {
        setLoading(true);

        const response = await login(data);

        if (response?.status === 200) {
            // Navigate and reload if successful
            if (response.data.isAdmin !== 0) {
                navigate('/dashboard');
                window.location.reload();
            } else {
                navigate('/');
                window.location.reload();
            }
        } else {
            setStatusMsg(response?.data);
        }

        // Reset loading state
        setLoading(false);
    }

    useEffect(() => {
        if (statusMsg) {
            setTimeout(() => {
                setStatusMsg('');
            }, 4000);
        }
    }, [statusMsg]);

    return (
        <div>
            <form
                className="flex flex-col"
                action=""
                onSubmit={handleSubmit(onSubmit)}
            >
                <input
                    className="inputField"
                    type="text"
                    id="username"
                    placeholder="username"
                    {...register('username', { required: true })}
                    aria-label={'your username'}
                />

                <input
                    className="inputField"
                    type="password"
                    id="pass"
                    placeholder="password"
                    {...register('password', { required: true })}
                    aria-label={'your password'}
                />

                <input
                    className="bg-slate-50 yesNoBtn"
                    type="submit"
                    value="login"
                    aria-label={'submit'}
                />

                <Link to={'/register'} className="textLink">
                    Not a user yet?
                </Link>

                {/* 
                The text should be green if it has "success" in it, 
                otherwise it should be red. 
                */}

                {(() => {
                    if (statusMsg) {
                        return statusMsg.includes('success') ? (
                            <p className="msg success">{statusMsg}</p>
                        ) : (
                            <p className="msg warning">{statusMsg}</p>
                        );
                    }
                })()}
            </form>
        </div>
    );
};

export default LoginForm;
