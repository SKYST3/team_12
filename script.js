// Global variables
let answers = {};
let crushName = '';
let allScenarios = [];
let currentDynamicQuestions = [];

// Hardcoded scenarios from finalgoback.txt, reverted to the version before extensive grammatical connectors
const hardcodedScenariosText = `
1. 일부러 안 챙겨주는 듯 챙겨주는 플러팅 은근히 설렌다.
어느 날 몸이 안 좋아 학교에서 힘들어하고 있었는데, 남사친이 장난스럽게 "야, 너 머리 왜 이래. 초췌하네"라고 말하더니, 말끝엔 "그래서 오늘은 내가 아이스크림 살게"라고 웃으며 같이 편의점에 감.
딱히 사귀는 사이도 아닌데 자연스럽게 내 상태를 살피고 챙겨주는 모습이 설렜음.
→ "무심한 듯 세심한 챙김"이 상대의 호감을 유도했다.
2. 몰래 챙겨주는 관심 표현 매우 심쿵한다.
친구들끼리 다 같이 라면을 먹고 있었는데, 남사친이 조용히 내 앞에 휴지를 꺼내 두고 "국물 묻었어"라며 아무렇지 않게 말함.
그 순간 나도 모르게 얼굴이 뜨거워짐. 아무도 눈치 못 챌 정도의 디테일한 챙김이 너무 좋았음.
→ 작은 배려도 상대가 느끼면 큰 감정으로 이어질 수 있다.
3. 물리적 접촉을 핑계 삼은 플러팅 아찔하게 설렌다.
남사친이 내 머리에 뭐가 묻었다며 손으로 머리카락을 정리해줬음.
처음엔 민망해서 움찔했지만, 그가 "왜? 불편해?" 하며 웃자 오히려 긴장이 풀림.
자연스럽게 생긴 신체 접촉이 묘하게 긴장감을 불러일으켰음.
→ 억지스럽지 않은 자연스러운 접촉은 플러팅 효과를 낼 수 있다.
4. 사소한 습관까지 기억해주는 플러팅 매우 감동이다.
내가 좋아하는 아이스크림을 잘 모를 줄 알았는데, 어느 날 남사친이 "오늘 너 피곤해 보이길래, 이거 네 최애 맞지?"라며 그걸 사다 줌.
진짜 감동이었음. 내가 한 번 지나가듯 말한 걸 기억했다는 게 믿기지 않았음.
→ 관찰력과 기억력은 '나한테만 특별함'을 느끼게 한다.
5. 장난치듯 고백하는 듯한 말 두근거린다.
수업 끝나고 같이 집 가는 길, "야 너 진짜 귀엽다~ 이럴 땐 좀 반칙이야"라고 웃으며 말함.
장난처럼 툭 던진 말이었지만, 톤이 평소와 다르게 느껴졌음.
사소한 말 한마디가 마음을 뒤흔들 수 있다는 걸 느낌.
→ "진심인 듯 아닌 듯한 톤"이 긴장감을 높인다.
6. 내 자리 옆으로 자연스레 오는 플러팅 괜히 기대된다.
항상 다른 자리에 앉던 남사친이 어느 날부터 계속 내 옆에 앉기 시작함.
처음엔 우연인가 싶었지만, 반복되니까 신경이 쓰이기 시작.
무슨 말을 걸진 않았지만 옆에 있는 것만으로도 긴장감이 생김.
→ 거리를 좁히는 행위는 무언의 호감 표시가 될 수 있다.
7. 모둠활동에서 과하게 챙겨줄 때 특별하게 느껴진다.
조별 과제에서 유독 나만 따로 자료 정리해주고, 발표 자료에 내 이름을 강조해서 넣어줌.
딱히 친하지도 않았는데 유난히 나를 배려하는 게 느껴졌음.
→ 공적인 자리에서 '차별적 배려'는 강력한 시그널이 된다.
8. 나만 웃게 만든 농담 기분이 좋아진다.
같이 웃고 떠들다 갑자기 나한테만 들릴 정도로 "너 웃을 때 진짜 예쁘다" 하고 속삭임.
웃음이 멈추고, 심장이 쿵 했던 그 순간이 아직도 기억남.
→ 그 순간의 시선과 말이 분명히 '호감'이라는 걸 느끼게 해준다.
9. 일부러 질투 유도 묘하게 신경 쓰인다.
다른 친구와 장난치고 있었더니 남사친이 평소와 다르게 말수가 줄어듦.
나중에 "아까 너랑 누구랑 그렇게 웃던데, 걔 좋아해?"라고 물음.
그 순간 이상하게 설레고, 나도 모르게 계속 그를 신경 쓰게 됨.
→ 감정적으로 흔들리게 하는 질문은 심리적 동요를 일으킨다.
10. 같이 있는 공간에서 나만 챙겨줄 때 나만 알아주는 것 같아 좋다.
같이 있던 그룹에서 음료수를 돌리는데, 내 것만 유난히 내가 좋아하는 맛으로 준비됨.
알고 보니 그가 일부러 챙겼던 것.
말로는 아무 말 안 했지만, 그런 배려가 더 설렜음.
→ 사소한 디테일이 명확한 감정 신호가 될 수 있다.
11. 상대가 장난으로 받아들인 고백 너무 속상하다.
진심을 담아 고백했는데, "ㅋㅋ 아 진짜? 개그콘테스트 나가자~"라고 반응함.
분위기를 잡으려 했지만, 끝까지 농담처럼 받아들여짐.
→ 너무 평소랑 다른 톤이면 '진심'이 가벼워 보일 수 있다.
12. 친구에게 고백하려다 단톡방에 보내버림 정말 끔찍하다.
고백 메시지를 잘못해서 단체 채팅방에 보냄.
모두가 읽은 뒤 상대가 "이거 나한테 한 말 맞아?"라고 물음.
그 순간 고백은 감정 전달이 아닌 민망함으로 변함.
→ 고백은 사적인 채널에서 '조용히' 전달되어야 한다.
13. 이벤트 고백의 부담감 솔직히 부담스럽다.
교실에 풍선과 간식 준비해 이벤트 고백을 했지만, 상대가 "이런 거 부담스러워…"
좋아한다는 감정보다 상황에 대한 압박감만 남음.
→ 상대가 감당할 수 없는 스케일은 되려 역효과를 준다.
14. 감정이 혼란스러운 타이밍 타이밍이 야속하다.
졸업식 날 장거리 연애 제안하며 고백했지만, 상대는 고민조차 없이 거절.
"그냥 좋은 친구로 남자"는 말에 기대감이 사라짐.
→ 감정이 아닌 상황에 따라 좌우되는 고백은 실패하기 쉽다.
15. 취중 고백으로 신뢰 상실 땅을 치고 후회된다.
회식 자리에서 취한 상태로 "너 좋아했어"라고 말함.
다음날 "그거 진심이야?"라는 질문에 아무 말도 못함.
→ 고백의 타이밍은 '정신이 또렷할 때'가 기본이다.
16. 사적인 편지가 공개되어버린 고백 쥐구멍에 숨고 싶다.
비밀스럽게 책상에 넣은 손편지가 친구들 사이에서 돌아다님.
글씨체 때문에 정체가 밝혀져 조롱당함.
→ 고백은 익명성보다는 '정중한 전달'이 중요하다.
17. SNS 고백 → 차단 세상 비참하다.
DM으로 감정 고백을 했지만 바로 차단당함.
상대가 불편했다는 걸 너무 늦게 깨달음.
→ 상대와 친밀도 없이 SNS로 고백하는 건 무례로 느껴질 수 있다.
18. 너무 긴장해서 고백 말도 제대로 못 함 너무 아쉽다.
직접 마주 보고 고백하려 했지만, 떨려서 말이 꼬이고 횡설수설.
상대는 어리둥절해하고 결국 대화가 끝나버림.
→ 연습 없이 준비된 말 없이 고백하면 감정 전달이 안 된다.
19. 연애 감정인지 혼자 착각한 게 민망하고 머쓱하다.
상대가 평소에 친절해서 고백했지만 "그냥 모두한테 그런 거야"라는 말에 무너짐.
내가 만든 분위기였다는 걸 뒤늦게 깨달음.
→ 자기만의 해석으로 착각하면 고백도 독이 된다.
20. 타인을 통해 전한 고백이 왜곡됨 답답하고 화가 난다.
친구에게 대신 전달 부탁했는데, 중간에서 말이 달라져 전달됨.
"쟤가 너 좋아한다더라" 식으로 간단히 전해졌고, 감정은 왜곡됨.
→ 고백은 제3자를 통하지 말고 '직접 전달'하는 것이 기본이다.
`;

