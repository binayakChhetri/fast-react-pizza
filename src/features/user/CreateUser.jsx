import { useState } from 'react';
import Button from '../../UI/Button';
import { useDispatch } from 'react-redux';
import { updateName } from './userSlice';
import { useNavigate } from 'react-router';


function CreateUser() {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();


  function handleSubmit(e) {
    // Here we'll update the state of the redux store
    e.preventDefault();
    if (!username) return; 
    dispatch(updateName(username))
    navigate("/menu");

    
  }

  return (
    <form onSubmit={handleSubmit} className='my-10' >
      <p className='mb-4 text-sm text-stone-600 md:text-base' >👋 Welcome! Please start by telling us your name:</p>

      <input
        type="text"
        placeholder="Your full name"

        // Here we are temporarily storing the username state in the local state right in the component itself.
        // We do it bacause it is a bad practice to connect an input field the Redux store

        // We update the redux state after we are done entering the name
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className='input w-72 mb-8'
      />

      {username !== '' && (
        <div>
          <Button type="primary">
            Start ordering 
          </Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
