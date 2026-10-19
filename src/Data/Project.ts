export interface ProjectSection {
  label: string;
  content: string;
  image: string;
}

export interface Project {
  id: string;
  title: string;
  // blurb: string;
  description?: string; // longer write-up shown inside the dropdown
  tech: string[];
  coverImage: string;
  link?: string;
  github?: string;
  // sections?: ProjectSection[];
}

export const projects: Project[] = [
  {
    id: "project-1",
    title: "RABOT",
    description:
      "An AI-powered research assistant that enables users to discover, analyze, and interact with academic research papers through a Retrieval-Augmented Generation (RAG) pipeline. Integrated OpenAlex and arXiv for research paper retrieval, Hugging Face embeddings for semantic representation, ChromaDB for persistent vector storage, and LLM-based generation for context-aware responses. The system automatically processes and retrieves relevant paper content, generates structured summaries, and supports conversational question answering grounded in the selected research paper.",
    tech: ["Python", "Streamlit", "LangChain", "RAG", "OpenAlex API", "arXiv", "Hugging Face", "ChromaDB", "Groq API", "Llama 3.3 70B", "Sentence Transformers", "PyPDF"],
    coverImage: "/projects/project1-1.png",
    link: "https://rabot.ayaza.me/",
    github: "https://github.com/AyazAhmad03/RABOT-Research-Analyst-Assistant-BOT-",
  },
  // ...rest of your projects, same shape

  {
    id: "project-2",
    title: "MLPilot",
     description:
      "An autonomous machine learning pipeline built as a LangGraph graph with two self-correcting feedback loops: a data-quality gate that detects broken datasets and routes them through a cleaning agent (drops hopeless columns, target-missing rows, duplicates — then re-analyzes), and a performance gate that routes weak models through Optuna hyperparameter tuning, adopted only when it genuinely improves CV score. Every run is tracked in MLflow, preprocessing lives inside the pipeline to prevent data leakage, and the trained artifact is saved deploy-ready — with a live Streamlit UI that visualizes agents executing in real time.",
    tech: ["Python", "LangGraph", "Scikit-learn", "Optuna", "MLflow", "Streamlit", "Pandas", "NumPy", "PyYAML", "Joblib"],
    coverImage: "/projects/project2-2.png",
    link: "https://mlpilot-ai.streamlit.app/",
    github: "https://github.com/AyazAhmad03/MLPilot",
    
  },
//   {
//     id: "project-3",
//     title: "Project Three Title",
//     blurb: "One punchy line describing what this project is.",
//     description:
//       "A tool that helps you draft high-engagement X/Twitter posts using prompt-engineered generation, tuned around what actually performs  well on the platform.",
//     tech: ["TypeScript", "Express", "Redis"],
//     coverImage: "/src/assets/project3-cover.png",
//     sections: [
//       { label: "Overview", content: "What this project is, in 2 sentences.", image: "/src/assets/project3-1.png" },
//       { label: "Problem", content: "The problem you were solving.", image: "/src/assets/project3-2.png" },
//       { label: "Approach", content: "What you built and how.", image: "/src/assets/project3-3.png" },
//       { label: "Result", content: "Outcome, metric, or what you learned.", image: "/src/assets/project3-4.png" },
//     ],
//   },
];