async function loadScenariosFromFile() {
  try {
    const response = await fetch('images/finalgoback.txt');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} while fetching images/finalgoback.txt`);
    }
    const rawText = await response.text();
    allScenarios = parseScenarios(rawText);
  } catch (error) {
    console.error("Failed to load or parse scenarios from file:", error);
    // Fallback or error display if scenarios can't be loaded
    // For now, it will result in no questions if this fails critically.
    allScenarios = []; // Ensure it's an empty array on failure
  }
}

function parseScenarios(rawText) {
    const scenarios = [];
    if (!rawText || rawText.trim() === '') {
        console.warn("parseScenarios received empty or whitespace-only rawText.");
        return scenarios; // Return empty if rawText is empty
    }
    const lines = rawText.trim().split(/\r?\n/); // Handle both \n and \r\n

    let currentScenarioLines = [];
    let currentId = null;
    let firstLineOfCurrentScenario = "";

    for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine) continue; // Skip empty lines between scenarios

        const idMatch = trimmedLine.match(/^(\d+)\.\s*(.+)/);

        if (idMatch) { // This line starts a new scenario
            // Save the previous scenario if one was being collected
            if (currentId !== null && currentScenarioLines.length > 0) {
                const scenarioQuestionText = firstLineOfCurrentScenario.substring(firstLineOfCurrentScenario.indexOf('.') + 1).trim();
                const fullBlockText = currentScenarioLines.join('\n');
                scenarios.push({
                    id: currentId,
                    text: scenarioQuestionText,
                    fullText: fullBlockText,
                    type: currentId <= 10 ? 'good' : 'bad' 
                });
            }
            // Start new scenario
            currentId = parseInt(idMatch[1], 10);
            firstLineOfCurrentScenario = trimmedLine; // This is the "N. Title" line
            currentScenarioLines = [trimmedLine]; 
        } else if (currentId !== null) { // This line is part of the current scenario
            currentScenarioLines.push(trimmedLine);
        }
    }

    // Add the last scenario collected
    if (currentId !== null && currentScenarioLines.length > 0) {
        const scenarioQuestionText = firstLineOfCurrentScenario.substring(firstLineOfCurrentScenario.indexOf('.') + 1).trim();
        const fullBlockText = currentScenarioLines.join('\n');
        scenarios.push({
            id: currentId,
            text: scenarioQuestionText,
            fullText: fullBlockText,
            type: currentId <= 10 ? 'good' : 'bad'
        });
    }
    
    if (scenarios.length === 0 && rawText.trim() !== '') {
        console.warn("Parsing finished, but no scenarios were extracted. Check file format and parsing logic.");
    }
    return scenarios;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function selectDynamicQuestions() {
  // Assumes allScenarios has been populated by loadScenariosFromFile()
  if (allScenarios.length === 0) {
    console.warn("No scenarios loaded, dynamic questions cannot be selected.");
    // Clear any existing dynamic question display if scenarios failed to load
    for (let i = 0; i < 10; i++) {
        const questionPage = document.getElementById(`page-q${i + 1}`);
        if (questionPage) {
            const questionNumberDiv = questionPage.querySelector('.question-number');
            if (questionNumberDiv) {
                questionNumberDiv.textContent = `${i + 1}. 질문을 불러올 수 없습니다.`;
            }
        }
    }
    currentDynamicQuestions = []; // Ensure it's empty
    return; // Exit if no scenarios
  }

  const goodSigns = allScenarios.filter(s => s.type === 'good');
  const badSigns = allScenarios.filter(s => s.type === 'bad');

  shuffleArray(goodSigns);
  shuffleArray(badSigns);

  currentDynamicQuestions = [];
  for (let i = 0; i < 5; i++) {
    if (goodSigns[i]) currentDynamicQuestions.push(goodSigns[i]);
    if (badSigns[i]) currentDynamicQuestions.push(badSigns[i]);
  }
  shuffleArray(currentDynamicQuestions); // Shuffle the final 10 questions
  
  // Ensure we have exactly 10 questions, even if source lists are short (defensive)
  currentDynamicQuestions = currentDynamicQuestions.slice(0, 10);

  // Update question page titles
  for (let i = 0; i < currentDynamicQuestions.length; i++) {
    const questionPage = document.getElementById(`page-q${i + 1}`);
    if (questionPage) {
      const questionNumberDiv = questionPage.querySelector('.question-number');
      if (questionNumberDiv) {
        // Displaying the scenario title (which now includes the tail) as the question
        questionNumberDiv.textContent = `${i + 1}. ${currentDynamicQuestions[i].text}`;
      }
    }
  }
}

// Function to move to the next page
function nextPage(currentPageId, nextPageId) {
  const currentPage = document.getElementById(currentPageId);
  const nextPage = document.getElementById(nextPageId);
  
  const pages = ['page-start', 'page-name', 'page-q1', 'page-q2', 'page-q3', 
                'page-q4', 'page-q5', 'page-q6', 'page-q7', 'page-q8', 
                'page-q9', 'page-q10', 'page-final', 'page-result'];
  const currentIndex = pages.indexOf(currentPageId);
  
  const nightSky = document.getElementById('nightSky');
  const baseOpacity = 0.1;
  const maxOpacity = 0.9;
  const totalProgressPages = 12; // Start, Name, 10 Qs
  let currentProgressStep = currentIndex;

  // If transitioning from a question page, use its number for progress
  if (currentPageId.startsWith('page-q')) {
    const qNum = parseInt(currentPageId.replace('page-q', ''), 10);
    currentProgressStep = 1 + qNum; // Name page is step 1, Q1 is step 2 etc.
  } else if (currentPageId === 'page-name') {
    currentProgressStep = 1;
  } else if (currentPageId === 'page-start') {
    currentProgressStep = 0;
  }

  const normalizedIndex = Math.min(currentProgressStep, totalProgressPages) / totalProgressPages;
  const opacity = baseOpacity + (maxOpacity - baseOpacity) * Math.pow(normalizedIndex, 1.5);
  
  nightSky.style.opacity = opacity;
  
  currentPage.classList.remove('active');
  nextPage.classList.add('active');

  if (nextPageId === 'page-name') {
    setupNameInputEffect();
  }
  // If moving to the first question page, ensure dynamic questions are selected and displayed
  if (nextPageId === 'page-q1' && (currentPageId === 'page-name' || currentPageId === 'page-start')) {
     // With hardcoding, allScenarios should be populated by DOMContentLoaded.
     // We just need to ensure selectDynamicQuestions has run.
     // It's called in DOMContentLoaded, so this check might be redundant but safe.
     if(currentDynamicQuestions.length === 0 && allScenarios.length > 0) {
        selectDynamicQuestions(); 
     }
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
  
  // Save the answer (use 0-indexed for array access if needed later, but API prompt uses 1-10)
  answers[questionNumber] = value; // Keep as 1-indexed key
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

// Submit answers and process with Gemini API
async function submitToGemini() {
  // Check if all questions have been answered
  const questionCount = 10;
  for (let i = 1; i <= questionCount; i++) {
    if (answers[i] === undefined) { // Check if answer exists for dynamic questions
      alert(`${i}번 질문에 답변하지 않았습니다.`);
      return;
    }
  }
  
  const finalMessage = document.getElementById('finalMessage').value.trim();
  
  document.getElementById('resultPercentage').textContent = '계산 중...';
  document.getElementById('resultMessage').textContent = '';
  document.getElementById('loadingIndicator').style.display = 'block';
  nextPage('page-final', 'page-result');
  
  // Prepare prompt for Gemini API
  let dynamicQuestionsPromptPart = "";
  for (let i = 0; i < currentDynamicQuestions.length; i++) {
    const q = currentDynamicQuestions[i];
    dynamicQuestionsPromptPart += `${i + 1}. 시나리오: "${q.text}" (분류: ${q.type === 'good' ? '긍정적 신호' : '부정적 신호'})\n`;
    dynamicQuestionsPromptPart += `   - 위 시나리오에 대한 사용자의 개인적 적용 평가 (1-5점): ${answers[i+1]}\n\n`; // Added extra newline for readability in prompt
  }

  const prompt = `
당신은 연애 심리 상담사이자 관계 분석 전문가입니다. 사용자와 ${crushName}님 사이의 현재 관계를 평가하고, 사용자가 자신의 마음을 표현했을 때 긍정적인 관계로 발전할 가능성을 예측해주세요.

사용자가 마음에 둔 사람: ${crushName}

사용자는 다음 10가지 일반적인 상황/행동 시나리오를 읽고, 각 시나리오가 만약 자신과 ${crushName}님 사이에 발생한다면, 또는 자신이 해당 행동을 한다면 어떠할지에 대해 (1점: 전혀 그렇지 않다 ~ 5점: 매우 그렇다)로 자신의 생각/예상을 평가했습니다. 이 평가 점수는 각 시나리오에 대한 사용자의 개인적인 적용 및 반응입니다.
${dynamicQuestionsPromptPart.trim()} 
${finalMessage ? `\n사용자의 추가적인 생각/상황 설명: ${finalMessage}` : ''}

이제 다음 두 단계에 따라 '관계 발전 가능성'을 계산하고 조언을 제공해주세요:

**1단계: 초기 규칙 기반 가능성 계산**
주어진 10개 답변 점수와 각 질문의 분류(긍정적/부정적 신호)를 바탕으로 'positive_points'와 'negative_points'를 계산합니다:
- 질문이 "긍정적 신호"인 경우:
  - 답변 5점 (매우 그렇다): positive_points +5
  - 답변 4점 (그렇다): positive_points +2
  - 답변 3점 (보통이다): 양쪽에 0점
  - 답변 2점 (그렇지 않다): negative_points +2
  - 답변 1점 (전혀 그렇지 않다): negative_points +1
- 질문이 "부정적 신호"인 경우:
  - 답변 5점 (매우 그렇다): negative_points +5
  - 답변 4점 (그렇다): negative_points +2
  - 답변 3점 (보통이다): 양쪽에 0점
  - 답변 2점 (그렇지 않다): positive_points +2
  - 답변 1점 (전혀 그렇지 않다): positive_points +1

let total_points_considered = positive_points + negative_points.
If total_points_considered is 0 (모든 답변이 3점인 경우), initial_rule_based_percentage = 50%.
Else, initial_rule_based_percentage = (positive_points / total_points_considered) * 100%.
계산된 initial_rule_based_percentage를 마음속으로 기억해두세요 (사용자에게 직접 보여주지 마세요).

**2단계: 사용자 상황의 맥락적 유사도(코사인 유사도 기반)를 통한 조정**
1. 10개의 질문 답변과 사용자의 추가적인 생각/상황 설명을 종합하여 '사용자 현재 상황 맥락'으로 정의합니다.
2. 당신의 전문 지식을 바탕으로 '상호간의 강한 긍정적 관심과 높은 관계 호환성을 나타내는 이상적인 상황'을 내부적으로 설정합니다.
3. '이상적인 상황'과 '사용자 현재 상황 맥락' 간의 코사인 유사도 점수 (cosine_similarity_score, 0에서 1 사이 값)를 마음속으로 추정합니다. (이 점수를 사용자에게 직접 보여주지 마세요).
4. 이 cosine_similarity_score를 사용하여 initial_rule_based_percentage를 조정합니다. 조정값(adjustment_in_percentage_points)은 다음 공식을 사용합니다:
   adjustment_in_percentage_points = 200 * ((cosine_similarity_score - 0.5)^3)
   (이 값은 -25에서 +25 사이의 백분율 포인트가 됩니다.)
5. final_possibility_percentage = initial_rule_based_percentage + adjustment_in_percentage_points.
6. final_possibility_percentage는 0%에서 100% 사이로 제한합니다.

**요청사항:**
위 계산을 통해 도출된 최종적인 'final_possibility_percentage'와, 이 결과에 대한 당신의 분석 및 사용자를 위한 현실적이고 따뜻한 조언(150자 이내)을 아래 형식으로 제공해주세요.

출력 형식:
가능성: [final_possibility_percentage]%
조언: [분석 및 조언]
`;

  try {
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
    let percentage = 0; // Initialize with a default value
    let advice = '조언을 가져오는 데 실패했습니다.'; // Initialize with a default error message
    
    // Try different patterns for the percentage
    const percentagePatterns = [
      /가능성:\s*(\d+)%/,
      /가능성[은는]?\s*(\d+)%/,
      /(\d+)%의\s*가능성/,
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
    if (advice === '조언을 가져오는 데 실패했습니다.' && text.length < 500) {
      advice = text.replace(/가능성:.+%/g, '').trim();
    }
    
    // Update the result page
    document.getElementById('resultPercentage').textContent = displayPercentage;
    document.getElementById('resultMessage').textContent = advice;
    document.getElementById('loadingIndicator').style.display = 'none';
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    
    // Show generic error message instead of fallback
    document.getElementById('resultPercentage').textContent = '오류';
    document.getElementById('resultMessage').textContent = '결과를 가져오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
    document.getElementById('loadingIndicator').style.display = 'none';
  }
}

// Reset the test to start over
function resetTest() {
  // Clear all answers
  answers = {}; // Ensure answers are reset
  // crushName = ''; // Don't reset crushName, user might want to re-test with same person

  // Reset form elements
  // document.getElementById('crushName').value = ''; // Keep name if user wants to re-test
  document.getElementById('finalMessage').value = '';
  
  // Remove all selected options
  const selectedOptions = document.querySelectorAll('.option.selected');
  selectedOptions.forEach(option => {
    option.classList.remove('selected');
  });

  // Select new dynamic questions for the test
  selectDynamicQuestions();
  
  // Go back to start page (or first question page if name is kept)
  const activePages = document.querySelectorAll('.page.active');
  activePages.forEach(page => {
    page.classList.remove('active');
  });

  // Decide where to go back: if crushName exists, maybe to page-q1, else to page-start or page-name
  if (crushName) {
     document.getElementById('page-q1').classList.add('active');
     // Update night sky for the first question page
     const nightSky = document.getElementById('nightSky');
     const baseOpacity = 0.1;
     const maxOpacity = 0.9;
     const totalProgressPages = 12;
     const normalizedIndex = Math.min(2, totalProgressPages) / totalProgressPages; // 2 for page-q1 step
     nightSky.style.opacity = baseOpacity + (maxOpacity - baseOpacity) * Math.pow(normalizedIndex, 1.5);

  } else {
    document.getElementById('page-start').classList.add('active');
    document.getElementById('nightSky').style.opacity = 0.1; // Reset night sky for start page
  }
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

// 페이지 로드 시 별들 생성 및 초기 질문 선택
document.addEventListener('DOMContentLoaded', function() {
  createStars();
  // Parse the hardcoded scenarios directly
  allScenarios = parseScenarios(hardcodedScenariosText);
  if (allScenarios.length > 0) {
    selectDynamicQuestions(); // Then select initial set of dynamic questions
  } else {
    console.error("Failed to parse hardcoded scenarios. Questions will not be available.");
    // Optionally, display an error to the user on the page itself
    // For example, by updating a div on page-start or page-q1
    const startPageErrorDiv = document.getElementById('page-start').querySelector('.error-message-display'); // Assume such a div exists or add one
    if(startPageErrorDiv) startPageErrorDiv.textContent = "질문을 준비하는데 문제가 발생했습니다. 죄송합니다.";

    // Display error on question pages if they are ever reached
    for (let i = 0; i < 10; i++) {
        const questionPage = document.getElementById(`page-q${i + 1}`);
        if (questionPage) {
            const questionNumberDiv = questionPage.querySelector('.question-number');
            if (questionNumberDiv) {
                questionNumberDiv.textContent = `${i + 1}. 질문을 불러올 수 없습니다.`;
            }
        }
    }
  }
});