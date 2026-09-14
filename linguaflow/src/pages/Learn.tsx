/* ============================================
   Learn Page — interactive learning modules
   Vocabulary / Spelling / Grammar / Speaking / Listening
   ============================================ */
import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icons';
import { Button, DotProgress } from '../components/ui';
import { useApp } from '../context/AppContext';
import { getLessonById } from '../data/content';
import { speak, recognizeSpeech, wordSimilarity, isSpeechRecognitionSupported } from '../lib/speech';

/* ---------- Shared complete screen ---------- */
function Complete({ title, xp, onDone }: { title: string; xp: number; onDone: () => void }) {
  return (
    <div className="complete">
      <div className="complete__icon"><Icon.Check size={40} /></div>
      <h2 className="complete__title">课程完成!</h2>
      <p className="complete__subtitle">{title}</p>
      <div className="complete__xp"><Icon.Sparkles size={20} /> +{xp} 经验值</div>
      <div style={{ marginTop: 32, display: 'flex', gap: 16, justifyContent: 'center' }}>
        <Button variant="ghost" onClick={() => onDone()}>返回课程</Button>
        <Button variant="primary" onClick={onDone}>继续</Button>
      </div>
    </div>
  );
}

/* ---------- Vocabulary Module ---------- */
function VocabularyModule({ words, onComplete }: {
  words: NonNullable<ReturnType<typeof getLessonById>>['lesson']['words'];
  onComplete: () => void;
}) {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const w = words![idx];

  const playAudio = useCallback(() => { speak(w.word).catch(() => {}); }, [w.word]);

  const answer = (_gotIt: boolean) => {
    if (idx + 1 < words!.length) {
      setIdx(idx + 1);
      setFlipped(false);
    } else {
      onComplete();
    }
  };

  return (
    <>
      <div className="learn__topbar">
        <div className="learn__back" onClick={onComplete}><Icon.ArrowLeft size={18} /> 返回</div>
        <DotProgress current={idx} total={words!.length} />
        <div className="learn__streak"><Icon.Flame size={18} /> 连续</div>
      </div>
      <div className="learn__card" onClick={() => setFlipped(!flipped)} style={{ cursor: 'pointer' }}>
        {!flipped ? (
          <>
            <div className="learn__word">{w.word}</div>
            <div className="learn__phonetic">
              {w.phonetic}
              <button className="learn__audio" onClick={(e) => { e.stopPropagation(); playAudio(); }} aria-label="播放发音">
                <Icon.Play size={22} />
              </button>
            </div>
            <p className="learn__example">例句: {w.example}</p>
            <p className="learn__example-zh">{w.exampleZh}</p>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-caption)', marginTop: 8 }}>点击卡片查看释义</p>
          </>
        ) : (
          <>
            <div className="learn__meaning">{w.meaning}</div>
            <p className="learn__example">{w.example}</p>
            <p className="learn__example-zh">{w.exampleZh}</p>
          </>
        )}
      </div>
      <div className="learn__actions">
        <Button variant="success" size="lg" onClick={() => answer(false)} icon="Book">还需巩固</Button>
        <Button variant="primary" size="lg" onClick={() => answer(true)} icon="Check">我认识</Button>
      </div>
    </>
  );
}

