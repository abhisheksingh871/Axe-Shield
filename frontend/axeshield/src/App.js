import React, { useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';
import ClipLoader from 'react-spinners/ClipLoader';
import './App.css';

const App = () => {
    const [url, setUrl] = useState('');
    const [violations, setViolations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleScan = async () => {
        setLoading(true);
        setError('');
        setViolations([]);
        try {
            const response = await axios.post('http://localhost:8080/api/scan', { url });
            setViolations(response.data.violations || []);
        } catch (err) {
            setError('Scan failed. Please try again.');
            console.error('Scan failed:', err);
        } finally {
            setLoading(false);
        }
    };

    const exportCSV = () => {
        const headers = ['Impact', 'Description', 'Help URL'];
        const rows = violations.map(v => [v.impact, v.description, v.help]);
        const csvContent = [headers, ...rows].map(e => e.join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'violations.csv');
    };

    const exportPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(12);
        doc.text('Accessibility Violations Report', 10, 10);
        let y = 20;
        violations.forEach((v, index) => {
            doc.text(`${index + 1}. ${v.id} (${v.impact})`, 10, y);
            y += 6;
            doc.text(`   ${v.description}`, 10, y);
            y += 6;
            doc.text(`   HTML: ${v.nodes?.[0]?.html || ''}`, 10, y);
            y += 6;
            doc.text(`   Help: ${v.help}`, 10, y);
            y += 10;
        });
        doc.save('violations.pdf');
    };

    const getImpactData = () => {
        const impactMap = {};
        violations.forEach(v => {
            impactMap[v.impact] = (impactMap[v.impact] || 0) + 1;
        });
        return Object.entries(impactMap).map(([impact, count]) => ({ impact, count }));
    };

    const getSuggestion = (helpText) => {
        return `📌 Suggestion: Please refer to the help documentation to resolve this violation.`;
    };

    return (
        <div className="container">
            <h1>🛡️ AxeShield Accessibility Scanner</h1>
            <div className="input-group">
                <input type="text" placeholder="Enter website URL" value={url} onChange={e => setUrl(e.target.value)} />
                <button onClick={handleScan}>Scan</button>
            </div>

            {loading && (
                <div className="loading-center">
                    <ClipLoader size={150} color="#007bff" loading={loading} />
                </div>
            )}

            {error && <p className="error">{error}</p>}

            {!loading && violations.length > 0 && (
                <>
                    <h2>📊 Violations Impact Summary</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={getImpactData()}>
                            <XAxis dataKey="impact" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#007bff" />
                        </BarChart>
                    </ResponsiveContainer>

                    <div className="button-group">
                        <button className="export-button csv-button" onClick={exportCSV}>Export CSV</button>
                        <button className="export-button pdf-button" onClick={exportPDF}>Export PDF</button>
                    </div>

                    <h2>📝 Detailed Violations</h2>
                    <ul className="violation-list">
                        {violations.map((v, idx) => (
                            <li key={idx} style={{ marginBottom: '20px' }}>
                                <strong>{idx + 1}. {v.id} ({v.impact})</strong><br />
                                {/*<u>{v.nodes?.[0]?.target?.find(attr => attr.startsWith('aria-label')) || 'No aria-label found'}</u><br />*/}
                                {v.description}<br />
                                <em>{getSuggestion(v.help)}</em><br />
                                {v.nodes && v.nodes.map((node, i) => (
                                    <code key={i}>HTML: {node.html}</code>
                                ))}<br />
                            </li>
                        ))}
                    </ul>

                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                        <a
                            href="https://dequeuniversity.com/rules/axe/4.10/nested-interactive?application=axeAPI"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="help-button"
                        >
                            📚 View Accessibility Help
                        </a>
                    </div>
                </>
            )}
        </div>
    );
};

export default App;
