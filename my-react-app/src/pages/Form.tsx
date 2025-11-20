import { useState } from "react";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { addTest } from "../redux/slices/TestSlice";

const Form = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [status, setStatus] = useState('');
    const [species, setSpecies] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (name.trim() && status.trim() && species.trim()) {
            const formInfo = {
                id: Date.now(),
                name: name.trim(),
                status: name.trim(),
                species: species.trim(),
            }
            dispatch(addTest(formInfo))
            setName('')
            setStatus('')
            setSpecies('')
            navigate('/')
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
            </div>
            <button type="submit">Add</button>
        </form>
    )
}
export default Form