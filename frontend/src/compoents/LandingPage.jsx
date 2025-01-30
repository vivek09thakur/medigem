import { Link } from 'react-router-dom'

const LandingPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-8">Welcome to MediGem</h1>
            <div className="space-x-4">
                <Link to="/login" className="px-6 py-2 bg-blue-500 text-white rounded">
                    Login
                </Link>
                <Link to="/signup" className="px-6 py-2 bg-green-500 text-white rounded">
                    Sign Up
                </Link>
            </div>
        </div>
    )
}

export default LandingPage
