import {getPayload} from 'payload'
import config from "@payload-config"

const categories = [
  {
    name: "All",
    slug: "all",
  },
  {
    name: "Business & Money",
    color: "#FFB347",
    slug: "business-money",
    subcategories: [
      { name: "Accounting", slug: "accounting" },
      { name: "Entrepreneurship", slug: "entrepreneurship" },
      { name: "Gigs & Side Projects", slug: "gigs-side-projects" },
      { name: "Investing", slug: "investing" },
      { name: "Management & Leadership", slug: "management-leadership" },
      { name: "Marketing & Sales", slug: "marketing-sales" },
    ],
  },
  {
    name: "Technology",
    color: "#5AA9E6",
    slug: "technology",
    subcategories: [
      { name: "Software Development", slug: "software-development" },
      { name: "AI & Machine Learning", slug: "ai-machine-learning" },
      { name: "Cybersecurity", slug: "cybersecurity" },
      { name: "Cloud Computing", slug: "cloud-computing" },
      { name: "Data Science", slug: "data-science" },
    ],
  },
  {
    name: "Design & Creative",
    color: "#FF6961",
    slug: "design-creative",
    subcategories: [
      { name: "Graphic Design", slug: "graphic-design" },
      { name: "UI/UX Design", slug: "ui-ux-design" },
      { name: "Illustration", slug: "illustration" },
      { name: "Video Editing", slug: "video-editing" },
      { name: "Photography", slug: "photography" },
    ],
  },
  {
    name: "Personal Development",
    color: "#77DD77",
    slug: "personal-development",
    subcategories: [
      { name: "Productivity", slug: "productivity" },
      { name: "Mindfulness", slug: "mindfulness" },
      { name: "Communication Skills", slug: "communication-skills" },
      { name: "Time Management", slug: "time-management" },
      { name: "Public Speaking", slug: "public-speaking" },
    ],
  },
  {
    name: "Health & Fitness",
    color: "#C23B22",
    slug: "health-fitness",
    subcategories: [
      { name: "Nutrition", slug: "nutrition" },
      { name: "Exercise & Training", slug: "exercise-training" },
      { name: "Mental Health", slug: "mental-health" },
      { name: "Yoga & Meditation", slug: "yoga-meditation" },
    ],
  },
  {
    name: "Lifestyle & Hobbies",
    color: "#F49AC2",
    slug: "lifestyle-hobbies",
    subcategories: [
      { name: "Travel", slug: "travel" },
      { name: "Cooking", slug: "cooking" },
      { name: "Gaming", slug: "gaming" },
      { name: "Gardening", slug: "gardening" },
      { name: "DIY Projects", slug: "diy-projects" },
    ],
  },
  {
    name: "Education",
    color: "#AEC6CF",
    slug: "education",
    subcategories: [
      { name: "Online Courses", slug: "online-courses" },
      { name: "Languages", slug: "languages" },
      { name: "Teaching", slug: "teaching" },
      { name: "Study Tips", slug: "study-tips" },
    ],
  },
];


const seed = async () => { 
    const payload = await getPayload({config})

    for (const category of categories){
        const parentCategory = await payload.create({
            collection:"categories",
            data:{
                name:category.name,
                slug:category.slug,
                color:category.color,
                parent:null,
            }
        })

        
        for (const subcategory of category.subcategories || [] ){
            await payload.create({
                collection:"categories",
                data:{
                    name:subcategory.name,
                    slug:subcategory.slug,
                    parent:parentCategory.id,
                }
            })
        }
    }


};


try{
    await seed();
    process.exit(0);
}catch(error){
    console.error(error)
    process.exit(1);
}
