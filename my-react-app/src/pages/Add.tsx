import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCharacter } from "../redux/slices/GetCharactersSlice";
import type { RootState } from "../redux/store";

const Add = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userType = useSelector((state: RootState) => state.user.userType);
    const [name, setName] = useState('');
    const [status, setStatus] = useState('');
    const [species, setSpecies] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (userType !== 'admin') return;

        if (name.trim() && status.trim() && species.trim()) {
            const formInfo = {
                id: Date.now(),
                name: name.trim(),
                status: status.trim(),
                species: species.trim()
            }
            dispatch(addCharacter(formInfo));
            setName('');
            setStatus('');
            setSpecies('');
            navigate('/');
        }
    }

    return (
        <>
        {userType !== 'admin' ? (
            <section>
                <p>Access denied. Only admins can add characters.</p>
                <button onClick={() => navigate('/')}>Back</button>
            </section>
        ) : (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
            </div>
                        <div>
                <label>Status:</label>
                <input type="text" 
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                />
            </div>
                        <div>
                <label>Species:</label>
                <input type="text" 
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
                />
            </div>
            <button type="submit">Add new character</button>
        </form>
        )}
        </>
    )
}
export default Add;