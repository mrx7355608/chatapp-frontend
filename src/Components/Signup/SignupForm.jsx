import React from "react";
import { Button, Input } from "@chakra-ui/react";
import LoadingFormButton from "../Custom/LoadingFormButton";
import useSignup from "../../Hooks/useSignup";

export default function SignupForm() {
    const signup = useSignup();
    const [error, setError] = React.useState();
    const [loading, setLoading] = React.useState();
    const [signupData, setSignupData] = React.useState({
        fname: "",
        lname: "",
        username: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { value, name } = e.target;
        setSignupData({ ...signupData, [name]: value });
    };
    const handleSubmit = (e) => {
        setLoading(true);
        signup(e, signupData, setLoading, setError);
    };

    return (
        <form onSubmit={(e) => handleSubmit(e)} method="post">
            {error && error.type === "api" && error.message}
            <Input
                type="text"
                onChange={(e) => handleChange(e)}
                name="fname"
                variant="outline"
                pt="1.5"
                size="md"
                mt="3"
                placeholder="First name"
            />
            {error && error.type === "fname" && error.message}
            <Input
                type="text"
                onChange={(e) => handleChange(e)}
                name="lname"
                variant="outline"
                pt="1.5"
                size="md"
                mt="3"
                placeholder="Last name"
            />
            {error && error.type === "lname" && error.message}
            <Input
                type="text"
                onChange={(e) => handleChange(e)}
                name="username"
                variant="outline"
                pt="1.5"
                size="md"
                mt="3"
                placeholder="Username"
            />
            {error && error.type === "username" && error.message}

            <Input
                type="password"
                onChange={(e) => handleChange(e)}
                name="password"
                variant="outline"
                pt="1.5"
                size="md"
                placeholder="Password"
                mt="3"
            />
            {error && error.type === "password" && error.message}

            <Input
                type="password"
                onChange={(e) => handleChange(e)}
                name="confirmPassword"
                variant="outline"
                pt="1.5"
                size="md"
                mt="3"
                placeholder="Confirm Password"
            />
            {error && error.type === "confirmPassword" && error.message}

            {loading ? (
                <LoadingFormButton btnText="Signing up ..." />
            ) : (
                <Button
                    mt="8"
                    type="submit"
                    size="md"
                    pt="1"
                    w="full"
                    colorScheme="orange"
                >
                    Signup
                </Button>
            )}
        </form>
    );
}
