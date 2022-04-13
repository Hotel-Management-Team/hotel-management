import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { useState, useContext } from 'react'
import AlertMessage from "../layout/AlertMessage";


const RegisterForm = () => {

	const [registerForm, setRegisterForm] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: ''
	})

	const {registerUser} = useContext(AuthContext);

	const [alert, setAlert] = useState(null);

	const register = async (e) => {
		e.preventDefault()
		try {
			const {password , confirmPassword} = registerForm;
			if(password !== confirmPassword){
				setAlert({
					type: 'danger',
					msg: 'Passwords do not match'
				})
				setTimeout(() => {
					setAlert(null)
				}, 5000)
				return;
			}
			const registerData = await registerUser(registerForm)
			if (!registerData.success) {
				
				setAlert({
					type: 'danger',
					msg: registerData.msg
				})
				setTimeout(() => {
					setAlert(null)
				}, 5000)
			}
		} catch (error) {
			console.log(error)
		}
	}



	return (
		<>
			<Form className='my-4' onSubmit={register}>
				<AlertMessage info={alert} />
				<Form.Group>
					<Form.Control 
					className='my-3 py-2'
					type='text'
					placeholder='Username'
					name='username'
					required
					value={registerForm.username}
					onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })}
					/>
					<Form.Control
						className='my-3 py-2'
						type='text'
						placeholder='Email'
						name='email'
						required
						value={registerForm.email}
						onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Control
						className='my-3 py-2'
						type='password'
						placeholder='Password'
						name='password'
						required
						value={registerForm.password}
						onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Control
						className='my-3 py-2'
						type='password'
						placeholder='Confirm Password'
						name='confirmPassword'
						required
						value={registerForm.confirmPassword}
						onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
						/>
				</Form.Group>
				<Button className='px-5'
				variant='success' type='submit'>
					Register
				</Button>
			</Form>
			<p>
				Already have an account?
				<Link to='/login'>
					<Button variant='info' size='sm' className='ml-2'>
						Login
					</Button>
				</Link>
			</p>
		</>
	)
}

export default RegisterForm
