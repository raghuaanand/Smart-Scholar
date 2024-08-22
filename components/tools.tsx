import Image from "next/image";

export const WritingPage = () => {
    return (
        <div className="flex flex-col lg:flex-row my-10 lg:my-20 lg:mx-20 mx-5">
            <div className="flex flex-col items-center lg:w-1/2 w-full text-center lg:text-left mt-10">
                <h2 className="text-2xl lg:text-4xl font-bold text-gray-800">Powerful Writing in Seconds</h2>
                <p className="text-md lg:text-xl text-gray-600 mt-4">
                    Hundreds of AI tools give you the power to create, edit, and polish text in seconds. Improve your content or create original high-quality writing that fits your unique style and goals.
                </p>
            </div>
            <div className="lg:w-1/2 w-full mt-10 lg:mt-0 rounded-lg overflow-hidden shadow-lg">
                <Image
                    src='/essayz.png'
                    alt="Writing tools"
                    width={1700}
                    height={1900}
                    className="w-full h-auto object-cover"
                />
            </div>
        </div>
    );
}

export const JobsPage = () => {
    return (
        <div className="flex flex-col lg:flex-row my-10 lg:my-20 lg:mx-20 mx-5">
            <div className="flex flex-col items-center lg:w-1/2 w-full text-center lg:text-left mt-10">
                <h1 className="text-2xl lg:text-4xl font-bold text-gray-800">Looking for a New Role?</h1>
                <p className="text-md lg:text-xl text-gray-600 mt-4">Find jobs with our powerful job tools.</p>
            </div>
            <div className="lg:w-1/2 w-full mt-10 lg:mt-0 rounded-lg overflow-hidden shadow-lg">
                <Image
                    src='/jobss.png'
                    alt="Job tools"
                    width={1700}
                    height={1200}
                    className="w-full h-auto object-cover"
                />
            </div>
        </div>
    );
}

export const AcademicPage = () => {
    return (
        <div className="flex flex-col lg:flex-row my-10 lg:my-20 lg:mx-20 mx-5">
            <div className="lg:w-1/2 w-full mt-10 lg:mt-0 rounded-lg overflow-hidden shadow-lg">
                <Image
                    src='/research.png'
                    alt="Academic tools"
                    width={1700}
                    height={1200}
                    className="w-full h-auto object-cover"
                />
            </div>
            <div className="flex flex-col items-center lg:w-1/2 w-full text-center lg:text-left mt-10">
                <h1 className="text-2xl lg:text-4xl font-bold text-gray-800">Academic Research and Writing</h1>
                <p className="text-md lg:text-xl text-gray-600 mt-4">
                    HyperWrite leverages real-time research by searching through millions of scholarly articles, powering your AI assistant with accurate, current, and citation-backed results.
                </p>
            </div>
        </div>
    );
}

export const StudyPlan = () => {
    return (
        <div className="flex flex-col lg:flex-row my-10 lg:my-20 lg:mx-20 mx-5">
            <div className="lg:w-1/2 w-full mt-10 lg:mt-0 rounded-lg overflow-hidden shadow-lg">
                <Image
                    src='/studyPlan.png'
                    alt="Study Planner"
                    width={1700}
                    height={1200}
                    className="w-full h-auto object-cover"
                />
            </div>
            <div className="flex flex-col items-center lg:w-1/2 w-full text-center lg:text-left mt-10">
                <h1 className="text-2xl lg:text-4xl font-bold text-gray-800">Study Planner</h1>
                <p className="text-md lg:text-xl text-gray-600 mt-4">
                    Create a study plan for your upcoming exam.
                </p>
            </div>
        </div>
    );
}