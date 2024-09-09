'use client';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const router = useRouter();

  return (
    <div>
      <h1>Welcome to the Application</h1>
      <p>Please login to manage your items.</p>
      <button onClick={() => router.push('/login')}>Go to Login</button> {/* นำทางไปยังหน้า Login */}
    </div>
  );
};

export default HomePage;
