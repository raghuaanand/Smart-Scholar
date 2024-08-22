'use client';

import { useEffect, useState } from "react";

const JobsPage = () => {
    const [jobs, setJobs] = useState<any[]>([]); // Ensure the state is an array
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await fetch('/api/remote');
                if (!res.ok) {
                    throw new Error('Failed to fetch');
                }
                const data = await res.json();
                setJobs(data.data); // Access the correct part of the response
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
            finally {
                setLoading(false);
            }   
        };
        fetchJobs();
    }, []);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <>
            <h1>Jobs</h1>
            <div className="min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold text-center mb-6">Job Listings</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job:any) => (
                    <div key={job.slug} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <h2 className="text-2xl font-semibold mb-2">{job.title}
                        </h2>
                        <p  className="text-gray-600 mb-3"> {job.location}</p>
                        <p className="text-gray-600 mb-2">{job.category}</p>
                           
                        <p className="text-gray-600 mb-4">{job.company_name}</p>
                        <div className="text-gray-800 text-sm" dangerouslySetInnerHTML={{ __html: job.description }} />
                        <a href={job.url} target="_blank" className="text-blue-500 hover:text-blue-700 mt-4 block">View Job</a>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
};

export default JobsPage;
