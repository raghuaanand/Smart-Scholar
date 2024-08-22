


import ScholarshipPage from "@/components/scholarship"

const scholarshipList =[
    {
        name:'Swiss Government Excellence Scholarships 2025-26',
        link:'https://scholarshipscorner.website/swiss-government-excellence-scholarships/',
        description:'Each year the Swiss Confederation awards Government Excellence Scholarships to promote international exchange and research cooperation between Switzerland and over 180 other countries.',
        level:'Masters/PhD/PostDoc',
        deadline:''
    },
    {
        name:'Fully Funded Scholarship in Canada for International Students',
        link:'https://scholarshipscorner.website/mccall-macbain-scholarships-in-canada/',
        description:'No. of Scholarships and Awards: 130 Scholarships and Awards Available For 2025.',
        level:'Fully funded masters or second-entry professional undergraduate program at McGill University',
        deadline:'August 21, 2024'
    }
]




const Scholarship = ()=>{

    return(<>
    <ScholarshipPage  scholarship={scholarshipList}/>
    </>)
}


export default Scholarship