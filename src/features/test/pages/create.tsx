import React, { useState } from 'react';
import { Button } from '../../../shared/component/button';
import { api } from '../../../services';
import { QuestionDto } from '../../../types/master';

export const CreateTest: React.FC = () => {
    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState(60);
    const [questions, setQuestions] = useState<QuestionDto[]>([]);

    const addQuestion = () => {
        setQuestions([
            ...questions,
            { id: Date.now().toString(), text: '', options: [] }
        ]);
    };

    const addOption = (qIndex: number) => {
        const updatedQuestions = [...questions];
        updatedQuestions[qIndex].options.push({
            id: Date.now().toString(),
            text: '',
            isCorrect: false
        });
        setQuestions(updatedQuestions);
    };

    const updateOption = (qIndex: number, oIndex: number, text: string, isCorrect: boolean) => {
        const updatedQuestions = [...questions];
        updatedQuestions[qIndex].options[oIndex] = {
            ...updatedQuestions[qIndex].options[oIndex],
            text,
            isCorrect
        };
        setQuestions(updatedQuestions);
    };

    const handleSaveAndPublish = async () => {
        const test = await api.createTest({ name, subject, description, durationMinutes: duration, questions });
        await api.publishTest(test.id);
    };

    return (
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h1>Add New Test</h1>
            <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
            <input placeholder="Subject" value={subject} onChange={e => setSubject(e.target.value)} />
            <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
            <input type="number" placeholder="Duration (mins)" value={duration} onChange={e => setDuration(Number(e.target.value))} />
            
            {questions.map((q, qIdx) => (
                <div key={q.id} style={{ border: '1px solid #000', padding: '10px', marginTop: '10px' }}>
                    <input 
                        placeholder="Question Text" 
                        value={q.text} 
                        onChange={e => {
                            const updated = [...questions];
                            updated[qIdx].text = e.target.value;
                            setQuestions(updated);
                        }} 
                    />
                    <Button onClick={() => addOption(qIdx)}>Add Option</Button>
                    {q.options.map((opt, oIdx) => (
                        <div key={opt.id} style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                            <input 
                                placeholder="Option Text" 
                                value={opt.text} 
                                onChange={e => updateOption(qIdx, oIdx, e.target.value, opt.isCorrect)} 
                            />
                            <label>
                                <input 
                                    type="checkbox" 
                                    checked={opt.isCorrect} 
                                    onChange={e => updateOption(qIdx, oIdx, opt.text, e.target.checked)} 
                                /> Correct Option
                            </label>
                        </div>
                    ))}
                </div>
            ))}
            
            <Button onClick={addQuestion}>Add Question</Button>
            <Button onClick={handleSaveAndPublish} variant="success">Publish Test</Button>
        </div>
    );
};