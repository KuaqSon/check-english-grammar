import React from "react";
export default function ResultCard({ result }) {
  const {
    message,
    rule,
    // sentence,
    replacements,
    // offset,
    // length,
    context: { text: contextText, offset: contextOffset, length: contextLength }
  } = result;

  const urls = rule.urls || [];

  return (
    <div className="card">
      <h6 className="gg-text">{message}</h6>

      {replacements.length > 0 && (
        <div className="result-block">
          <div className="result-block_title">Replacements</div>
          <div className="quote-block">
            <span className="mr-2">Sentence</span>
            <span className="hightlight-text">{`"${contextText}"`}</span>
          </div>
          <div className="quote-block">
            <div>
              <span className="mr-2">Word</span>
              <span className="hightlight-text mr-2">{`"${contextText.slice(
                contextOffset,
                contextOffset + contextLength
              )}"`}</span>
              <span>Can be by replaced below words:</span>
            </div>

            <ul className="list">
              {replacements.map((r, index) => (
                <li key={index} className="list-item">
                  {r.value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {urls.length > 0 && (
        <div className="result-block">
          <div className="result-block_title">See more at</div>
          <ul className="list">
            {urls.map((u, index) => (
              <li key={index} className="list-item">
                <a href={u.value} target="_blank">
                  {u.value}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
