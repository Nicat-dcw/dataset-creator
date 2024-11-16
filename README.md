# LLM Dataset Generator

This project is a JavaScript-based tool for generating a dataset of academic questions and answers in various fields using OpenAI's GPT-4 model. It is designed to create unique, diverse, and high-quality question-answer pairs for training large language models (LLMs) or for academic purposes.

## Requirements

- Node.js version 14.0 or higher
- npm (Node Package Manager)

## Installation

### 1. Clone the Repository

Clone this repository using the following command:

```bash
git clone https://github.com/Nicat-dcw/dataset-creator.git

2. Install Dependencies

Navigate to the project folder and install the required dependencies:

cd dataset-creator
npm install

3. API Key and URL Configuration

Since this project uses OpenAI's GPT-4 model, you need to provide your own API key and baseURL. Set the following configuration in the index.js file:

apiKey: Your OpenAI API key.

baseURL: The appropriate URL for OpenAI services.


Update the code in index.js with your API credentials:

const client = new OpenAI({
    apiKey: 'YOUR-API-KEY',
    baseURL: 'https://api.openai.com/v1'
});

4. Running the Generator

Once configured, run the following command to generate the dataset:

node index.js

The program will prompt you to enter how many question-answer pairs you would like to generate. The dataset will be created and saved as a CSV file.

Project Structure

index.js: Main script that generates question-answer pairs and writes them to a CSV file.



Description

This tool uses OpenAI's GPT-4 model to generate academic questions and answers across various subjects, such as mathematics, physics, chemistry, biology, history, literature, etc for Azerbaijani Language. The questions are designed to be logical and at an appropriate educational level. The generated dataset is saved in CSV format, making it easy to use for training models or further analysis.

The dataset contains unique question-answer pairs with concise and clear answers, useful for various educational or research purposes.

Contribution

This project is open-source. Contributions are welcome! If you want to improve the tool, add new features, or fix bugs, feel free to open a pull request or issue on GitHub.

License

This project is licensed under the MIT License.

