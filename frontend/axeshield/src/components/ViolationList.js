import React from "react";

const ViolationList = ({ violations }) => {
    return (
        <div style={{ marginTop: "2rem" }}>
            <h2>🚨 Violations Found: {violations.length}</h2>
            {violations.map((v, index) => (
                <div key={index} style={{ border: "1px solid #ccc", margin: "1rem 0", padding: "1rem", borderRadius: "5px" }}>
                    <h3>{v.id} ({v.impact})</h3>
                    <p><strong>Description:</strong> {v.description}</p>
                    <p><strong>Help:</strong> <a href={v.helpUrl} target="_blank" rel="noreferrer">{v.helpUrl}</a></p>
                    <p><strong>Elements Affected:</strong></p>
                    <ul>
                        {v.nodes.map((node, i) => (
                            <li key={i}><code>{node.html}</code></li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default ViolationList;
