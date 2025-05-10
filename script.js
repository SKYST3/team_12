// Global variables
let answers = {};
let crushName = '';

// Function to move to the next page
function nextPage(currentPageId, nextPageId) {
  const currentPage = document.getElementById(currentPageId);
  const nextPage = document.getElementById(nextPageId);
  
  // 현재 페이지의 인덱스 계산
  const pages = ['page-start', 'page-name', 'page-q1', 'page-q2', 'page-q3', 
                'page-q4', 'page-q5', 'page-q6', 'page-q7', 'page-q8', 
                'page-q9', 'page-q10', 'page-final', 'page-result'];
  const currentIndex = pages.indexOf(currentPageId);
  
  // 배경 어둡게 만들기
  const nightSky = document.getElementById('nightSky');
  
  // 지수적으로 어두워지는 계산
  // 시작: 0.1, 끝: 0.9
  // 지수 함수를 사용하여 더 급격한 변화 생성
  const baseOpacity = 0.1;
  const maxOpacity = 0.9;
  const totalPages = 10; // 질문 페이지 수
  const normalizedIndex = Math.min(currentIndex, totalPages) / totalPages;
  const opacity = baseOpacity + (maxOpacity - baseOpacity) * Math.pow(normalizedIndex, 1.5);
  
  nightSky.style.opacity = opacity;
  
  currentPage.classList.remove('active');
  nextPage.classList.add('active');

  // 이름 입력 페이지로 전환될 때 입력 효과 설정
  if (nextPageId === 'page-name') {
    setupNameInputEffect();
  }
}

// Function to save the crush name
function saveName() {
  crushName = document.getElementById('crushName').value.trim();
  if (!crushName) {
    crushName = '그 사람';
  }
  
  // Update all instances of the crush name in the questions
  const crushNameElements = document.getElementsByClassName('crush-name');
  for (let i = 0; i < crushNameElements.length; i++) {
    crushNameElements[i].textContent = crushName;
  }
}

// Function to select an option for a question
function selectOption(questionNumber, value) {
  // Clear previous selections for this question
  const options = document.querySelectorAll(`#page-q${questionNumber} .option`);
  options.forEach(option => {
    option.classList.remove('selected');
  });
  
  // Select the clicked option
  const selectedOption = document.querySelector(`#page-q${questionNumber} .option-${value}`);
  selectedOption.classList.add('selected');
  
  // Save the answer
  answers[questionNumber] = value;
}

// Validate that an option was selected before proceeding to the next question
function validateAndNext(currentQuestion, nextQuestion) {
  if (!answers[currentQuestion]) {
    alert('질문에 답변해주세요.');
    return;
  }
  
  // If next is a number, go to that question page
  if (typeof nextQuestion === 'number') {
    nextPage(`page-q${currentQuestion}`, `page-q${nextQuestion}`);
  } else {
    // If next is 'final', go to the final page
    nextPage(`page-q${currentQuestion}`, `page-${nextQuestion}`);
  }
}

