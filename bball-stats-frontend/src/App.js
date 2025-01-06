import React, { useState } from 'react';

function App() {
    const [formData, setFormData] = useState({
        player: '',
        ou: '',
        number: '',
        stat_type: '',
        opp: ''
    });
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await fetch('http://127.0.0.1:5000/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                throw new Error(`Error: ${res.statusText}`);
            }

            const data = await res.json();
            setResponse(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
            <h1>Player Stats Query</h1>
            <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Player Name: </label>
                    <input
                        type="text"
                        name="player"
                        value={formData.player}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Over/Under (o/u): </label>
                    <input
                        type="text"
                        name="ou"
                        value={formData.ou}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Number: </label>
                    <input
                        type="number"
                        name="number"
                        value={formData.number}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Stat Type: </label>
                    <input
                        type="text"
                        name="stat_type"
                        value={formData.stat_type}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Opposing Team: </label>
                    <input
                        type="text"
                        name="opp"
                        value={formData.opp}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" style={{ padding: '10px 20px', fontSize: '16px' }}>
                    Submit
                </button>
            </form>

            <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
                {loading && <p>Loading...</p>}
                {error && <p style={{ color: 'red' }}>Error: {error}</p>}
                {response && (
                    <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                        {JSON.stringify(response, null, 2)}
                    </pre>
                )}
            </div>
        </div>
    );
}

export default App;
