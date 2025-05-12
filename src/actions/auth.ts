"use server";
import { LoginFormSchema, RegisterFormSchema } from "@/lib/rules";
import { createSession } from "@/lib/session";
import { getCollection } from "@/server/database";
import { AuthStateType } from "@/types/types";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

const userCollection = await getCollection("users");

export async function register(
    prevState: AuthStateType,
    formData: FormData,
): Promise<AuthStateType> {
    console.log(prevState);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    const validatedRegisterForm = RegisterFormSchema.safeParse({
        email: email,
        password: password,
        confirmPassword: confirmPassword,
    });

    if (validatedRegisterForm.success) {
        const hashed_password = await bcrypt.hash(password, 10);

        if (userCollection) {
            const existingUser = await userCollection.findOne({ email });
            if (existingUser)
                return { msg: "User Already Login", email: email };
            const results = await userCollection.insertOne({
                email,
                password: hashed_password,
            });

            await createSession(results.insertedId.toString());
            redirect("/");
        } else {
            return { msg: "Database users not found", email: email };
        }

        return { msg: "success", error: false };
    } else {
        return {
            error: validatedRegisterForm.error.flatten().fieldErrors,
            email: email,
        };
    }
}

export async function login(
    state: AuthStateType,
    formData: FormData,
): Promise<AuthStateType> {
    console.log(state);

    const validatedForm = LoginFormSchema.safeParse({
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    });

    if (validatedForm) {
        const { email, password } = <{ email: string; password: string }>(
            validatedForm.data
        );

        if (userCollection) {
            const existingUser = await userCollection.findOne({ email });

            if (existingUser) {
                const check_password = await bcrypt.compare(
                    password,
                    existingUser.password,
                );
                console.log(check_password);

                if (check_password) {
                    await createSession(existingUser._id.toString());
                    redirect("/");
                } else {
                    return { error: "Incorrect password" };
                }
            } else {
                return { error: "User not found" };
            }
        } else {
            return { error: "Server Failed" };
        }
    } else {
        return {
            error: "Invalid Credentials",
        };
    }

    return { msg: "hi" };
}
