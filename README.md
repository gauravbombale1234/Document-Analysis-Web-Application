# Document Analysis Web Application

## Overview

The **Document Analysis Web Application** is designed to allow users to upload scanned PDF documents and receive a detailed text analysis. Using **Azure's Document Intelligence service**, the application extracts and processes text data from PDF files and provides valuable insights such as word counts, character counts, sentence counts, word frequency, and more. 

This project aims to create a seamless, responsive, and user-friendly experience for analyzing documents online.

---

## Features

### Frontend Features:
- **Upload Interface**: 
  - Drag-and-drop file upload area
  - Supports **PDF** files
- **Analysis Display**:
  - **Basic Document Statistics**:
    - Word count
    - Character count (with and without spaces)
    - Sentence count
    - Average word length
  - **Word Frequency Analysis**:
    - Top 20 most frequent words
    - Option to exclude common words (stop words)
- **UI Requirements**:
  - Mobile-friendly and responsive design
  - Loading states to indicate processing
  - Error handling and user feedback
  - Clean, intuitive interface

### Backend Features:
- **File Processing**:
  - File type validation (PDF)
  - Integration with **Azure Document Intelligence API**
  - Efficient error handling
- **Analysis Features**:
  - Text extraction from documents
  - Statistical analysis computation
  - Word frequency calculation
- **API Design**:
  - RESTful endpoints
  - Proper status codes and error responses

---

## Languages Used

- **Frontend**: HTML, CSS, JavaScript, React, TypeScript, Vite

---

## How to Run the Application

To run the project locally, follow the instructions below:

1. **Install Dependencies**:  
   Open a terminal and run the following command to install the necessary packages:
   ```bash
   npm install
   ```

2. **Run the Application**:  
   After installing dependencies, start the application using:
   ```bash
   npm run dev
   ```

3. **Set Up Azure Credentials**:  
   Ensure you have an Azure account and access to the **Document Intelligence service**.
   - Update the `.env` file with your Azure credentials:
     ```
     VITE_AZURE_ENDPOINT=your_azure_endpoint
     VITE_AZURE_KEY=your_azure_key
     ```

---

## Support for Multiple Languages

- This application supports **Only PDF files** in multiple languages, provided the text within the PDF is extractable by Azure's Document Intelligence service.

---

## Design Decisions & Trade-offs

- **Azure Integration**:  
  - The choice to use **Azure Document Intelligence** was made for its high-quality text extraction and analysis capabilities. This provided a reliable solution for our file processing needs.
  
- **Frontend Framework**:  
  - We used **React** with **TypeScript** for its component-based architecture and scalability. This allows easy maintenance and modularity in the application.
  
- **File Upload**:  
  - The **drag-and-drop** file upload interface is simple, intuitive, and responsive, providing an excellent user experience across devices.
  
- **Performance Considerations**:  
  - **Azure’s cloud services** handle text extraction, ensuring efficient processing, while **React** provides smooth updates to the UI during document analysis.

---

## Future Improvements

- **Multi-language support**:  
  Expand to support **multiple languages** for text analysis (e.g., by utilizing more Azure language models).
  
- **Text Summary**:  
  Implement a feature that summarizes the document content for faster insights.
  
- **Advanced Word Analysis**:  
  Implement a more sophisticated word analysis tool, offering the ability to visualize word clouds or contextual analysis of frequent words.

- **Local Document Storage**:  
  Enable users to download processed analysis results in various formats (e.g., PDF, CSV).

---

## Result Screenshots

Below are the screenshots showing the document analysis results:

- **Main Dashboard**:
  ![Main Dashboard](![1 DashBoard](https://github.com/user-attachments/assets/39e1f82f-792a-4c4f-86d1-ba58d0203ae7)
)  
  _The main dashboard where users can upload documents and view analysis options._

- **Document Statistics**:
  ![Document Statistics](https://drive.google.com/uc?export=view&id=1fOpXoHh06Sy3J248_sEFD8vqM8CmbBwV)
  _Word count, sentence count, and average word length for a sample document._


- **Word Frequency**:
  - **With Common Words**:
    ![Word Frequency with Common Words](![3 1_CW](https://github.com/user-attachments/assets/d31147eb-ec72-4b26-bcd5-54875faef4f8)
)  
    _The top 20 most frequent words in the document including common (stop) words._
  
  - **Without Common Words**:
    ![Word Frequency without Common Words](https://github.com/user-attachments/assets/b066fde2-461e-4585-bc18-75fd04beac61)  
    _The top 20 most frequent words in the document excluding common (stop) words._

- **Extracted Text (Supports Multiple Languages)**:
  - **English**:
    ![Extracted Text - English](https://github.com/user-attachments/assets/32bc3681-3d75-46b0-a664-7d37a931d049)  
    _The raw extracted text from the document in English._

  - **Marathi**:
    ![Extracted Text - Marathi](https://github.com/user-attachments/assets/ba5c16f7-f8d6-4bd3-bf6d-f9ea68a87db4)  
    _The raw extracted text from the document in Marathi._

  - **Sanskrit**:
    ![Extracted Text - Sanskrit](https://github.com/user-attachments/assets/227b13fe-af10-406b-9494-2a01c12b8110)  
    _The raw extracted text from the document in Sanskrit._

  - **Hindi**:
    ![Extracted Text - Hindi](https://github.com/user-attachments/assets/7cc50c8a-cc22-4f10-bf80-78dab0934a07)  
    _The raw extracted text from the document in Hindi._

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```