/* ---------- Spelling Module ---------- */
function SpellingModule({ words, onComplete }: {
  words: NonNullable<ReturnType<typeof getLessonById>>['lesson']['words'];
  onComplete: () => void;
}) {
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const w = words![idx];

  const playAudio = useCallback(() => { speak(w.word).catch(() => {}); }, [w.word]);

  useEffect(() => { playAudio(); }, [playAudio]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim().toLowerCase() === w.word.toLowerCase()) {
      setStatus('correct');
      setTimeout(() => {
        if (idx + 1 < words!.length) { setIdx(idx + 1); setInput(''); setStatus('idle'); }
        else onComplete();
      }, 800);
    } else {
      setStatus('wrong');
      setTimeout(() => setStatus('idle'), 1200);
    }
  };

  return (
    <>
      <div className="learn__topbar">
        <div className="learn__back" onClick={onComplete}><Icon.ArrowLeft size={18} /> 返回</div>
        <DotProgress current={idx} total={words!.length} />
        <div className="learn__streak"><Icon.Flame size={18} /> 连续</div>
      </div>
      <div className="learn__card">
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 16 }}>请拼写你听到的单词</p>
        <button className="learn__audio" onClick={playAudio} aria-label="播放单词音频">
          <Icon.Play size={26} />
        </button>
        <p className="learn__meaning" style={{ marginTop: 16 }}>{w.meaning}</p>
        <p className="learn__example-zh">{w.exampleZh}</p>
      </div>
      <form onSubmit={submit} style={{ maxWidth: 400, margin: '0 auto', marginTop: 32 }}>
        <input
          className={`learn__input${status === 'correct' ? ' learn__input--correct' : ''}${status === 'wrong' ? ' learn__input--wrong' : ''}`}
          type="text"
          placeholder="输入单词..."
          value={input}
          onChange={e => setInput(e.target.value)}
          autoFocus
          autoComplete="off"
        />
        <div style={{ marginTop: 16, textAlign: 'center' }}>
          <Button type="submit" variant="primary" size="md" disabled={!input.trim()}>提交</Button>
        </div>
        {status === 'correct' && <p style={{ textAlign: 'center', marginTop: 12, color: 'var(--color-success)', fontWeight: 600, fontSize: 'var(--text-caption)' }}><Icon.Check size={16} /> 正确!</p>}
        {status === 'wrong' && <p style={{ textAlign: 'center', marginTop: 12, color: '#ef4444', fontWeight: 600, fontSize: 'var(--text-caption)' }}>再试一次 — 正确答案: {w.word}</p>}
      </form>
    </>
  );
}

/* ---------- Grammar Module ---------- */
function GrammarModule({ grammar, onComplete, onAnswered }: {
  grammar: NonNullable<ReturnType<typeof getLessonById>>['lesson']['grammar'];
  onComplete: () => void;
  onAnswered: (correct: boolean) => void;
}) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExpl, setShowExpl] = useState(false);
  const q = grammar![idx];
  const letters = ['A', 'B', 'C', 'D'];

  const choose = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    setShowExpl(true);
    onAnswered(i === q.answer);
  };

  const next = () => {
    if (idx + 1 < grammar!.length) {
      setIdx(idx + 1); setSelected(null); setShowExpl(false);
    } else onComplete();
  };

  return (
    <>
      <div className="learn__topbar">
        <div className="learn__back" onClick={onComplete}><Icon.ArrowLeft size={18} /> 返回</div>
        <DotProgress current={idx} total={grammar!.length} />
        <div className="learn__streak"><Icon.Flame size={18} /> 连续</div>
      </div>
      <div className="learn__card" style={{ textAlign: 'left', alignItems: 'stretch' }}>
        <div style={{ padding: 'var(--space-8) var(--space-8)', width: '100%' }}>
          <h3 className="grammar__question">{idx + 1}. {q.question}</h3>
          <div className="grammar__options">
            {q.options.map((opt, i) => {
              const isCorrect = i === q.answer;
              const isSelected = selected === i;
              const cls = selected !== null && isCorrect ? 'grammar__option--correct'
                : isSelected ? 'grammar__option--wrong'
                : selected !== null ? 'grammar__option--disabled' : '';
              return (
                <button key={i} className={`grammar__option${cls ? ' ' + cls : ''}`} onClick={() => choose(i)} disabled={selected !== null}>
                  <span className="grammar__letter">{letters[i]}</span>
                  {opt}
                  {selected !== null && isCorrect && <Icon.Check size={20} style={{ marginLeft: 'auto' }} />}
                  {isSelected && !isCorrect && <Icon.X size={20} style={{ marginLeft: 'auto' }} />}
                </button>
              );
            })}
          </div>
          {showExpl && (
            <div className="grammar__explanation">
              <strong style={{ color: selected === q.answer ? 'var(--color-success)' : '#ef4444' }}>
                {selected === q.answer ? '✓ 正确! ' : '✗ 还差一点。 '}
              </strong>
              {q.explanation}
            </div>
          )}
        </div>
      </div>
      {showExpl && (
        <div className="learn__actions">
          <Button variant="primary" size="md" onClick={next} icon="ArrowRight">
            {idx + 1 < grammar!.length ? '下一题' : '完成'}
          </Button>
        </div>
      )}
    </>
  );
}

