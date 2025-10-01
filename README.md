# 🎯 QuizBuzz

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Now-667eea?style=for-the-badge&logo=netlify&logoColor=white)](https://quiz-buzzed.netlify.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Open Trivia DB](https://img.shields.io/badge/API-Open_Trivia_DB-9cf?style=flat&logo=api&logoColor=black)](https://opentdb.com/)

> An interactive, modern quiz application that challenges your knowledge across multiple categories with varying difficulty levels. Built with vanilla JavaScript and powered by the Open Trivia Database API.

## 🌟 Live Demo

🚀 **[Try QuizBuzz Live!](https://quiz-buzzed.netlify.app/)** - Experience the full quiz application in your browser.

## 📸 Screenshots

| Start Screen | Quiz Interface | Results Screen |
|--------------|----------------|----------------|
| ![Start](https://i.postimg.cc/9Ms99W7p/Screenshot-2025-10-01-090829.png) | ![Quiz](https://i.postimg.cc/YqR1nwcP/Screenshot-2025-10-01-092729.png) | ![Results](https://i.postimg.cc/3rCpNHwr/Screenshot-2025-10-01-092759.png) |

## ✨ Features

### 🎮 Interactive Gameplay
| Feature | Description |
|---------|-------------|
| 📝 **10 Questions per Quiz** | Each quiz consists of 10 carefully selected questions |
| 🔘 **Multiple Choice Format** | 4 options per question with instant feedback |
| ⏱️ **Real-time Timer** | 30-second countdown per question with visual warnings |
| 📊 **Progress Tracking** | Visual progress bar showing quiz completion |

### 📚 Diverse Categories
Choose from 10 exciting categories:

| Category | Icon | Description |
|----------|------|-------------|
| 🌍 General Knowledge | 🌍 | Broad range of topics |
| 📖 Books | 📖 | Literature and authors |
| 💻 Computers | 💻 | Technology and programming |
| ➗ Mathematics | ➗ | Numbers and calculations |
| 🗺️ Geography | 🗺️ | Countries and landmarks |
| 🏛️ Mythology | 🏛️ | Gods and legends |
| 📜 History | 📜 | Past events and figures |
| 🏅 Sports | 🏅 | Athletics and competitions |
| ⚖️ Politics | ⚖️ | Government and leaders |

### 🎯 Difficulty Levels
| Level | Description | Target Audience |
|-------|-------------|-----------------|
| 🟢 **Easy** | Basic questions | Beginners |
| 🟡 **Medium** | Moderate challenge | Intermediate users |
| 🔴 **Hard** | Advanced questions | Experts |

### 📊 Comprehensive Results
| Metric | Description |
|--------|-------------|
| 📈 **Score Display** | Final score with percentage |
| 📊 **Detailed Statistics** | Correct, incorrect, and accuracy metrics |
| 💬 **Performance Feedback** | Personalized messages based on performance |
| 🔄 **Retry Options** | Restart the same quiz or choose a new category |

### 🎨 Modern UI/UX
| Feature | Description |
|---------|-------------|
| 🌙 **Dark Theme** | Sleek, eye-friendly dark interface |
| 📱 **Responsive Design** | Optimized for desktop and mobile devices |
| ✨ **Smooth Animations** | Fluid transitions and hover effects |
| 🎨 **Gradient Accents** | Beautiful purple-blue gradient theme |
| ⏳ **Loading States** | Elegant loading spinner during question fetch |

## 🚀 Quick Start

### Prerequisites
- 🌐 A modern web browser (Chrome, Firefox, Safari, Edge)
- 📶 Internet connection for fetching questions

### Installation
1. **Clone the repository** (if applicable) or download the files
2. **Navigate to the project directory**
3. **Open `index.html` in your web browser**

That's it! No additional setup required.

### 🎯 Quick Play
```bash
# Simply open index.html in your browser
start index.html  # Windows
open index.html   # macOS
xdg-open index.html  # Linux
```

## 📁 Project Structure

```
QuizBuzz/
├── 📄 index.html          # Main HTML structure
├── 🎨 style.css           # Styling and animations
├── ⚙️ script.js           # Game logic and API integration
├── 🚫 .gitignore          # Git ignore rules
└── 📖 README.md           # Project documentation
```

## 💻 Code Example

Here's a glimpse of the quiz initialization:

```javascript
// Fetch questions from Open Trivia Database
async function fetchQuestions() {
    const response = await fetch(
        `https://opentdb.com/api.php?amount=10&category=${selectedCategory}&difficulty=${selectedDiffLevel}&type=multiple`
    );
    const data = await response.json();
    questions = data.results.map(q => ({
        question: decodeHTML(q.question),
        correct: decodeHTML(q.correct_answer),
        options: shuffleArray([...q.incorrect_answers.map(a => decodeHTML(a)), decodeHTML(q.correct_answer)]),
        category: decodeHTML(q.category)
    }));
}
```

## 🎮 How to Play

1. **Select Category**: Click on your preferred knowledge category
2. **Choose Difficulty**: Pick Easy, Medium, or Hard
3. **Start Quiz**: Click "Start Quiz" to begin
4. **Answer Questions**: Select your answer within 30 seconds
5. **View Results**: See your score and statistics at the end
6. **Play Again**: Retry the same quiz or try a different category

## 🛠️ Technologies Used

- **Frontend**:
  - HTML5 - Semantic markup and structure
  - CSS3 - Modern styling with gradients and animations
  - JavaScript (ES6+) - Interactive functionality

- **API**:
  - [Open Trivia Database](https://opentdb.com/) - Free trivia questions API

- **Tools**:
  - Google Fonts - Typography
  - Boxicons - Icon library (if used)

## 📱 Responsive Design

QuizBuzz is fully responsive and works seamlessly across:
- 📺 Desktop computers (1200px+)
- 💻 Laptops and tablets (768px+)
- 📱 Mobile phones (320px+)

## 🎨 Customization

### Themes
The app features a dark theme with purple-blue gradients. To customize:
- Modify color variables in `style.css`
- Update gradient definitions for different color schemes

### Questions
- Questions are fetched from Open Trivia Database
- API parameters can be adjusted in `script.js` for different question types

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow existing code style and structure
- Test on multiple browsers and devices
- Ensure responsive design is maintained
- Add comments for complex logic

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Open Trivia Database** for providing the question API
- **Google Fonts** for beautiful typography
- **Unsplash** for inspiration in design

## 🔮 Future Roadmap

- [ ] 🏆 Leaderboards and user profiles
- [ ] 🎵 Sound effects and background music
- [ ] 🌍 Multi-language support
- [ ] 📱 Progressive Web App (PWA) features
- [ ] 📈 Advanced statistics and analytics
- [ ] 🤝 Multiplayer mode
- [ ] 🎨 Theme customization options

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/username/quizbuzz?style=social)
![GitHub forks](https://img.shields.io/github/forks/username/quizbuzz?style=social)
![GitHub issues](https://img.shields.io/github/issues/username/quizbuzz)
![GitHub PRs](https://img.shields.io/github/issues-pr/username/quizbuzz)

## 🤝 Contributors

<a href="https://github.com/username/quizbuzz/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=username/quizbuzz" />
</a>

## 📞 Support

If you have any questions, suggestions, or issues:
- 🐛 [Open an issue](https://github.com/username/quizbuzz/issues) on GitHub
- 💬 Check the browser console for error messages
- 🌐 Ensure you have a stable internet connection for question loading

---

<div align="center">

**Made with ❤️ and lots of ☕**

*Challenge yourself, learn something new, and have fun with QuizBuzz!*

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-netlify-id/deploy-status)](https://app.netlify.com/sites/quiz-buzzed/deploys)

</div>