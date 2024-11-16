# LLM Dataset Generator

A **JavaScript-based tool** designed to generate datasets of academic question-and-answer pairs across various fields using OpenAI's GPT-4 model. This tool aims to create **unique, diverse, and high-quality content** suitable for training large language models (LLMs) or for academic purposes, with a focus on **Azerbaijani language** content.

---

## **Features**
- Generate logical, subject-specific questions in **mathematics, physics, chemistry, biology, history, literature**, and more.
- Save generated data in **CSV format** for easy integration with training or research pipelines.
- Provides concise and clear answers to accompany each question.

---

## **Requirements**
- **Node.js** version 14.0 or higher  
- **npm** (Node Package Manager)  
- An OpenAI GPT-4 API key  

---

## **Installation**

### **1. Clone the Repository**
Clone the project to your local environment using the following command:  
```bash
git clone https://github.com/Nicat-dcw/dataset-creator.git

2. Install Dependencies

Navigate to the project folder and install the necessary packages:

cd dataset-creator
npm install

3. API Key and Base URL Configuration

This tool requires an OpenAI API key for accessing GPT-4. Update the index.js file with your API credentials:

const client = new OpenAI({
    apiKey: 'YOUR-API-KEY',
    baseURL: 'https://api.openai.com/v1'
});

Replace YOUR-API-KEY with your OpenAI API key. If necessary, adjust the baseURL for OpenAI services.

4. Run the Generator

Run the dataset generator with the following command:

node index.js

The program will prompt you to specify the number of question-answer pairs to generate. The output will be saved as a CSV file in the project directory.

Project Structure

├── index.js          # Main script for generating datasets
├── package.json      # Project configuration and dependencies
└── README.md         # Project documentation

How It Works

	1.	Leverages the OpenAI GPT-4 API to generate academic questions and answers.
	2.	Supports multiple academic subjects tailored to the Azerbaijani language.
	3.	Outputs data in CSV format, suitable for:
	•	Training LLMs
	•	Educational purposes
	•	Research and analysis

Contribution

This project is open-source, and contributions are encouraged!
If you wish to:
	•	Fix bugs
	•	Add new features
	•	Enhance functionality

Feel free to create a pull request or open an issue on the GitHub repository.

License

This project is licensed under the MIT License. You are free to use, modify, and distribute this software.

Start generating your custom academic dataset today!

