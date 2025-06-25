export interface ChatResponse {
  keywords: string[]
  responses: string[]
}

export const chatData: Record<string, ChatResponse> = {
  greeting: {
    keywords: [
      "hi",
      "hello",
      "hey",
      "greetings",
      "good morning",
      "good afternoon",
      "good evening",
    ],
    responses: [
      "Hello! I'm here to help you learn about [Your Name]. What would you like to know?",
      "Hi there! Welcome to [Your Name]'s portfolio. Feel free to ask me anything!",
      "Hey! Great to see you here. What can I tell you about [Your Name]?",
    ],
  },

  name: {
    keywords: ["name", "who are you", "your name"],
    responses: [
      "I'm a chat assistant for [Your Name]'s portfolio. I can tell you about their skills, projects, and experience!",
      "I'm here to help visitors learn about [Your Name] and their work.",
    ],
  },

  skills: {
    keywords: [
      "skills",
      "technologies",
      "tech stack",
      "programming",
      "languages",
      "frameworks",
      "tools",
    ],
    responses: [
      "**Technical Skills:**\n\n• **Frontend:** React, Next.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, Material-UI\n• **Backend:** Node.js, Express.js, Python, Django, REST APIs\n• **Database:** PostgreSQL, MongoDB, MySQL, Redis\n• **DevOps:** Docker, AWS, Vercel, Netlify, CI/CD\n• **Tools:** Git, VS Code, Figma, Postman",
      "[Your Name] specializes in full-stack development with expertise in modern JavaScript frameworks, particularly React and Next.js. They also have strong experience with backend technologies and cloud services.",
    ],
  },

  experience: {
    keywords: [
      "experience",
      "work",
      "career",
      "job",
      "employment",
      "years",
      "background",
    ],
    responses: [
      "**Professional Experience:**\n\n🏢 **Senior Full Stack Developer** - TechCorp Inc.\n📅 2021 - Present\n• Led development of microservices architecture\n• Mentored junior developers\n• Improved app performance by 40%\n\n🏢 **Full Stack Developer** - StartupXYZ\n📅 2019 - 2021\n• Built RESTful APIs and React applications\n• Implemented real-time features using WebSockets\n\n🏢 **Frontend Developer** - Digital Agency\n📅 2018 - 2019\n• Created responsive web applications\n• Collaborated with design team",
      "[Your Name] has 5+ years of professional experience in software development, working on various projects from startups to enterprise applications.",
    ],
  },

  projects: {
    keywords: [
      "projects",
      "portfolio",
      "work samples",
      "built",
      "created",
      "developed",
      "showcase",
    ],
    responses: [
      "**Featured Projects:**\n\n🚀 **E-Commerce Platform**\n• Built with Next.js, Node.js, and PostgreSQL\n• Features: Shopping cart, payment integration, admin panel\n• 10,000+ active users\n\n📊 **Analytics Dashboard**\n• React, D3.js, Express.js\n• Real-time data visualization\n• Handles 1M+ data points daily\n\n📱 **Task Management Mobile App**\n• React Native, Firebase\n• Cross-platform iOS/Android app\n• 4.8★ rating on app stores\n\n🤖 **AI Chat Bot**\n• Python, TensorFlow, React\n• Natural language processing\n• 95% accuracy in intent recognition",
      "I can show you several impressive projects [Your Name] has worked on. Each demonstrates different technical skills and problem-solving abilities. Would you like to know more about any specific project?",
    ],
  },

  education: {
    keywords: [
      "education",
      "degree",
      "university",
      "college",
      "study",
      "qualification",
      "certification",
    ],
    responses: [
      "**Education & Certifications:**\n\n🎓 **Bachelor of Computer Science**\nUniversity Name - 2018\n• GPA: 3.8/4.0\n• Dean's List\n\n📜 **Certifications:**\n• AWS Certified Developer - Associate\n• MongoDB Certified Developer\n• Google Analytics Certified\n\n📚 **Continuous Learning:**\n• Regularly completes online courses\n• Active in developer communities\n• Contributes to open source",
      "[Your Name] has a strong educational foundation in computer science and continues to learn through certifications and self-study.",
    ],
  },

  contact: {
    keywords: [
      "contact",
      "email",
      "reach",
      "hire",
      "connect",
      "social",
      "linkedin",
      "github",
    ],
    responses: [
      "**Get in Touch:**\n\n📧 **Email:** your.email@example.com\n💼 **LinkedIn:** linkedin.com/in/yourname\n🐙 **GitHub:** github.com/yourname\n🐦 **Twitter:** @yourhandle\n📱 **Phone:** +1 (555) 123-4567\n\n[Your Name] typically responds within 24 hours.",
      "The best way to reach [Your Name] is via email at your.email@example.com. They're also active on LinkedIn and GitHub!",
    ],
  },

  about: {
    keywords: [
      "about",
      "tell me about",
      "who is",
      "personality",
      "interests",
      "hobbies",
    ],
    responses: [
      "[Your Name] is a passionate full-stack developer who loves creating elegant solutions to complex problems. They believe in writing clean, maintainable code and building products that make a difference.\n\n**Interests:** Open source contribution, Tech blogging, Hackathons, Mountain biking, Photography",
      "Beyond coding, [Your Name] is an advocate for clean code practices, mentors junior developers, and regularly speaks at local tech meetups. They're driven by the challenge of solving real-world problems through technology.",
    ],
  },

  availability: {
    keywords: [
      "available",
      "hire",
      "freelance",
      "job",
      "work together",
      "opportunity",
      "position",
    ],
    responses: [
      "**Availability Status:** ✅ Open to Opportunities\n\n[Your Name] is interested in:\n• Full-time positions (Remote/Hybrid)\n• Freelance projects\n• Consulting opportunities\n• Open source collaborations\n\nThey're particularly excited about projects involving AI/ML, innovative startups, or social impact.",
      "Yes! [Your Name] is currently exploring new opportunities. They're looking for roles where they can make a significant impact and work with cutting-edge technologies.",
    ],
  },

  location: {
    keywords: ["location", "where", "based", "city", "country", "remote"],
    responses: [
      "📍 **Location:** San Francisco, CA\n🌍 **Work Preference:** Remote-first\n✈️ **Willing to relocate:** For the right opportunity\n\n[Your Name] has experience working with distributed teams across multiple time zones.",
      "[Your Name] is based in San Francisco but works effectively with remote teams. They're open to both on-site and remote positions.",
    ],
  },

  achievements: {
    keywords: ["achievements", "awards", "recognition", "accomplishments"],
    responses: [
      "**Notable Achievements:**\n\n🏆 **Best App Award** - TechConf 2023\n🥇 **1st Place** - City Hackathon 2022\n📝 **Published Author** - 10+ technical articles\n🌟 **Open Source** - 2000+ GitHub stars\n🎤 **Speaker** - Delivered talks at 5+ conferences",
      "[Your Name] has been recognized for their technical excellence and contributions to the developer community through various awards and speaking engagements.",
    ],
  },
}

export function getResponse(input: string): string {
  const lowercaseInput = input.toLowerCase().trim()

  // Check for exact matches first
  if (lowercaseInput === "?" || lowercaseInput === "help") {
    return "I can help you with:\n\n• **Skills & Technologies**\n• **Work Experience**\n• **Projects**\n• **Education**\n• **Contact Information**\n• **About [Your Name]**\n• **Availability**\n\nJust ask me anything!"
  }

  // Check each category for keyword matches
  for (const [category, data] of Object.entries(chatData)) {
    const hasMatch = data.keywords.some((keyword) =>
      lowercaseInput.includes(keyword.toLowerCase())
    )

    if (hasMatch) {
      // Return a random response from the matched category
      const responses = data.responses
      return responses[Math.floor(Math.random() * responses.length)]
    }
  }

  // Default response if no keywords match
  const defaultResponses = [
    "I'm not sure about that. Try asking about skills, projects, experience, or how to contact [Your Name]!",
    "Could you rephrase that? I can help with information about [Your Name]'s background, skills, and work.",
    "I didn't quite understand. You can ask me about:\n• Skills & Technologies\n• Projects\n• Experience\n• Education\n• Contact Info",
  ]

  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
}
