export const mockAddCourseRequestBody = {

  "description": "Learn the basics of JavaScript programming language.",
  "instructor": "609c1491c7f3c66a1825e9d0", // ObjectId of the instructor
  "content": {
  "lectureNotes": [
    {
      "title": "Introduction to Variables",
      "content": "Variables are used to store data values."
    },
    {
      "title": "Data Types",
      "content": "JavaScript supports several data types including string, number, boolean, etc."
    }
  ],
    "videos": [
    {
      "title": "Variables in JavaScript",
      "url": "https://example.com/variables"
    },
    {
      "title": "Data Types Explained",
      "url": "https://example.com/data-types"
    }
  ],
    "quizzes": [
    {
      "title": "Variables Quiz",
      "questions": [
        {
          "question": "What is the keyword used to declare a variable in JavaScript?",
          "options": [
            "var",
            "let",
            "const"
          ],
          "correctAnswer": "let"
        },
        {
          "question": "What will be the output of typeof 'hello'?",
          "options": [
            "string",
            "number",
            "boolean"
          ],
          "correctAnswer": "string"
        }
      ]
    },
    {
      "title": "Data Types Quiz",
      "questions": [
        {
          "question": "What is the data type of true?",
          "options": [
            "string",
            "number",
            "boolean"
          ],
          "correctAnswer": "boolean"
        },
        {
          "question": "What is the result of typeof 42?",
          "options": [
            "string",
            "number",
            "boolean"
          ],
          "correctAnswer": "number"
        }
      ]
    }
  ]
},
  "enrollmentDetails": {
  "capacity": 50,
    "enrolledStudents": []
},
  "paymentDetails": {
  "price": 49.99,
    "paymentGateway": "Stripe"
},
  "status": "pending"

};
