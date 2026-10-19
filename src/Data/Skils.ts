export interface Skill {
  category: string;
  items: string[];
}

export const skills: Skill[] = [
  {
    category: "Programming",
    items: [
      "Python",
      "C++",
      "SQL",
      "JavaScript",
    ],
  },

  {
    category: "AI & Machine Learning",
    items: [
      "Machine Learning",
      "Deep Learning",
      "Natural Language Processing",
      "Generative AI",
      "LLM Integration",
      "Prompt Engineering",
      "RAG",
      "AI Agents",
    ],
  },

  {
    category: "AI Frameworks & Libraries",
    items: [
      "LangChain",
      "LangGraph",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "Hugging Face",
      "Sentence Transformers",
    ],
  },

  {
    category: "LLM & Vector Technologies",
    items: [
      "Groq",
      "Llama",
      "ChromaDB",
      "FAISS",
      "Embeddings",
      "Semantic Search",
    ],
  },
  
  {
    category: "Deployment & Tools",
    items: [
      "Docker",
      "Railway",
      "Render",
      "Postman",
      "VS Code",
      "Jupyter",
      "Google Colab",
    ],
  },
];