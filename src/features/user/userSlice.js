import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}


// Creating a thunk by using createAsyncThunk function 
// createAsyncThunk accepts two parameters:- 
// 1.) action name 
// 2.) async function (actutal thunk function)that will return the payload for the reducer later  

// This fetchAddress will actually become the action creator function that we will later call in our code

// This createAsyncThunk will basically produce three additional action types:-
// 1.) For the pending promise state
// 2.) for fulfilled state
// 3.) for rejected state

// We need to handle all these cases separately back in our reducer
// This is how we then connect this thunk with our reducers.
export const fetchAddress = createAsyncThunk('user/fetchAddress', async function () {
  // 1) We get the user's geolocation position
  const positionObj = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };
  
  // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;
  
  // 3) Then we return an object with the data that we are interested in
  // Payload of the fulfilled state
  return { position, address };
})

const initialState = {
  username:'',
  status:'idle',
  position:{},
  address:'',
  error:''
}

const userSlice = createSlice({
  name: "user", 
  initialState, 
  reducers:{
    updateName(state, action) {
      state.username = action.payload
    
    }},
    extraReducers:(builder) => 
      builder.addCase(
        fetchAddress.pending,
        (state) => {(state.status = "loading");
    })
    .addCase(
      fetchAddress.fulfilled,
     (state, action) =>   {
      state.position =action.payload.position;
      state.address = action.payload.address;
      state.status = "idle";
    
     }   
    )
    .addCase(
      fetchAddress.rejected,
      (state, action) => {
        state.status = "error";
        state.error = "There was a problem getting your address. Make sure to fill this field";
      }
    )

});


export const { updateName } = userSlice.actions;
export default userSlice.reducer;