// Local calculation function for fallback
function calculateLocalResult(finalMessage) {
  // Weight the questions differently
  const weights = {
    1: 0.5,  // Personal desire
    2: 2.0,  // Direct interest
    3: 1.5,  // Communication frequency
    4: 2.0,  // Spending time
    5: 2.0,  // Special attention
    6: 1.5,  // Response to conversation
    7: 1.0,  // Others' opinions
    8: 1.5,  // Jealousy signals
    9: 1.0,  // Knowing interests
    10: 1.0  // Shared values
  };
  
  // Calculate weighted score and specific factors
  let weightedScore = 0;
  let totalWeight = 0;
  let interestSignals = 0;
  let relationshipStrength = 0;
  let mutualityScore = 0;
  
  for (let i = 1; i <= 10; i++) {
    weightedScore += answers[i] * weights[i];
    totalWeight += weights[i];
    
    // Calculate specific factors
    if ([2, 5, 8].includes(i)) { // Interest signals
      interestSignals += answers[i];
    }
    
    if ([3, 4, 9].includes(i)) { // Relationship strength
      relationshipStrength += answers[i];
    }
    
    if ([6, 7, 10].includes(i)) { // Mutuality
      mutualityScore += answers[i];
    }
  }
  
  // Calculate base percentage
  let basePercentage = Math.round((weightedScore / (5 * totalWeight)) * 100);
  
  // Adjust based on specific factors
  let adjustments = 0;
  
  // Personal desire is important - boost if high, reduce if low
  if (answers[1] >= 4) adjustments += 5;
  if (answers[1] <= 2) adjustments -= 10;
  
  // Direct interest is very important
  if (interestSignals / 3 >= 4) adjustments += 10;
  if (interestSignals / 3 <= 2) adjustments -= 15;
  
  // Good relationship is necessary
  if (relationshipStrength / 3 >= 4) adjustments += 5;
  if (relationshipStrength / 3 <= 2) adjustments -= 10;
  
  // Mutual connection matters
  if (mutualityScore / 3 >= 4) adjustments += 5;
  if (mutualityScore / 3 <= 2) adjustments -= 5;
  
  // Text analysis of final message for additional context
  if (finalMessage) {
    const positiveKeywords = ['좋아해요', '웃어요', '관심', '연락', '자주', '친밀', '특별', '데이트', '선물'];
    const negativeKeywords = ['거절', '무관심', '바쁘', '안 봐요', '모르', '친구', '짝사랑', '불편'];
    
    let positiveCount = 0;
    let negativeCount = 0;
    
    positiveKeywords.forEach(keyword => {
      if (finalMessage.includes(keyword)) positiveCount++;
    });
    
    negativeKeywords.forEach(keyword => {
      if (finalMessage.includes(keyword)) negativeCount++;
    });
    
    adjustments += positiveCount * 2 - negativeCount * 3;
  }
  
  // Apply adjustments and ensure within bounds
  let finalPercentage = Math.max(0, Math.min(100, basePercentage + adjustments));
  
  // Generate advice based on score
  let advice = generateAdvice(finalPercentage, interestSignals, relationshipStrength, mutualityScore);
  
  return { percentage: finalPercentage, advice: advice };
}

// Generates personalized advice based on scores
function generateAdvice(percentage, interestSignals, relationshipStrength, mutualityScore) {
  let advice = '';
  const avgInterestSignal = interestSignals / 3;
  const avgRelationship = relationshipStrength / 3;
  const avgMutuality = mutualityScore / 3;
  
  if (percentage < 30) {
    advice = `${crushName}님과의 관계를 더 발전시키는 것이 고백 전에 필요해 보입니다. `;
    
    if (avgInterestSignal < 3) {
      advice += `현재로서는 상대방의 관심 신호가 충분히 보이지 않습니다. `;
    }
    
    if (avgRelationship < 3) {
      advice += `서로 더 많은 시간을 보내며 친밀도를 높여보세요. `;
    }
    
    advice += `천천히 친분을 쌓아가는 것이 좋겠습니다.`;
  } else if (percentage < 60) {
    advice = `가능성이 있지만 확신을 갖기에는 아직 이릅니다. `;
    
    if (avgInterestSignal >= 3) {
      advice += `관심을 보이는 긍정적인 신호가 있지만, `;
    }
    
    if (avgRelationship < 4) {
      advice += `${crushName}님과 더 많은 개인적인 시간을 보내보세요. `;
    }
    
    if (avgMutuality < 3) {
      advice += `서로의 가치관과 생각을 더 알아가는 시간이 필요합니다. `;
    }
    
    advice += `조금 더 시간을 두고 관계를 발전시켜 보세요.`;
  } else if (percentage < 80) {
    advice = `좋은 신호들이 많이 보입니다! `;
    
    if (avgInterestSignal >= 4) {
      advice += `${crushName}님이 당신에게 특별한 관심을 보이고 있어요. `;
    }
    
    if (avgRelationship >= 4) {
      advice += `이미 충분한 친밀감이 형성되어 있습니다. `;
    }
    
    advice += `적절한 타이밍과 편안한 분위기에서 솔직한 마음을 전해보세요.`;
  } else {
    advice = `매우 긍정적인 신호들이 많습니다! `;
    
    if (avgInterestSignal >= 4 && avgRelationship >= 4) {
      advice += `${crushName}님도 당신에게 특별한 감정을 가지고 있을 가능성이 큽니다. `;
    }
    
    if (avgMutuality >= 4) {
      advice += `서로에 대한 이해와 공감대가 잘 형성되어 있어요. `;
    }
    
    advice += `자신감을 가지고 진심을 전할 적절한 순간을 선택해보세요!`;
  }
  
  return advice;
}

