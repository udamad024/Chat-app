import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";
import axios from "axios";

const SignUp = () => {
	const [inputs, setInputs] = useState({
		fullName: "",
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
		gender: "",
		profilePic: null,
	});
	const [file, setFile] = useState(null);
	const { loading, signup } = useSignup();

	const handleCheckboxChange = (gender) => {
		setInputs({ ...inputs, gender });
	};

	const handleFileChange = (e) => {
		setFile(e.target.files[0]);
	};

	const uploadFile = async (file) => {
		const { data } = await axios.post("/api/upload", {
		  fileName: file.name,
		  fileType: file.type,
		});
	  
		const { url, key } = data;
	  
		try {
		  await axios.put(url, file, {
			headers: {
			  "Content-Type": file.type, // Ensure ACL is set
			},
		  });
		} catch (error) {
		  console.error("Error uploading file:", error);
		  throw error;
		}
	  
		return key;
	  };
	  

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (file) {
			const profilePic = await uploadFile(file);
			await signup({ ...inputs, profilePic });
		} else {
			await signup(inputs);
		}
	};

	return (
		<div className='p-4 h-screen flex items-center justify-center'>
			<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
				<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
					<h1 className='text-3xl font-semibold text-center text-gray-300'>
						Sign Up <span className='text-blue-500'> ChatApp</span>
					</h1>

					<form onSubmit={handleSubmit}>
						<div>
							<label className='label p-2'>
								<span className='text-base label-text'>Full Name</span>
							</label>
							<input
								type='text'
								placeholder='John Doe'
								className='w-full input input-bordered  h-10'
								value={inputs.fullName}
								onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
							/>
						</div>

						<div>
							<label className='label p-2 '>
								<span className='text-base label-text'>Username</span>
							</label>
							<input
								type='text'
								placeholder='johndoe'
								className='w-full input input-bordered h-10'
								value={inputs.username}
								onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
							/>
						</div>
						<div>
							<label className='label'>
								<span className='text-base label-text'>Email</span>
							</label>
							<input
								type='email'
								placeholder='Enter Email'
								className='w-full input input-bordered h-10'
								value={inputs.email}
								onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
							/>
						</div>

						<div>
							<label className='label'>
								<span className='text-base label-text'>Password</span>
							</label>
							<input
								type='password'
								placeholder='Enter Password'
								className='w-full input input-bordered h-10'
								value={inputs.password}
								onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
							/>
						</div>

						<div>
							<label className='label'>
								<span className='text-base label-text'>Confirm Password</span>
							</label>
							<input
								type='password'
								placeholder='Confirm Password'
								className='w-full input input-bordered h-10'
								value={inputs.confirmPassword}
								onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
							/>
						</div>

						<GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

						<div>
							<label className='label'>
								<span className='text-base label-text'>Profile Picture</span>
							</label>
							<input type="file" onChange={handleFileChange} className="w-full input input-bordered h-10" />
						</div>

						<Link
							to={"/login"}
							className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'
							href='#'
						>
							Already have an account?
						</Link>

						<div>
							<button className='btn btn-block btn-sm mt-2 border border-slate-700' disabled={loading}>
								{loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
export default SignUp;
