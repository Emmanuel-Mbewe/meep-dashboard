// pages/content.js
import React, { useState } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import axios from 'axios';
import { FaBold, FaItalic, FaUnderline } from 'react-icons/fa';
import Head from 'next/head';

const topics = {
  Mathematics: ['Algebra', 'Geometry', 'Calculus'],
  Science: ['Physics', 'Chemistry', 'Biology'],
  English: ['Grammar', 'Literature', 'Writing'],
  History: ['Ancient', 'Medieval', 'Modern'],
};

const sub_topics = {
  Mathematics: ['Sub Algebra', 'Sub Geometry', 'Sub Calculus'],
  Science: ['Sub Physics', 'Sub Chemistry', 'Sub Biology'],
  English: ['Sub Grammar', 'Sub Literature', 'Sub Writing'],
  History: ['Sub Ancient', 'Sub Medieval', 'Sub Modern'],
};

const Content = () => {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedSubTopic, setSelectedSubTopic] = useState('');
  const [contentTopic, setContentTopic] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
    setSelectedSubTopic('');
    setContentTopic('');
    setEditorState(EditorState.createEmpty());
  };

  const handleSubTopicChange = (event) => {
    setSelectedSubTopic(event.target.value);
  };

  const handleTopicChange = (event) => {
    setContentTopic(event.target.value);
  };

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleVideoChange = (event) => {
    setSelectedVideo(event.target.files[0]);
  };

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);
      return 'handled';
    }

    return 'not-handled';
  };

  const toggleInlineStyle = (style) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const uploadContent = async () => {
    try {
      const formData = new FormData();
      formData.append('subject', selectedSubject);
      formData.append('topic', contentTopic);
      formData.append('sub_topic', selectedSubTopic);
      formData.append('text', editorState.getCurrentContent().getPlainText());
      formData.append('image', selectedImage);
      if (selectedVideo) {
        formData.append('video', selectedVideo);
      }

      await axios.post('http://localhost:8000/api/content', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setFeedbackMessage('Content uploaded successfully!');

      setTimeout(() => {
        setSelectedSubject('');
        setSelectedSubTopic('');
        setContentTopic('');
        setEditorState(EditorState.createEmpty());
        setSelectedImage(null);
        setSelectedVideo(null);
        setFeedbackMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error uploading content:', error);
      setFeedbackMessage('Failed to upload content. Please try again.');
    }
  };

  return (
    <>
      <Head>
        <title>Meep Dashboard</title>
        <link style={{ radius: '100%' }} rel="icon" href="/MeeP.png" />
      </Head>
      
      <div className="container">
        <div className="content-box">
          <h1>Create Content</h1>
          {feedbackMessage && <div className="feedback">{feedbackMessage}</div>}
          <div className="input-field">
            <label htmlFor="subjectSelect">Select Subject:</label>
            <select
              id="subjectSelect"
              value={selectedSubject}
              onChange={handleSubjectChange}
            >
              <option value="">Select Subject</option>
              {Object.keys(topics).map((subject) => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>

          {selectedSubject && (
            <div>
              <div className="input-field">
                <label htmlFor="topicSelect">Select a Topic:</label>
                <select
                  id="topicSelect"
                  value={contentTopic}
                  onChange={handleTopicChange}
                >
                  <option value="">Select a Topic</option>
                  {topics[selectedSubject].map((topic) => (
                    <option key={topic} value={topic}>{topic}</option>
                  ))}
                </select>
              </div>

              <div className="input-field">
                <label htmlFor="subTopicSelect">Select a Sub Topic:</label>
                <select
                  id="subTopicSelect"
                  value={selectedSubTopic}
                  onChange={handleSubTopicChange}
                >
                  <option value="">Select a Sub Topic</option>
                  {sub_topics[selectedSubject].map((subTopic) => (
                    <option key={subTopic} value={subTopic}>{subTopic}</option>
                  ))}
                </select>
              </div>

              <div className="input-field">
                <label htmlFor="coverImage">Cover Image:</label>
                <input
                  id="coverImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>

              <div className="input-field">
                <label htmlFor="coverVideo">Optional Video:</label>
                <input
                  id="coverVideo"
                  type="file"
                  accept="video/*"
                  onChange={handleVideoChange}
                />
              </div>

              <div className="editor">
                <div className="toolbar">
                  <button onClick={() => toggleInlineStyle('BOLD')}><FaBold /></button>
                  <button onClick={() => toggleInlineStyle('ITALIC')}><FaItalic /></button>
                  <button onClick={() => toggleInlineStyle('UNDERLINE')}><FaUnderline /></button>
                </div>
                <Editor
                  editorState={editorState}
                  onChange={setEditorState}
                  handleKeyCommand={handleKeyCommand}
                />
              </div>

              <button className="upload-button" onClick={uploadContent}>
                Upload Content
              </button>
            </div>
          )}
        </div>

        <style jsx>{`
          .container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }

          .content-box {
            max-width: 600px;
            padding: 50px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
          }

          h1 {
            font-size: 2.5rem;
            color: #010100;
            font-weight: bold;
            margin-bottom: 1.5rem;
          }

          .feedback {
            font-size: 1.2rem;
            margin-bottom: 1.5rem;
            color: #059669;
          }

          .input-field {
            margin-bottom: 1.5rem;
            color: #010100;
          }

          label {
            font-size: 1.4rem;
            color: #374151;
            font-weight: bold;
            margin-bottom: 1rem;
          }

          input[type="text"],
          input[type="file"],
          select {
            border: 2px solid #6B7280;
            border-radius: 12px;
            padding: 10px;
            width: 100%;
            font-size: 1.2rem;
            background-color: #f3f4f6;
            color: #010100;
          }

          .editor {
            height: 20vh;
            border: 2px solid #6B7280;
            border-radius: 12px;
            padding: 12px;
            margin-bottom: 1.5rem;
            font-size: 16px;
          }

          .toolbar {
            margin-bottom: 10px;
          }

          .toolbar button {
            margin-right: 5px;
          }

          .upload-button {
            background: #010100;
            color: #ffffff;
            font-weight: bold;
            padding: 12px 24px;
            border-radius: 12px;
            cursor: pointer;
            font-size: 1.2rem;
          }
        `}</style>
      </div>
    </>
  );
};

export default Content;
