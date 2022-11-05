import { FC, useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { login } from "../Services/auth.service"
import { useForm } from "react-hook-form"
import Loader from "./Loader"

const LoginPage: FC = () => {
    // states and navigation
    const navigate = useNavigate()
    const { state } = useLocation()
    const [loading, setLoading] = useState(false)
    const [statusMsg, setStatusMsg] = useState(state ?? "")

    const {
        register,
        handleSubmit,
    } = useForm()

    useEffect(() => {
        if (statusMsg) {
            setTimeout(() => {
                setStatusMsg("")
            }, 4000)
        }
    }, [statusMsg])

    // Login on button click
    async function onSubmit(data: any) {
        setLoading(true)

        const response = await login(data)

        if (response?.status === 200) {
            // Navigate and reload if successful
            if (response.data.isAdmin !== 0) {
                navigate("/dashboard")
                window.location.reload()
            } else {
                navigate("/")
                window.location.reload()
            }
        } else {
            setStatusMsg(response?.data)
        }

        // Reset loading state
        setLoading(false)
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen gap-4">
            <h1 className="font-bold text-3xl mb-6 text-cyan-900">DSPLAY</h1>

            <form
                className="flex flex-col"
                action=""
                onSubmit={handleSubmit(onSubmit)}
            >
                <input
                    className="border rounded py-2 px-3 mb-3"
                    type="text"
                    id="username"
                    placeholder="username"
                    {...register("username", { required: true })}
                    aria-label={"your username"}
                />

                <input
                    className="border rounded py-2 px-3 mb-3"
                    type="password"
                    id="pass"
                    placeholder="password"
                    {...register("password", { required: true })}
                    aria-label={"your password"}
                />

                <input
                    className="border rounded py-2 px-3 bg-slate-50 cursor-pointer"
                    type="submit"
                    value="login"
                    aria-label={"submit"}
                />

                <Link
                    to={"/register"}
                    className="text-cyan-900 hover:text-cyan-600"
                >
                    Not a user yet?
                </Link>

                {(() => {
                    if (statusMsg) {
                        return statusMsg.includes("success") ? (
                            <p className="text-green-700 bg-green-50 border border-green-700 rounded mt-3">
                                {statusMsg}
                            </p>
                        ) : (
                            <p className="text-red-700 bg-red-50 border border-red-700 rounded mt-3">
                                {statusMsg}
                            </p>
                        )
                    }
                })()}
            </form>

            {loading && <Loader />}
        </div>
    )
}

export default LoginPage
