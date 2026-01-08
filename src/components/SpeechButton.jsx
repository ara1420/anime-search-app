export default function SpeechButton({ text }) {
  const speak = () => {
    if (!("speechSynthesis" in window)) {
      alert("このブラウザは音声読み上げに対応していません。");
      return;
    }

    const uttr = new SpeechSynthesisUtterance(text);
    uttr.lang = "ja-JP";
    window.speechSynthesis.speak(uttr);
  };

  return <button onClick={speak}>読み上げ</button>;
}
