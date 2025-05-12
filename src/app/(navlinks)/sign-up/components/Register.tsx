"use client";
import { register } from "@/actions/auth";
import { AuthStateType } from "@/types/types";
import { useActionState } from "react";

interface RegisterProps {
    setRegisterLogin: React.Dispatch<React.SetStateAction<string>>;
}
const Register = ({ setRegisterLogin }: RegisterProps) => {
    const [state, action, isPending] = useActionState<AuthStateType, FormData>(
        register,
        {},
    );
    return (
        <div className="m-auto mt-64 h-fit py-12 flex flex-col items-center gap-4 w-[30vw]  backdrop-blur-2xl bg-[#2c2c2c80] rounded-lg [box-shadow:-3px_3px_6px_rgba(0,0,0,0.4)]">
            <h1 className="text-[#f5f5f5] text-[3rem]">Register</h1>
            <form action={action} className="w-[90%] flex flex-col gap-2">
                <div className="flex flex-col text-[#f5f5f5]">
                    <label htmlFor="email" className="text-[#f5f5f580]">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="border-1 border-[#f5f5f5] rounded-lg px-4 py-1 outline-none"
                        defaultValue={state.email}
                    />
                    {state.error
                        ? state.error && <p>{state.error.email}</p>
                        : null}
                    {state.msg ? state.msg && <p>{state.msg}</p> : null}
                </div>
                <div className="flex flex-col text-[#f5f5f5]">
                    <label htmlFor="password" className="text-[#f5f5f580]">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="border-1 border-[#f5f5f5] rounded-lg px-4 py-1 outline-none"
                    />
                    {state.error
                        ? state.error.password && (
                              <ul>
                                  {state
                                      ? state.error.password.map(
                                            (error: string) => (
                                                <li
                                                    key={error}
                                                    className="ml-4"
                                                >
                                                    {error}
                                                </li>
                                            ),
                                        )
                                      : null}
                              </ul>
                          )
                        : null}
                </div>
                <div className="flex flex-col text-[#f5f5f5]">
                    <label
                        htmlFor="confirmPassword"
                        className="text-[#f5f5f580]"
                    >
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        className="border-1 border-[#f5f5f5] rounded-lg px-4 py-1 outline-none"
                    />
                    {state.error
                        ? state.error && <p>{state.error.confirmPassword}</p>
                        : null}
                </div>
                <button className="bg-[#f5f5f5] px-4 py-2 rounded-2xl text-[#2c2c2c] w-[12rem] mx-auto my-4 cursor-pointer">
                    {isPending ? "Loading..." : "Register"}
                </button>
            </form>
            <div>
                <p
                    className="text-[#f5f5f575] cursor-pointer"
                    onClick={() => setRegisterLogin("login")}
                >
                    Already have an account? Login now.
                </p>
            </div>
        </div>
    );
};

export default Register;