/* ---------- Speaking Module ---------- */
function SpeakingModule({ speaking, onComplete, onCompleted }: {
  speaking: NonNullable<ReturnType<typeof getLessonById>>['lesson']['speaking'];
  onComplete: () => void;
  onCompleted: () => void;
}) {
  const [idx, setIdx] = useState(0);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [score, setScore] = useState<number | null>(null);
  const w = speaking![idx];
  const supported = isSpeechRecognitionSupported();

  const playTarget = useCallback(() => { speak(w.word).catch(() => {}); }, [w.word]);

  const startListen = async () => {
    setListening(true); setTranscript(''); setScore(null);
    try {
      const result = await recognizeSpeech();
      setTranscript(result.transcript);
      const sim = wordSimilarity(result.transcript, w.word);
      setScore(sim);
      onCompleted();
    } catch {
      setTranscript('(识别失败,请重试)');
      setScore(0);
    } finally {
      setListening(false);
    }
  };

  const next = () => {
    if (idx + 1 < speaking!.length) {
      setIdx(idx + 1); setTranscript(''); setScore(null);
    } else onComplete();
  };

  return (
    <>
      <div className="learn__topbar">
        <div className="learn__back" onClick={onComplete}><Icon.ArrowLeft size={18} /> 返回</div>
        <DotProgress current={idx} total={speaking!.length} />
        <div className="learn__streak"><Icon.Flame size={18} /> 连续</div>
      </div>
      <div className="learn__card">
        <p style={{ color: 'var(--color-text-secondary)' }}>请大声朗读这个单词:</p>
        <div className="learn__word">{w.word}</div>
        <div className="learn__phonetic">{w.phonetic}</div>
        <button className="learn__audio" onClick={playTarget} aria-label="播放示范发音">
          <Icon.Play size={22} />
        </button>
        <p className="learn__example">{w.example}</p>
        {!supported && (
          <p style={{ color: '#ef4444', fontSize: 'var(--text-caption)', marginTop: 8 }}>你的浏览器不支持语音识别,请使用 Chrome 浏览器。</p>
        )}
      </div>
      <div style={{ textAlign: 'center', marginTop: 32 }}>
        <button
          className={`speaking__mic${listening ? ' speaking__mic--listening' : ''}`}
          onClick={startListen}
          disabled={listening || !supported}
          aria-label="开始说话"
        >
          <Icon.Mic size={36} />
        </button>
        <p className="speaking__status">{listening ? '正在聆听...请开始说话' : '点击麦克风并朗读单词'}</p>
        {transcript && (
          <div className="speaking__result">
            <p className="speaking__transcript">"{transcript}"</p>
            {score !== null && (
              <p className="speaking__score" style={{ color: score >= 0.7 ? 'var(--color-success)' : '#ef4444' }}>
                {score >= 0.7 ? '✓ 发音很棒!' : '再试一次,尽量接近标准发音'}
              </p>
            )}
          </div>
        )}
        {transcript && (
          <div className="learn__actions">
            <Button variant="primary" size="md" onClick={next} icon="ArrowRight">
              {idx + 1 < speaking!.length ? '下一个单词' : '完成'}
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

/* ---------- Listening Module ---------- */
function ListeningModule({ listening, onComplete, onAnswered }: {
  listening: NonNullable<ReturnType<typeof getLessonById>>['lesson']['listening'];
  onComplete: () => void;
  onAnswered: (correct: boolean) => void;
}) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [played, setPlayed] = useState(false);
  const item = listening![idx];
  const letters = ['A', 'B', 'C', 'D'];

  const playAudio = useCallback(() => {
    speak(item.transcript, { rate: 0.85 }).catch(() => {});
    setPlayed(true);
  }, [item.transcript]);

  useEffect(() => { playAudio(); }, [playAudio]);

  const choose = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    onAnswered(i === item.answer);
  };

  const next = () => {
    if (idx + 1 < listening!.length) {
      setIdx(idx + 1); setSelected(null); setPlayed(false);
    } else onComplete();
  };

  // Visual bars for audio
  const bars = Array.from({ length: 24 }, (_, i) => i);

  return (
    <>
      <div className="learn__topbar">
        <div className="learn__back" onClick={onComplete}><Icon.ArrowLeft size={18} /> 返回</div>
        <DotProgress current={idx} total={listening!.length} />
        <div className="learn__streak"><Icon.Flame size={18} /> 连续</div>
      </div>
      <div className="learn__card" style={{ textAlign: 'left' }}>
        <div style={{ width: '100%' }}>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: 16, textAlign: 'center' }}>请听音频并回答问题:</p>
          <div className="listening__player">
            <button className="listening__play" onClick={playAudio} aria-label="播放音频"><Icon.Play size={28} /></button>
            <div className="listening__waves">
              {bars.map(i => (
                <div key={i} className={`listening__bar${played ? ' listening__bar--active' : ''}`} style={{
                  height: `${20 + Math.sin(i) * 20 + 20}px`,
                  animationDelay: `${i * 0.05}s`,
                  transitionDelay: `${i * 0.03}s`,
                }} />
              ))}
            </div>
          </div>
          {played && (
            <div className="listening__transcript">
              {item.transcript}
              <div className="listening__translation">{item.translation}</div>
            </div>
          )}
          <h3 className="grammar__question" style={{ marginTop: 24, textAlign: 'center' }}>{item.question}</h3>
          <div className="grammar__options">
            {item.options.map((opt, i) => {
              const isCorrect = i === item.answer;
              const cls = selected !== null && isCorrect ? 'grammar__option--correct'
                : selected === i ? 'grammar__option--wrong'
                : selected !== null ? 'grammar__option--disabled' : '';
              return (
                <button key={i} className={`grammar__option${cls ? ' ' + cls : ''}`} onClick={() => choose(i)} disabled={selected !== null}>
                  <span className="grammar__letter">{letters[i]}</span>
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      {selected !== null && (
        <div className="learn__actions">
          <Button variant="primary" size="md" onClick={next} icon="ArrowRight">
            {idx + 1 < listening!.length ? '下一题' : '完成'}
          </Button>
        </div>
      )}
    </>
  );
}

/* ---------- Main Learn Page ---------- */
export function LearnPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { finishLesson, recordGrammar, recordSpeaking } = useApp();
  const [done, setDone] = useState(false);

  const data = id ? getLessonById(id) : null;

  if (!data) {
    return (
      <div className="learn">
        <div className="empty">
          <div className="empty__icon"><Icon.Book size={48} /></div>
          <p>课程未找到</p>
          <Button variant="primary" onClick={() => navigate('/courses')} style={{ marginTop: 16 }}>返回课程列表</Button>
        </div>
      </div>
    );
  }

  const { lesson, course } = data;

  if (done) {
    return (
      <div className="learn">
        <Complete
          title={lesson.title}
          xp={lesson.xp}
          onDone={() => { finishLesson(lesson.id, lesson.xp, lesson.words?.map(w => w.word)); navigate('/dashboard'); }}
        />
      </div>
    );
  }

  const onComplete = () => setDone(true);

  return (
    <div className="learn">
      <div style={{ marginBottom: 16, color: 'var(--color-text-secondary)', fontSize: 'var(--text-caption)' }}>
        {course.title} · {course.level}
      </div>
      <h2 style={{ fontSize: 'var(--text-h2)', fontWeight: 700, color: 'var(--color-text)', marginBottom: 8 }}>{lesson.title}</h2>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: 32 }}>{lesson.description}</p>

      {lesson.type === 'vocabulary' && lesson.words && (
        <VocabularyModule words={lesson.words} onComplete={onComplete} />
      )}
      {lesson.type === 'spelling' && lesson.words && (
        <SpellingModule words={lesson.words} onComplete={onComplete} />
      )}
      {lesson.type === 'grammar' && lesson.grammar && (
        <GrammarModule grammar={lesson.grammar} onComplete={onComplete} onAnswered={(c) => { if (c) recordGrammar(1); }} />
      )}
      {lesson.type === 'speaking' && lesson.speaking && (
        <SpeakingModule speaking={lesson.speaking} onComplete={onComplete} onCompleted={() => recordSpeaking(1)} />
      )}
      {lesson.type === 'listening' && lesson.listening && (
        <ListeningModule listening={lesson.listening} onComplete={onComplete} onAnswered={(c) => { if (c) recordGrammar(1); }} />
      )}
    </div>
  );
}
