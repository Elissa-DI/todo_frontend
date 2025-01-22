import { useState } from "react";
import { Button } from "@/components/ui/button";
import TextInput from "@/components/textInput";
import SlideShow from "@/components/slideShow";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "@/services/authService";
import { validateEmail, validatePassword } from "@/utils/inputValidator";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
    // Manage form state
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loading, setLoading] = useState(false);

    const isButtonDisabled = !username || !email || !password || !!emailError || !!passwordError;

    const navigate = useNavigate();
    const { toast } = useToast();

    // Handle email input and validate
    const handleEmailChange = (value: string) => {
        setEmail(value);
        if (!validateEmail(value)) {
            setEmailError("Invalid email address");
        } else {
            setEmailError("");
        }
    };

    // Handle password input and validate
    const handlePasswordChange = (value: string) => {
        setPassword(value);
        if (!validatePassword(value)) {
            setPasswordError("Password must be at least 8 characters!");
        } else {
            setPasswordError("");
        }
    };

    // Submit registration data
    const handleRegister = async () => {
        setLoading(true);
        try {
            await registerUser({ username, email, password });
            toast({ title: "Registration Successful" });
            navigate("/login"); // Redirect on success
        } catch (error) {
            toast({
                title: (error as Error).message,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen p-3 md:p-7 lg:p-10 lg:overflow-y-hidden overflow-y-scroll bg-blue-50 flex">
            <div className="w-full lg:h-full md:h-auto h-auto lg:flex bg-white border border-blue-100 p-3 rounded-lg">
                <div
                    className="w-full lg:w-1/2 px-2 lg:px-10 overflow-y-scroll h-full flex items-center"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    <div className="w-full flex flex-col items-center">
                        <div className="flex items-center flex-col gap-y-2">
                            <h2 className="text-2xl text-blue-600 font-bold">Sign Up</h2>
                            <h2 className="text-gray-500 font-semibold">
                                Long waiting is over for you!
                            </h2>
                        </div>
                        {/* Username Input */}
                        <TextInput
                            label="Username"
                            placeholder="Enter your username"
                            width="100%"
                            value={username}
                            onChangeText={setUsername}
                        />
                        {/* Email Input */}
                        <TextInput
                            label="Email"
                            placeholder="Enter your email"
                            width="100%"
                            value={email}
                            onChangeText={handleEmailChange}
                            type="email"
                        />
                        {emailError && (
                            <p className="w-full text-start text-red-500 text-sm">{emailError}</p>
                        )}
                        {/* Password Input */}
                        <TextInput
                            label="Password"
                            placeholder="Enter your password"
                            width="100%"
                            value={password}
                            onChangeText={handlePasswordChange}
                            type="password"
                        />
                        {passwordError && (
                            <p className="text-red-500 text-sm text-start">{passwordError}</p>
                        )}
                        {/* Submit Button */}
                        <Button
                            className="w-full py-5 mt-10 mb-4 bg-blue-600 hover:bg-blue-500 font-bold"
                            disabled={isButtonDisabled || loading}
                            onClick={handleRegister}
                        >
                           {loading ? "Submitting..." : "Sign Up"}
                        </Button>
                        <div className="flex justify-center items-center mb-8">
                            <p className="text-gray-600 font-semibold">
                                Already have an account?
                            </p>
                            <Link to="/login">
                                <a className="text-blue-600 font-bold ml-1">Sign In</a>
                            </Link>
                        </div>
                    </div>
                </div>
                {/* SlideShow Section */}
                <SlideShow />
            </div>
        </div>
    );
};

export default Register;