// Submit answers and process with Gemini API
async function submitToGemini() {
  // Check if all questions have been answered
  const questionCount = 10;
  for (let i = 1; i <= questionCount; i++) {
    if (!answers[i]) {
      alert(`${i}번 질문에 답변하지 않았습니다.`);
      return;
    }
  }
  
  // Get the additional message
  const finalMessage = document.getElementById('finalMessage').value.trim();
  
  // Show loading state
  document.getElementById('resultPercentage').textContent = '계산 중...';
  document.getElementById('resultMessage').textContent = '';
  document.getElementById('loadingIndicator').style.display = 'block';
  nextPage('page-final', 'page-result');
  
  // Calculate local result for fallback
  const localResult = calculateLocalResult(finalMessage);
  
  // Prepare prompt for Gemini API
  const prompt = `
당신은 연애 심리 상담사이자 감정 분석 전문가입니다. 10개의 질문과 그에 대한 답변을 분석하여 사용자가 마음에 둔 사람에게 고백할 성공 확률을 예측해야 합니다.

사용자가 마음에 둔 사람: ${crushName}

다음은 사용자가 1점(전혀 아니다)부터 5점(매우 그렇다)까지 점수를 매긴 질문들입니다:

1. 나는 이 도전을 진짜 하고싶다. (점수: ${answers[1]})
2. ${crushName}님은 나에게 관심이 있는 것 같다. (점수: ${answers[2]})
3. 우리는 자주 연락하고 대화한다. (점수: ${answers[3]})
4. ${crushName}님은 나와 개인적인 시간을 보내려고 한다. (점수: ${answers[4]})
5. ${crushName}님은 나에게 특별한 관심을 보인다. (점수: ${answers[5]})
6. ${crushName}님은 내 이야기에 적극적으로 반응한다. (점수: ${answers[6]})
7. 다른 사람들도 우리가 잘 어울린다고 말한다. (점수: ${answers[7]})
8. ${crushName}님은 내가 다른 사람과 이야기할 때 관심을 보인다. (점수: ${answers[8]})
9. 우리는 서로의 취미나 관심사에 대해 잘 알고 있다. (점수: ${answers[9]})
10. ${crushName}님과 나는 미래에 대한 비슷한 가치관을 가지고 있다. (점수: ${answers[10]})

${finalMessage ? `추가 정보: ${finalMessage}` : ''}

이 정보를 바탕으로 다음을 제공해주세요:
1. 고백 성공 확률 (0부터 100까지)
2. 짧은 조언 (100자 이내)

출력 형식:
확률: [숫자]%
조언: [짧은 조언]
`;

  try {
    // Check if running locally and automatically use local calculation
    const isLocalFile = window.location.protocol === 'file:';
    if (isLocalFile) {
      console.log("Running from local file, using local calculation");
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Ensure percentage is properly formatted with %
      const formattedPercentage = localResult.percentage.toString().includes('%') 
        ? localResult.percentage 
        : `${localResult.percentage}%`;
      
      document.getElementById('resultPercentage').textContent = formattedPercentage;
      document.getElementById('resultMessage').textContent = localResult.advice;
      document.getElementById('loadingIndicator').style.display = 'none';
      return;
    }
    
    // Call Gemini API
    const apiKey = "AIzaSyDN89mx237e7fTS7oFGI7WvBsCmD15Ih14";
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ 
            role: "user", 
            parts: [{ text: prompt }] 
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024
          }
        })
      }
    );

    // Check if the response is ok
    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      throw new Error(`API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    console.log("API Response:", data);
    
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error("No candidates in response");
    }
    
    const text = data.candidates[0]?.content?.parts?.[0]?.text || '분석을 가져올 수 없습니다.';
    
    // Parse the result - more flexible pattern matching
    let percentage = localResult.percentage;
    let advice = localResult.advice;
    
    // Try different patterns for the percentage
    const percentagePatterns = [
      /확률:\s*(\d+)%/,
      /확률[은는]?\s*(\d+)%/,
      /(\d+)%의\s*확률/,
      /(\d+)%/
    ];
    
    for (const pattern of percentagePatterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        percentage = parseInt(match[1], 10);
        break;
      }
    }
    
    // Ensure percentage has % symbol and is properly formatted
    let displayPercentage = percentage.toString();
    if (!displayPercentage.includes('%')) {
      displayPercentage = `${displayPercentage}%`;
    }
    
    // Try to extract advice - look for common markers or just take any text
    const advicePatterns = [
      /조언:\s*(.+)/,
      /조언[은는]?\s*(.+)/,
      /추천[은는]?\s*(.+)/
    ];
    
    for (const pattern of advicePatterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        advice = match[1].trim();
        break;
      }
    }
    
    // If no advice pattern matched, just take the whole text if it's not too long
    if (advice === localResult.advice && text.length < 500) {
      advice = text.replace(/확률:.+%/g, '').trim();
    }
    
    // Update the result page
    document.getElementById('resultPercentage').textContent = displayPercentage;
    document.getElementById('resultMessage').textContent = advice;
    document.getElementById('loadingIndicator').style.display = 'none';
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    
    // Show fallback result with error details
    const formattedPercentage = localResult.percentage.toString().includes('%') 
      ? localResult.percentage 
      : `${localResult.percentage}%`;
    
    document.getElementById('resultPercentage').textContent = formattedPercentage;
    document.getElementById('resultMessage').textContent = `${localResult.advice}`;
    document.getElementById('loadingIndicator').style.display = 'none';
  }
}

// Reset the test to start over
function resetTest() {
  // Clear all answers
  answers = {};
  crushName = '';
  
  // Reset form elements
  document.getElementById('crushName').value = '';
  document.getElementById('finalMessage').value = '';
  
  // Remove all selected options
  const selectedOptions = document.querySelectorAll('.option.selected');
  selectedOptions.forEach(option => {
    option.classList.remove('selected');
  });
  
  // Go back to start page
  const activePages = document.querySelectorAll('.page.active');
  activePages.forEach(page => {
    page.classList.remove('active');
  });
  document.getElementById('page-start').classList.add('active');
}

// 별 생성 함수
function createStars() {
  const nightSky = document.getElementById('nightSky');
  const starCount = 100;
  
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    
    // 랜덤 위치
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    
    // 랜덤 크기 (1-3px)
    const size = Math.random() * 2 + 1;
    
    star.style.left = `${x}%`;
    star.style.top = `${y}%`;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    
    // 랜덤 애니메이션 딜레이
    star.style.animationDelay = `${Math.random() * 2}s`;
    
    nightSky.appendChild(star);
  }
}

// 입력 칸에서 원 생성 함수
function createInputCircle(event) {
  const nameInput = document.querySelector('.name-input');
  if (!nameInput) return;

  const circle = document.createElement('div');
  circle.className = 'input-circle';
  
  // 입력 칸의 중앙에서 원이 시작되도록 위치 설정
  const rect = nameInput.getBoundingClientRect();
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  
  // 원의 크기 설정 (입력 칸의 1/4 크기)
  const size = Math.min(rect.width, rect.height) / 4;
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  
  // 원의 위치 설정
  circle.style.left = `${centerX - size/2}px`;
  circle.style.top = `${centerY - size/2}px`;
  
  nameInput.appendChild(circle);
  
  // 애니메이션이 끝나면 원 제거
  circle.addEventListener('animationend', () => {
    circle.remove();
  });
}

// 이름 입력 이벤트 리스너 추가
function setupNameInputEffect() {
  const nameInput = document.querySelector('.name-input');
  if (!nameInput) return;

  // 입력할 때마다 원 생성
  nameInput.addEventListener('input', () => {
    createInputCircle();
  });

  // 클릭할 때도 원 생성
  nameInput.addEventListener('click', () => {
    createInputCircle();
  });
}

// 페이지 로드 시 별들 생성
document.addEventListener('DOMContentLoaded', function() {
  createStars();
});