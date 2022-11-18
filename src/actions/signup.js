import { redirect } from "react-router-dom";

const signupAction = async ({ request }) => {
    const formData = await request.formData();
    const fname = formData.get("fname");
    const lname = formData.get("lname");
    const username = formData.get("username");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm_password");

    const errors = {};

    // first name
    if (typeof fname !== "string" || fname.length < 4) {
        errors.fname = "First name should be at least 4 characters long";
    } else if (typeof lname !== "string" || lname.length < 4) {
        errors.lname = "Last name should be at least 4 characters long";
    } else if (typeof username !== "string" || username.length < 5) {
        errors.username = "Username is too short, use 5 characters at least";
    } else if (typeof password !== "string" || password.length < 8) {
        errors.password = "Password should be at least 8 characters long";
    } else if (confirmPassword !== password) {
        errors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(errors).length) return errors;

    // Signup api call
    try {
        const userData = {
            fname,
            lname,
            username,
            password,
            confirm_password: confirmPassword,
        };
        const url = `${import.meta.env.VITE_API_URL}/auth/signup`;
        const options = {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        };
        const apiResponse = await fetch(url, options);
        if (!apiResponse.ok) {
            const apiData = await apiResponse.json();
            errors.apiError = apiData.message;
            return errors;
        }
        return redirect("/login");
    } catch (err) {
        if (err.name === "TypeError" || err.name === "NetworkError") {
            throw new Response("It seems that the server is down!", {
                status: 500,
            });
        }
        throw new Response("Something went wrong!", { status: 500 });
    }
};

export default signupAction;
